import {Client, type QueryResult} from "pg";



async function connectToDB(): Promise<Client>{
    const client: Client = new Client({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: parseInt(<string>process.env.DB_PORT), 
        database: process.env.DATABASE
    });
    try{
        await client.connect();
        console.log("Successfully connected to DB");
    }catch(err:unknown){
        console.log("Connection error: ")
        if(err instanceof Error){
            throw new Error(`ERROR on connection: ${err}`);
        }else{
            throw new Error(`Unknown ERROR : ${err}`);
        }
    }
    return client;
}

async function queryDB(text:string, params: any[]=[]): Promise<QueryResult>{
    let client: Client= await connectToDB()
    try{
        const res: QueryResult = await client.query(text, params);
        console.log("Successfully fetched query.")
        return res;
    }catch(err){
        console.log("Query error: ")
        if(err instanceof Error){
            throw new Error(`Query error: ${err}`);
        }else{
            throw new Error(`Unknown error: ${err}`);
        }
    }finally{
        await client.end();
    }
}

export {queryDB};