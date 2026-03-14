import { hash, compare } from "bcrypt";
async function hashPassword(plain) {
    const result = hash(plain, 10);
    return result;
}
async function validPassword(pass, hashPass) {
    const result = compare(pass, hashPass);
    return result;
}
export { hashPassword, validPassword };
//# sourceMappingURL=bcrypt.js.map