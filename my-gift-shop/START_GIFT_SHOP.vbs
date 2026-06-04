CreateObject("Wscript.Shell").Run "cmd /c node server.js", 0, False
WScript.Sleep 3000
CreateObject("Wscript.Shell").Run "http://localhost:3000"