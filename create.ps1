<#
.SYNOPSIS
  Initialise la structure de dossiers d'un projet React.
.DESCRIPTION
  Ce script crée l'arborescence de base : public, src, src/components, src/assets, src/styles.
.PARAMETER ProjectName
  Nom du dossier racine du projet (par défaut : multiplication-table-app).
.EXAMPLE
  .\setup-structure.ps1 -ProjectName MyApp
#>
param(
  [string]$ProjectName = "multiplication-table-app"
)

# Dossier racine
if (-not (Test-Path $ProjectName)) {
  New-Item -ItemType Directory -Name $ProjectName | Out-Null
}

Set-Location $ProjectName

# Liste des dossiers à créer
$folders = @(
  ".\public",
  ".\src",
  ".\src\components",
  ".\src\assets",
  ".\src\styles"
)

foreach ($f in $folders) {
  if (-not (Test-Path $f)) {
    New-Item -ItemType Directory -Path $f | Out-Null
    Write-Host "Création du dossier : $f"
  } else {
    Write-Host "Dossier existant : $f"
  }
}

Write-Host "Structure de base créée pour le projet '$ProjectName'."