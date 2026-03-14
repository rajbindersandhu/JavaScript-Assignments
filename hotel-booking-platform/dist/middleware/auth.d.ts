import type { Request, Response, NextFunction } from "express";
declare function signInAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function verifyAuthToken(role: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { signInAuth, verifyAuthToken };
//# sourceMappingURL=auth.d.ts.map