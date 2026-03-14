import { queryDB } from "./db_init.js";
import { insert_new_user_query, insert_new_hotel_query, insert_new_room_query, insert_booking_query, insert_review_query } from "./query.js";
export async function insert_new_user(payload) {
    const params = [payload.id, payload.name, payload.email, payload.password, payload.role, payload.phone];
    const res = await queryDB(insert_new_user_query, params);
    // console.log(res);
    return res.rows;
}
export async function insert_new_hotel(payload) {
    const db_res = await queryDB(insert_new_hotel_query, [payload.id, payload.owner_id, payload.name, payload.description, payload.city, payload.country, JSON.stringify(payload.amenities)]);
    return db_res.rows;
}
export async function insert_new_room(payload) {
    const db_res = await queryDB(insert_new_room_query, [payload.id, payload.hotel_id, payload.roomNumber, payload.roomType, payload.pricePerNight, payload.maxOccupancy]);
    return db_res.rows;
}
export async function insert_new_booking(payload) {
    const db_res = await queryDB(insert_booking_query, [payload.id, payload.user_id, payload.roomId, payload.hotel_id, payload.checkInDate, payload.checkOutDate, payload.guests, payload.total_price]);
    return db_res.rows;
}
export async function insert_new_review(payload) {
    const db_res = await queryDB(insert_review_query, [payload.id, payload.user_id, payload.hotel_id, payload.booking_id, payload.rating, payload.comment]);
    return db_res.rows;
}
//# sourceMappingURL=insert_db.js.map