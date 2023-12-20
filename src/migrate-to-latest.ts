import chalk from "chalk"
import { migrator } from "./migrator"
import { db } from "./db"

export async function migrateToLatest() {
  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(
        chalk.green(
          `Migration "${it.migrationName}" was executed successfully`,
        ),
      )
    } else if (it.status === "Error") {
      console.log(
        chalk.red(`failed to execute migration "${it.migrationName}"`),
      )
    }
  })

  if (error) {
    console.log(chalk.red("failed to migrate"))
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}
