import { createDbIfNotExists } from "./create-database"

describe("createDatabase", () => {
  it("creates the database if it does not exist", async () => {
    await createDbIfNotExists()
  })
})
