function parseDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error("DATABASE_URL env variable not avaiable")
  const url = new URL(databaseUrl)

  return {
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    hostname: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.substring(1),
  }
}

export const databaseUrl = parseDatabaseUrl()
