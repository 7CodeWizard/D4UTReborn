@echo off
setlocal

REM Set the directory containing the JS files
set "directoryPath=public\js"

REM Set the output file
set "outputFilePath=concatenated_output.txt"

REM Get the directory listing and write it to the output file
dir %directoryPath% > %outputFilePath%

REM Loop through each file in the directory and append its content to the output file
for %%f in (%directoryPath%\*.js) do (
    REM Write the delimiter (relative path)
    echo. >> %outputFilePath%
    echo. >> %outputFilePath%
    echo // File: %%f >> %outputFilePath%
    
    REM Write the file content
    type "%%f" >> %outputFilePath%
)

echo Concatenation complete. Check the file: %outputFilePath%
endlocal
