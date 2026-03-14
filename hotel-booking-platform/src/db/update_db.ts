import type { QueryResultRow } from "pg";
import {update_booking_by_id, update_hotel_wit_rateNreview} from "./query.js";
import {queryDB} from "./db_init.js"

async function updateBookingById(booking_id: string): Promise<QueryResultRow>{
    const db_res = await queryDB(update_booking_by_id, [booking_id]);
    return db_res.rows;
}

async function updateHotelWidRatNReview(payload: Record<string, string|number>): Promise<QueryResultRow>{
    const db_res = await queryDB(update_hotel_wit_rateNreview, [payload.rate, payload.totalReview, payload.hotelId]);
    return db_res.rows;
}

export {
    updateBookingById,
    updateHotelWidRatNReview
}