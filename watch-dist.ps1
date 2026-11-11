# Business Manager - Auto-Update Distribution Bundle
$projectRoot = Get-Location
$distFolder = "$projectRoot\dist"

$filesToWatch = @("BusinessManager.html", "server.js", "package.json", "package-lock.json")

Write-Host ""
Write-Host "Business Manager - Bundle Watch" -ForegroundColor Cyan
Write-Host ""
Write-Host "Watching for changes in:" -ForegroundColor Green
$filesToWatch | ForEach-Object { Write-Host "  - $_" }
Write-Host ""
Write-Host "Auto-updating: $distFolder" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$fileHashes = @{}
$filesToWatch | ForEach-Object {
    $filePath = "$projectRoot\$_"
    if (Test-Path $filePath) {
        $hash = (Get-FileHash $filePath).Hash
        $fileHashes[$_] = $hash
    }
}

while ($true) {
    foreach ($file in $filesToWatch) {
        $filePath = "$projectRoot\$file"
        $distPath = "$distFolder\$file"

        if (Test-Path $filePath) {
            $currentHash = (Get-FileHash $filePath).Hash

            if ($fileHashes[$file] -ne $currentHash) {
                $fileHashes[$file] = $currentHash
                Copy-Item $filePath $distPath -Force
                $timestamp = Get-Date -Format "HH:mm:ss"
                Write-Host "[$timestamp] OK: $file" -ForegroundColor Green
            }
        }
    }

    Start-Sleep -Seconds 1
}
