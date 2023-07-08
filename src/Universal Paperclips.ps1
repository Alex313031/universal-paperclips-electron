$cmd = {
	python -m http.server
}

echo "Starting web server"
Start-Job -ScriptBlock $cmd

if ($args[0] -eq "run") {
	echo "Starting app"
	cd "Universal Paperclips-win32-x64"
	start "Universal Paperclips.exe"

	echo "Close this window (or press any key here) only when you are done playing"
	cmd /c pause
	taskkill /IM "Universal Paperclips.exe" /F
} else {
	echo "Please wait until the other windows closes before hitting any key"
	cmd /c pause
}
