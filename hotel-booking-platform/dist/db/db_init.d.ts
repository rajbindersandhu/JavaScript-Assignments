import { type QueryResult } from "pg";
declare function queryDB(text: string, params?: any[]): Promise<QueryResult>;
export { queryDB };
//# sourceMappingURL=db_init.d.ts.map