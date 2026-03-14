declare function hashPassword(plain: string): Promise<string>;
declare function validPassword(pass: string, hashPass: string): Promise<boolean>;
export { hashPassword, validPassword };
//# sourceMappingURL=bcrypt.d.ts.map