$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
$adb = "C:\Users\user\AppData\Local\Android\Sdk\platform-tools\adb.exe"

Write-Host "Building web assets..." -ForegroundColor Cyan
npx vite build
if ($LASTEXITCODE -ne 0) { Write-Host "Vite build failed" -ForegroundColor Red; exit 1 }

Write-Host "Syncing to Android..." -ForegroundColor Cyan
npx cap sync android
if ($LASTEXITCODE -ne 0) { Write-Host "Cap sync failed" -ForegroundColor Red; exit 1 }

Write-Host "Building APK..." -ForegroundColor Cyan
Set-Location android
.\gradlew assembleDebug
if ($LASTEXITCODE -ne 0) { Write-Host "Gradle build failed" -ForegroundColor Red; Set-Location ..; exit 1 }
Set-Location ..

Write-Host "Installing on device..." -ForegroundColor Cyan
& $adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"
Write-Host "Done!" -ForegroundColor Green
