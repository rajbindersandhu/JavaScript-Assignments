import type { QueryResultRow } from "pg";
declare function updateBookingById(booking_id: string): Promise<QueryResultRow>;
declare function updateHotelWidRatNReview(payload: Record<string, string | number>): Promise<QueryResultRow>;
export { updateBookingById, updateHotelWidRatNReview };
//# sourceMappingURL=update_db.d.ts.map