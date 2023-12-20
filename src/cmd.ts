#!/usr/bin/env node-ts --transpileOnly

import "dotenv/config"
import { Cli } from "kysely-codegen"
import { createDbIfNotExists } from "./create-database"
import { migrateToLatest } from "./migrate-to-latest"

async function main() {
  await createDbIfNotExists()
  await migrateToLatest()
  await new Cli().run(["--dialect", "postgres"])
  process.exit(0)
}

main()
