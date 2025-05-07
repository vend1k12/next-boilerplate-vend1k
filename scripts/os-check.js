#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"

// Получаем информацию о системе
const platform = os.platform()
const nodeVersion = process.version
const npmVersion = (() => {
  try {
    return execSync("npm --version", { encoding: "utf8" }).trim()
  } catch (error) {
    return "not installed"
  }
})()

const bunVersion = (() => {
  try {
    return execSync("bun --version", { encoding: "utf8" }).trim()
  } catch (error) {
    return "not installed"
  }
})()

const pythonVersion = (() => {
  try {
    return execSync("python --version", { encoding: "utf8" }).trim()
  } catch (error) {
    try {
      return execSync("python3 --version", { encoding: "utf8" }).trim()
    } catch (innerError) {
      return "not installed"
    }
  }
})()

const gitVersion = (() => {
  try {
    return execSync("git --version", { encoding: "utf8" }).trim()
  } catch (error) {
    return "not installed"
  }
})()

const preCommitVersion = (() => {
  try {
    return execSync("pre-commit --version", { encoding: "utf8" }).trim()
  } catch (error) {
    return "not installed"
  }
})()

// Выводим информацию о системе и зависимостях
console.log(`
=====================================
   Проверка совместимости системы
=====================================

Операционная система: ${os.type()} ${os.release()} (${platform})
Архитектура: ${os.arch()}
Память: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB

Зависимости:
- Node.js: ${nodeVersion}
- npm: ${npmVersion}
- bun: ${bunVersion}
- Python: ${pythonVersion}
- Git: ${gitVersion}
- pre-commit: ${preCommitVersion}

=====================================
     Проверка совместимости хуков
=====================================
`)

// Проверяем наличие pre-commit
if (preCommitVersion === "not installed") {
  console.log("❌ pre-commit не установлен")
  console.log('   Рекомендация: Выполните "npm run setup-hooks" или установите pre-commit вручную')
} else {
  console.log("✅ pre-commit установлен")
}

// Проверяем наличие .git/hooks
const gitHooksPath = path.join(process.cwd(), ".git", "hooks")
if (fs.existsSync(gitHooksPath)) {
  console.log("✅ Директория Git hooks существует")

  // Проверяем установлены ли хуки
  const preCommitHookPath = path.join(gitHooksPath, "pre-commit")
  const commitMsgHookPath = path.join(gitHooksPath, "commit-msg")

  if (fs.existsSync(preCommitHookPath)) {
    console.log("✅ pre-commit хук установлен")
  } else {
    console.log("❌ pre-commit хук не установлен")
    console.log('   Рекомендация: Выполните "pre-commit install --install-hooks"')
  }

  if (fs.existsSync(commitMsgHookPath)) {
    console.log("✅ commit-msg хук установлен")
  } else {
    console.log("❌ commit-msg хук не установлен")
    console.log('   Рекомендация: Выполните "pre-commit install --hook-type commit-msg"')
  }
} else {
  console.log("❌ Директория Git hooks не существует")
  console.log("   Рекомендация: Проверьте инициализацию Git репозитория")
}

// Проверяем наличие конфигурационного файла
const configPath = path.join(process.cwd(), ".pre-commit-config.yaml")
if (fs.existsSync(configPath)) {
  console.log("✅ Конфигурационный файл .pre-commit-config.yaml существует")
} else {
  console.log("❌ Конфигурационный файл .pre-commit-config.yaml отсутствует")
}

// Проверяем запуск хука
console.log("\nЗапускаем тестовый хук для проверки работоспособности...")
try {
  execSync("pre-commit run trailing-whitespace --all-files", { stdio: "inherit" })
  console.log("✅ Тестовый хук успешно выполнен")
} catch (error) {
  console.log("❌ Ошибка при выполнении тестового хука")
  console.log("   Рекомендация: Проверьте сообщение об ошибке выше")
}

console.log(`
=====================================
          Рекомендации
=====================================

1. Если pre-commit не установлен, выполните:
   npm run setup-hooks

2. Если хуки не работают, попробуйте переустановить их:
   pre-commit install --install-hooks
   pre-commit install --hook-type commit-msg

3. Для обновления хуков до последних версий:
   pre-commit autoupdate

4. Документация по настройке хуков: docs/hooks-setup.md
`)
