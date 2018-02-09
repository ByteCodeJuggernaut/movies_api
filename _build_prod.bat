set NODE_ENV=production

cmd.exe /c ".\node_modules\.bin\webpack --progress"
rem pause
rem xcopy /E /Y images\* public\images
.\node_modules\.bin\lite-server
