dotnet publish -o "$env:TEMP\arangu-pub" -p:PublishSingleFile=true --self-contained false
if ($?) {
    & "$env:TEMP\arangu-pub\backend.exe"
}
