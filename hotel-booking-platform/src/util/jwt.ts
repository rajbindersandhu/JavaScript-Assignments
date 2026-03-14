import jwt from "jsonwebtoken";
import type {JwtPayload, Secret} from "jsonwebtoken";

function generateToken(payload:string): string | JwtPayload{
    try{
        const token = jwt.sign(payload, <Secret>process.env.JWT_TOKEN);
        // console.log("token generated", payload, "\n", process.env.JWT_TOKEN, "\n", token);
        return token;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(`JWT generate token error: ${err}`);
        }else{
            throw new Error(`Unknow JWT genearte error: ${err}`);
        }
    }
}

function verifyToken(token: string): string | JwtPayload{
    try{
        const result: string | JwtPayload  = jwt.verify(token, <Secret> process.env.JWT_TOKEN);
        console.log("Data in verify token: ", result);
        return result;
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(`JWT Verify error: ${err}`)
        }else{
            throw new Error(`Unknow JWT verify error: ${err}`)
        }
    }
}

export {generateToken, verifyToken};