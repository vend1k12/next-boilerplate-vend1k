#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"

function getInstallCommand() {
  const platform = os.platform()

  if (platform === "win32") {
    return "pip install pre-commit"
  } else if (platform === "darwin") {
    return "brew install pre-commit || pip3 install pre-commit"
  } else {
    return "pip3 install pre-commit || pip install pre-commit"
  }
}

function runCommand(command) {
  try {
    console.log(`Executing: ${command}`)
    execSync(command, { stdio: "inherit" })
    return true
  } catch (error) {
    console.error(`Failed to execute: ${command}`)
    console.error(error.message)
    return false
  }
}

function setupPreCommit() {
  console.log("Setting up pre-commit hooks for all OS...")

  try {
    execSync("pre-commit --version", { stdio: "pipe" })
    console.log("pre-commit is already installed")
  } catch (error) {
    console.log("pre-commit is not installed. Installing...")
    const installCmd = getInstallCommand()
    if (!runCommand(installCmd)) {
      console.error("Failed to install pre-commit. Please install it manually.")
      process.exit(1)
    }
  }

  console.log("Installing git hooks...")
  runCommand("pre-commit install --install-hooks")
  runCommand("pre-commit install --hook-type commit-msg")

  console.log("Checking dependencies...")
  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }

    if (!packageJson.scripts["setup-hooks"]) {
      packageJson.scripts["setup-hooks"] = "node scripts/setup-hooks.js"
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      console.log("Added setup-hooks script to package.json")
    }
  }

  console.log("Pre-commit hooks setup completed successfully!")
  console.log('Run "pre-commit run --all-files" to test all hooks.')
}

setupPreCommit()
