set DIRECTORY=".\appData"
set COMBINED="%DIRECTORY:"=%%RANDOM:"=%"
move ".\Universal Paperclips-win32-x64\resources\app\appData" %COMBINED%
start pwsh -ExecutionPolicy ByPass -File "Universal Paperclips.ps1"
nativefier --name "Universal Paperclips" --arch "x64" --icon ./favicon.ico --portable --single-instance --disable-old-build-warning-yesiknowitisinsecure --ignore-certificate --insecure --verbose "http://localhost:8000/index2.html"
