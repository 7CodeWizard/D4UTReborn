# Define the base path to the directory
$baseDirectory = Get-Location

# Define the paths for the version file and output file
$versionDirectoryPath = Join-Path $baseDirectory "src\version"
$versionFilePath = Join-Path $versionDirectoryPath "version.txt"

# Ensure the version directory exists
if (-Not (Test-Path $versionDirectoryPath)) {
    New-Item -ItemType Directory -Path $versionDirectoryPath | Out-Null
}

# Create the version file if it does not exist
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

$outputFilePath = Join-Path $versionDirectoryPath "D4UT-$newVersion.txt"

# Define the names of the files and directories to ignore
$ignoreFiles = @(".gitignore", "package-lock.json", "*.txt")
$ignoreExtensions = @("*.png", "*.webp", "*.jpg")
$ignoreDirectories = @("dist", "node_modules", "scripts", "version")

# Recursively get the list of files in the directory and its subdirectories, excluding specified files and directories
$fileList = Get-ChildItem -Path $baseDirectory -Recurse -File | Where-Object {
    $isInIgnoredDirectory = $false
    foreach ($ignoreDir in $ignoreDirectories) {
        if ($_.FullName -like "*\$ignoreDir\*") {
            $isInIgnoredDirectory = $true
            break
        }
    }

    $isIgnoredFile = $false
    foreach ($ignoreFile in $ignoreFiles) {
        if ($_.Name -eq $ignoreFile) {
            $isIgnoredFile = $true
            break
        }
    }

    $isIgnoredExtension = $false
    foreach ($ignoreExtension in $ignoreExtensions) {
        if ($_.FullName -like $ignoreExtension) {
            $isIgnoredExtension = $true
            break
        }
    }

    $isInIgnoredDirectory -eq $false -and $isIgnoredFile -eq $false -and $isIgnoredExtension -eq $false
}

# Debugging: Output the count of files found
Write-Host "Total Files Found: $($fileList.Count)"

# Prepare the list of included files
$includedFiles = $fileList | ForEach-Object { $_.FullName -replace [regex]::Escape($baseDirectory), '' }

# Output the list of included files at the top of the versioned file
Clear-Content -Path $outputFilePath -ErrorAction SilentlyContinue
Add-Content -Path $outputFilePath -Value "List of included files:`n"
foreach ($file in $includedFiles) {
    Add-Content -Path $outputFilePath -Value "$file`n"
}

# Output the file list with content to the versioned file
foreach ($file in $fileList) {
    Add-Content -Path $outputFilePath -Value "`n`n`n`n`n// File: $($file.FullName)"
    Get-Content -Path $file.FullName | Add-Content -Path $outputFilePath
}

Write-Host "Concatenation complete. Check the file: $outputFilePath"
