import {hash, compare} from "bcrypt";

async function hashPassword(plain: string): Promise<string>{
    const result = hash(plain, 10);
    return result;
}

async function validPassword(pass: string, hashPass: string): Promise<boolean> {
    const result = compare(pass, hashPass);
    return result;
}

export {hashPassword, validPassword};