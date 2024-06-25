
$versionFilePath = "version.txt"

if (-Not (Test-Path $versionFilePath)) {
    "v0_00" | Out-File $versionFilePath
}

$currentVersion = Get-Content $versionFilePath


function Increment-Version($version) {
    $parts = $version -replace "v", "" -split "_"
    $major = [int]$parts[0]
    $minor = [int]$parts[1]
    $minor++
    if ($minor -ge 100) {
        $major++
        $minor = 0
    }
    return "v{0}_{1:D2}" -f $major, $minor
}

$newVersion = Increment-Version $currentVersion

$newVersion | Out-File $versionFilePath

$outputFilePath = "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\scripts\version\D4UT-$newVersion.txt"
$fileList = @(
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\package.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\tsconfig.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\index.html",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\welcome.html",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\css\styles.css",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\affixSelection.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\buildManager.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\classSelection.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\dataFetchers.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\eventListeners.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\helper.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\itemDetails.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\itemSelection.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\main.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\navigation.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\skillDetails.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\skillSelection.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\summary.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\public\js\uniqueItemSelection.js",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\server.ts",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\store.ts",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\data\unique_items.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\data\barbarian\barbarian_gear_affixes.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\data\barbarian\barbarian_skills.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\data\druid\druid_gear_affixes.json",
    "C:\Users\Az\Documents\D4UTReborn\D4UTReborn-New\src\data\druid\druid_skills.json"
)


Clear-Content -Path $outputFilePath -ErrorAction SilentlyContinue
foreach ($file in $fileList) {
    Add-Content -Path $outputFilePath -Value "`n`n`n`n`n// File: $file"
    
  Get-Content -Path $file | Add-Content -Path $outputFilePath}

Write-Host "Concatenation complete. Check the file: $outputFilePath"
