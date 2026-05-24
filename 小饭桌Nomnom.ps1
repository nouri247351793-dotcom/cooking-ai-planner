param(
  [switch]$NoBrowser
)

<#
小饭桌Nomnom 一键启动脚本

使用方法：
1. 双击同目录下的 “小饭桌Nomnom.cmd”，或在 PowerShell 中运行：
   powershell -ExecutionPolicy Bypass -File ".\小饭桌Nomnom.ps1"
2. 脚本会自动切换到：
   G:\生成艺术\cooking-ai-planner
3. 脚本会自动寻找可用端口：
   - 前端默认从 5173 开始找
   - 后端默认从 8787 开始找
   如果端口被占用，会自动顺延到下一个可用端口，不会强杀已有进程。
4. 前后端都启动就绪后，会自动打开默认浏览器。
5. 关闭本窗口或按 Ctrl+C，会结束本脚本启动的前端和后端进程。
6. 如只想验证启动但不打开浏览器，可运行：
   powershell -ExecutionPolicy Bypass -File ".\小饭桌Nomnom.ps1" -NoBrowser
#>

$ErrorActionPreference = 'Stop'

$RootDir = 'G:\生成艺术\cooking-ai-planner'
$AppDir = Join-Path $RootDir '1_project_files\cooking-ai-planner'
$TempDir = Join-Path $AppDir '.tmp'
$BackendEntry = Join-Path $TempDir 'nomnom-backend.mjs'
$FrontendEntry = Join-Path $TempDir 'nomnom-frontend.mjs'
$FrontendStartPort = 5173
$BackendStartPort = 8787
$FrontendProcess = $null
$BackendProcess = $null

function Write-Step {
  param([string]$Message)
  Write-Host "[小饭桌Nomnom] $Message" -ForegroundColor Cyan
}

function Test-PortOpen {
  param([int]$Port)
  $client = $null
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $iar = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
    $connected = $iar.AsyncWaitHandle.WaitOne(180)
    if ($connected) {
      $client.EndConnect($iar)
      return $true
    }
    return $false
  } catch {
    return $false
  } finally {
    if ($client) { $client.Close() }
  }
}

function Get-FreePort {
  param([int]$StartPort)
  for ($port = $StartPort; $port -lt ($StartPort + 200); $port += 1) {
    if (-not (Test-PortOpen -Port $port)) {
      return $port
    }
  }
  throw "从 $StartPort 开始连续 200 个端口都被占用，无法启动。"
}

function Wait-HttpReady {
  param(
    [string]$Url,
    [string]$Name,
    [int]$TimeoutSeconds = 45
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        Write-Step "$Name 已就绪：$Url"
        return
      }
    } catch {
      Start-Sleep -Milliseconds 600
    }
  }

  throw "$Name 在 $TimeoutSeconds 秒内未就绪：$Url"
}

function Stop-StartedServices {
  Write-Step '正在关闭本脚本启动的服务...'
  foreach ($process in @($FrontendProcess, $BackendProcess)) {
    if ($process -and -not $process.HasExited) {
      try {
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
      } catch {}
    }
  }
}

function Join-CommandArguments {
  param([string[]]$Arguments)
  $escaped = foreach ($argument in $Arguments) {
    if ($argument -match '[\s"]') {
      '"' + ($argument -replace '"', '\"') + '"'
    } else {
      $argument
    }
  }
  return ($escaped -join ' ')
}

function Start-NomnomProcess {
  param(
    [string]$FilePath,
    [string[]]$Arguments,
    [string]$WorkingDirectory,
    [hashtable]$Environment
  )

  $startInfo = [System.Diagnostics.ProcessStartInfo]::new()
  $startInfo.FileName = $FilePath
  $startInfo.Arguments = Join-CommandArguments -Arguments $Arguments
  $startInfo.WorkingDirectory = $WorkingDirectory
  $startInfo.UseShellExecute = $false
  $startInfo.CreateNoWindow = $false

  foreach ($key in $Environment.Keys) {
    $startInfo.EnvironmentVariables[$key] = [string]$Environment[$key]
  }

  $process = [System.Diagnostics.Process]::new()
  $process.StartInfo = $startInfo
  if (-not $process.Start()) {
    throw "无法启动进程：$FilePath"
  }
  return $process
}

try {
  if (-not (Test-Path $RootDir)) {
    throw "找不到项目根目录：$RootDir"
  }
  if (-not (Test-Path $AppDir)) {
    throw "找不到前端项目目录：$AppDir"
  }

  Set-Location $RootDir
  Write-Step "已切换目录：$RootDir"

  if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw '未找到 npm.cmd，请先安装 Node.js。'
  }
  if (-not (Get-Command node.exe -ErrorAction SilentlyContinue)) {
    throw '未找到 node.exe，请先安装 Node.js。'
  }
  if (-not (Test-Path (Join-Path $AppDir 'node_modules'))) {
    throw "未找到 node_modules，请先在 $AppDir 执行 npm install。"
  }

  New-Item -ItemType Directory -Force -Path $TempDir | Out-Null

  $backendSource = @'
import http from 'node:http'
import { URL } from 'node:url'
import handler from '../api/ai.js'

const port = Number(process.env.NOMNOM_BACKEND_PORT || 8787)

function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1024 * 1024) req.destroy()
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch {
        resolve({})
      }
    })
    req.on('error', () => resolve({}))
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`)

  if (url.pathname === '/__nomnom_health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: true, service: 'nomnom-backend' }))
    return
  }

  if (url.pathname !== '/api/ai') {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ error: 'Not Found' }))
    return
  }

  req.body = await readBody(req)
  try {
    await handler(req, res)
  } catch (error) {
    console.error('[Nomnom backend]', error)
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    }
    res.end(JSON.stringify({ error: { code: 'NOMNOM_BACKEND_ERROR', message: 'Backend handler failed.' } }))
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`[小饭桌Nomnom] backend ready: http://127.0.0.1:${port}`)
})

process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
'@

  Set-Content -Path $BackendEntry -Value $backendSource -Encoding UTF8

  $frontendPort = Get-FreePort -StartPort $FrontendStartPort
  $backendPort = Get-FreePort -StartPort $BackendStartPort

  Write-Step "前端端口：$frontendPort"
  Write-Step "后端端口：$backendPort"

  $backendEnv = @{
    NOMNOM_BACKEND_PORT = "$backendPort"
  }
  foreach ($key in @('AI_API_KEY', 'AI_MODEL', 'AI_BASE_URL')) {
    $value = [Environment]::GetEnvironmentVariable($key, 'Process')
    if (-not $value) { $value = [Environment]::GetEnvironmentVariable($key, 'User') }
    if (-not $value) { $value = [Environment]::GetEnvironmentVariable($key, 'Machine') }
    if ($value) { $backendEnv[$key] = $value }
  }

  Write-Step '正在构建前端静态资源...'
  Push-Location $AppDir
  $previousNomnomLocal = $env:NOMNOM_LOCAL
  try {
    $env:NOMNOM_LOCAL = '1'
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
      throw "前端构建失败，退出码：$LASTEXITCODE"
    }
  } finally {
    if ($null -eq $previousNomnomLocal) {
      Remove-Item Env:\NOMNOM_LOCAL -ErrorAction SilentlyContinue
    } else {
      $env:NOMNOM_LOCAL = $previousNomnomLocal
    }
    Pop-Location
  }

  $frontendSource = @'
import http from 'node:http'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const appDir = path.resolve(path.dirname(currentFile), '..')
const distDir = path.join(appDir, 'dist')
const port = Number(process.env.NOMNOM_FRONTEND_PORT || 5173)
const backendPort = Number(process.env.NOMNOM_BACKEND_PORT || 8787)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
}

function readRequestBody(req) {
  return new Promise((resolve) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', () => resolve(Buffer.alloc(0)))
  })
}

async function proxyApi(req, res, requestUrl) {
  const body = await readRequestBody(req)
  const headers = { ...req.headers }
  delete headers.host
  delete headers.connection
  delete headers['content-length']
  delete headers.expect
  delete headers['transfer-encoding']
  const response = await fetch(`http://127.0.0.1:${backendPort}${requestUrl.pathname}${requestUrl.search}`, {
    method: req.method,
    headers,
    body: body.length && req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
  })
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()))
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  res.end(buffer)
}

function safeResolveStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname)
  const normalized = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  const cleanPath = normalized === '/' || normalized === '.' ? 'index.html' : normalized.replace(/^[/\\]/, '')
  const fullPath = path.resolve(distDir, cleanPath)
  if (!fullPath.startsWith(distDir)) return path.join(distDir, 'index.html')
  return fullPath
}

async function serveStatic(req, res, requestUrl) {
  let filePath = safeResolveStaticPath(requestUrl.pathname)
  let stat = null
  try {
    stat = await fsp.stat(filePath)
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html')
  } catch {
    filePath = path.join(distDir, 'index.html')
  }

  try {
    const ext = path.extname(filePath).toLowerCase()
    const stream = fs.createReadStream(filePath)
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=3600',
    })
    stream.pipe(res)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`)

  if (requestUrl.pathname === '/__nomnom_health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: true, service: 'nomnom-frontend' }))
    return
  }

  try {
    if (requestUrl.pathname.startsWith('/api/')) {
      await proxyApi(req, res, requestUrl)
      return
    }
    await serveStatic(req, res, requestUrl)
  } catch (error) {
    console.error('[Nomnom frontend]', error)
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ error: 'Frontend server failed.' }))
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`[小饭桌Nomnom] frontend ready: http://127.0.0.1:${port}`)
})

process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
'@

  Set-Content -Path $FrontendEntry -Value $frontendSource -Encoding UTF8

  Write-Step '正在启动后端 /api/ai ...'
  $BackendProcess = Start-NomnomProcess `
    -FilePath 'node.exe' `
    -Arguments @($BackendEntry) `
    -WorkingDirectory $AppDir `
    -Environment $backendEnv

  Write-Step '正在启动前端静态服务 ...'
  $frontendEnv = @{
    NOMNOM_FRONTEND_PORT = "$frontendPort"
    NOMNOM_BACKEND_PORT = "$backendPort"
  }
  $FrontendProcess = Start-NomnomProcess `
    -FilePath 'node.exe' `
    -Arguments @($FrontendEntry) `
    -WorkingDirectory $AppDir `
    -Environment $frontendEnv

  $backendUrl = "http://127.0.0.1:$backendPort/__nomnom_health"
  $frontendUrl = "http://127.0.0.1:$frontendPort/"

  Wait-HttpReady -Url $backendUrl -Name '后端'
  Wait-HttpReady -Url $frontendUrl -Name '前端'

  Write-Host ''
  Write-Host '========================================' -ForegroundColor Green
  Write-Host '小饭桌 Nomnom 已启动' -ForegroundColor Green
  Write-Host "前端：$frontendUrl" -ForegroundColor Green
  Write-Host "后端：http://127.0.0.1:$backendPort/api/ai" -ForegroundColor Green
  Write-Host '关闭此窗口或按 Ctrl+C 可停止服务' -ForegroundColor Green
  Write-Host '========================================' -ForegroundColor Green
  Write-Host ''

  if (-not $NoBrowser) {
    Write-Step '正在打开默认浏览器...'
    Start-Process $frontendUrl
  }

  while ($true) {
    if ($FrontendProcess.HasExited) {
      throw "前端进程已退出，退出码：$($FrontendProcess.ExitCode)"
    }
    if ($BackendProcess.HasExited) {
      throw "后端进程已退出，退出码：$($BackendProcess.ExitCode)"
    }
    Start-Sleep -Seconds 2
  }
} catch {
  Write-Host ''
  Write-Host "[小饭桌Nomnom] 启动失败：$($_.Exception.Message)" -ForegroundColor Red
  Stop-StartedServices
  exit 1
} finally {
  Stop-StartedServices
}




