import type { QueryResultRow } from "pg";
declare function getUserByEmail(email: string): Promise<QueryResultRow>;
declare function getAllRooms(): Promise<QueryResultRow>;
declare function getRoomByNumber(roomNumb: string): Promise<QueryResultRow>;
declare function getHotelById(hotelId: string): Promise<QueryResultRow>;
declare function getHotelJoinRoom(queryObjt: Record<string, string>): Promise<QueryResultRow>;
declare function getRoomById(roomId: string): Promise<QueryResultRow>;
declare function getBookingByRoomId(roomid: string): Promise<QueryResultRow>;
declare function getBookingByDates(checkinDate: string, checkoutDate: string): Promise<QueryResultRow>;
declare function getUserByRoomId(roomid: string): Promise<QueryResultRow>;
declare function getBookingByUserId(user_id: string): Promise<QueryResultRow>;
declare function getBookingById(booking_id: string): Promise<QueryResultRow>;
declare function getReviewById(review_id: string): Promise<QueryResultRow>;
declare function getReviewByBookid(book_id: string): Promise<QueryResultRow>;
export { getUserByEmail, getRoomByNumber, getHotelById, getHotelJoinRoom, getAllRooms, getRoomById, getBookingByRoomId, getBookingByDates, getUserByRoomId, getBookingByUserId, getBookingById, getReviewById, getReviewByBookid };
//# sourceMappingURL=get_db.d.ts.map