@echo off
color 0B
echo ====================================
echo = ACCESO RAPIDO A UN COMMIT DE GIT =
echo ====================================
erase www\server\unCracked\process.php
copy c:\wamp\www\unCracked\process.php www\server\unCracked\
erase c:\wamp\www\unCracked\bd.sql
START http://localhost/unCracked/bk.php
pause
erase www\server\bd.sql
copy c:\wamp\www\unCracked\bd.sql www\server\
git status
echo .
echo .
echo Estos son los cambios
echo .
echo .
set /p COMMIT=Descripcion del commit: 
git add -A
git commit -m "%COMMIT%"
echo COMMIT CREADO CON EXITO
echo .
pause
exit