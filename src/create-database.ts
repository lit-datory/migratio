import { Client } from "pg"
import { databaseUrl } from "./parse-database-url"
import chalk from "chalk"

const client = new Client({
  user: databaseUrl.username,
  password: databaseUrl.password,
  port: databaseUrl.port,
  host: databaseUrl.hostname,
})

export async function createDbIfNotExists() {
  try {
    await client.connect()
    const { rowCount } = await client.query(
      "SELECT FROM pg_database WHERE datname = $1",
      [databaseUrl.database],
    )

    if (rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseUrl.database}`)
      console.log(
        chalk.green(`Database: "${databaseUrl.database}" created successfully`),
      )
    }
  } catch (e: unknown) {
    console.error(chalk.red("something went wrong creating the database"), e)
  } finally {
    await client.end()
  }
}

// async function createDatabase() {
//   await client.connect()
//   const result = await client.query("CREATE DATABASE $1", [
//     databaseUrl.database,
//   ])
//   console.log("RESULT: ", result)
//   await client.end()
// }
