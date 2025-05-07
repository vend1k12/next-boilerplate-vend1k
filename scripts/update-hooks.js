#!/usr/bin/env node

import { execSync } from "child_process"

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

function updatePreCommitHooks() {
  console.log("Updating pre-commit hooks to latest versions...")

  try {
    execSync("pre-commit --version", { stdio: "pipe" })
  } catch (error) {
    console.error("pre-commit is not installed. Please run 'npm run setup-hooks' first.")
    process.exit(1)
  }

  console.log("Running autoupdate for pre-commit hooks...")
  if (!runCommand("pre-commit autoupdate")) {
    console.error("Failed to update pre-commit hooks.")
    process.exit(1)
  }

  console.log("Reinstalling git hooks...")
  runCommand("pre-commit install --install-hooks")
  runCommand("pre-commit install --hook-type commit-msg")

  console.log("Running test check of pre-commit hooks...")
  try {
    execSync("pre-commit run trailing-whitespace --all-files", { stdio: "inherit" })
    console.log("✅ Test hook successfully executed")
  } catch (error) {
    console.log("⚠️ Test hook found issues that need to be fixed")
  }

  console.log("\nPre-commit hooks have been updated to the latest versions!")
  console.log("Please commit the changes to .pre-commit-config.yaml to share with the team.")
}

updatePreCommitHooks()
