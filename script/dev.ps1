#Requires -Version 7.2
$Command = if ($args.Count) { [string]$args[0] } else { 'up' }
$forwardArguments = if ($args.Count -gt 1) { @($args[1..($args.Count - 1)]) } else { @() }
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$workspaceRoot = $projectRoot
while ($workspaceRoot -and !(Test-Path -LiteralPath (Join-Path $workspaceRoot 'scripts/compose-dev.ps1'))) {
    $workspaceRoot = Split-Path $workspaceRoot -Parent
}
if (!$workspaceRoot) { $workspaceRoot = Join-Path $HOME 'work' }
$launcher = Join-Path $workspaceRoot 'scripts/compose-dev.ps1'
if (!(Test-Path -LiteralPath $launcher)) { throw 'Shared scripts/compose-dev.ps1 not found; locate the workspace first.' }
& $launcher -ProjectRoot $projectRoot -Command $Command -CommandArguments $forwardArguments
