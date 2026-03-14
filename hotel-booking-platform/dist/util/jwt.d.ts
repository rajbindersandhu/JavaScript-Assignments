import type { JwtPayload } from "jsonwebtoken";
declare function generateToken(payload: string): string | JwtPayload;
declare function verifyToken(token: string): string | JwtPayload;
export { generateToken, verifyToken };
//# sourceMappingURL=jwt.d.ts.map