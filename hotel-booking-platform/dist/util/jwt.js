import jwt from "jsonwebtoken";
function generateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_TOKEN);
        // console.log("token generated", payload, "\n", process.env.JWT_TOKEN, "\n", token);
        return token;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`JWT generate token error: ${err}`);
        }
        else {
            throw new Error(`Unknow JWT genearte error: ${err}`);
        }
    }
}
function verifyToken(token) {
    try {
        const result = jwt.verify(token, process.env.JWT_TOKEN);
        console.log("Data in verify token: ", result);
        return result;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`JWT Verify error: ${err}`);
        }
        else {
            throw new Error(`Unknow JWT verify error: ${err}`);
        }
    }
}
export { generateToken, verifyToken };
//# sourceMappingURL=jwt.js.map