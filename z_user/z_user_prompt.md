# PowerShell Execution Policy Fix

To enable npm and other scripts, run this command in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

When prompted, type `Y` and press Enter to confirm.
