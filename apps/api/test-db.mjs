import { configDotenv } from "dotenv";
import pg from "pg";

const { parsed } = configDotenv()

const { Client } = pg

const client = new Client({
    connectionString: parsed?.DATABASE_URL
})

console.log('database:', process.env.DATABASE_URL)

try {
    await client.connect()
    console.log('Connected to database')
} catch (e) {
    console.error(e)
} finally {
    await client.end()
}