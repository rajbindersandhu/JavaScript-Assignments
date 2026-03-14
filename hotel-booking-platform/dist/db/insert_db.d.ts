import type { UserSignUp, HotelSignUp, RoomSignUp, Booking } from "../middleware/payload_validation.js";
import type { QueryResultRow } from "pg";
export declare function insert_new_user(payload: UserSignUp & {
    "id": string;
}): Promise<QueryResultRow>;
export declare function insert_new_hotel(payload: {
    "id": string;
    "owner_id": string;
} & HotelSignUp): Promise<QueryResultRow>;
export declare function insert_new_room(payload: {
    "id": string;
    "hotel_id": string;
} & RoomSignUp): Promise<QueryResultRow>;
export declare function insert_new_booking(payload: {
    "id": string;
    "user_id": string;
    "hotel_id": string;
    "total_price": string;
} & Booking): Promise<QueryResultRow>;
type Review = {
    "id": string;
    "user_id": string;
    "hotel_id": string;
    "booking_id": string;
    "rating": string;
    "comment": string;
};
export declare function insert_new_review(payload: Review): Promise<QueryResultRow>;
export {};
//# sourceMappingURL=insert_db.d.ts.map