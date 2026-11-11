# Quick sync - copy files to dist immediately
$projectRoot = Get-Location
$distFolder = "$projectRoot\dist"

$filesToSync = @("BusinessManager.html", "server.js", "package.json")

Write-Host ""
Write-Host "Syncing files to dist folder..." -ForegroundColor Cyan
Write-Host ""

$syncCount = 0

foreach ($file in $filesToSync) {
    $filePath = "$projectRoot\$file"
    $distPath = "$distFolder\$file"
    if (Test-Path $filePath) {
        Copy-Item $filePath $distPath -Force
        Write-Host "OK: $file" -ForegroundColor Green
        $syncCount++
    } else {
        Write-Host "MISSING: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Complete! $syncCount files synced to dist." -ForegroundColor Green
Write-Host ""
