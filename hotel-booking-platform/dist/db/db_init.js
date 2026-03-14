import { Client } from "pg";
async function connectToDB() {
    const client = new Client({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DATABASE
    });
    try {
        await client.connect();
        console.log("Successfully connected to DB");
    }
    catch (err) {
        console.log("Connection error: ");
        if (err instanceof Error) {
            throw new Error(`ERROR on connection: ${err}`);
        }
        else {
            throw new Error(`Unknown ERROR : ${err}`);
        }
    }
    return client;
}
async function queryDB(text, params = []) {
    let client = await connectToDB();
    try {
        const res = await client.query(text, params);
        console.log("Successfully fetched query.");
        return res;
    }
    catch (err) {
        console.log("Query error: ");
        if (err instanceof Error) {
            throw new Error(`Query error: ${err}`);
        }
        else {
            throw new Error(`Unknown error: ${err}`);
        }
    }
    finally {
        await client.end();
    }
}
export { queryDB };
//# sourceMappingURL=db_init.js.map