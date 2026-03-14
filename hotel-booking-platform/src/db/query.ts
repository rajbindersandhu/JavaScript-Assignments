
export const insert_new_user_query : string = `INSERT INTO users ("id", "name", "email", "password", "role", "phone") VALUES ($1, $2, $3, $4, $5, $6)`;
export const insert_new_hotel_query: string = `INSERT INTO hotels ("id", "owner_id", "name", "description", "city", "country","amenities") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
export const insert_new_room_query: string = `INSERT INTO rooms ("id", "hotel_id", "room_number", "room_type", "price_per_night", "max_occupancy") VALUES ($1, $2, $3, $4, $5, $6)`;
export const insert_booking_query: string = `INSERT INTO bookings ("id", "user_id", "room_id", "hotel_id", "check_in_date", "check_out_date", "guests", "total_price") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
export const insert_review_query: string = `INSERT INTO reviews ("id","user_id", "hotel_id", "booking_id", "rating", "comment") VALUES ($1, $2, $3, $4, $5, $6)`;

export const get_user_by_email: string = "SELECT * FROM users WHERE email=$1";
export const get_room_by_roomNumber: string = `SELECT * FROM rooms WHERE room_number=$1`;
export const get_hotel_by_id: string = `SELECT * FROM hotels WHERE id=$1`
export const get_all_rooms: string = `SELECT * FROM rooms`;
export const get_room_by_id: string = `SELECT * FROM rooms WHERE id=$1`;
export const get_booking_by_roomid: string = `SELECT * FROM bookings WHERE room_id=$1`;
export const get_booking_btw_dates: string = `SELECT * FROM bookings WHERE check_in_date BETWEEN $1 AND $2 OR check_out_date BETWEEN $1 AND $2`;
export const get_user_using_hotelnrooms_join: string = `SELECT us.* FROM users AS us JOIN hotels AS ht ON us.id=ht.owner_id JOIN rooms AS rm ON rm.hotel_id=ht.id WHERE rm.id=$1`;
export const get_bookingby_user_id:string = `SELECT bk.*, ht.name AS hotel_name, rm.room_number, rm.room_type FROM users AS us JOIN bookings AS bk ON bk.user_id=us.id JOIN hotels AS ht ON ht.id=bk.hotel_id JOIN rooms AS rm ON bk.room_id=rm.id WHERE us.id=$1`;
export const get_hotels_join_room: string = `SELECT DISTINCT ht.* FROM hotels AS ht JOIN rooms AS rm ON ht.id=rm.hotel_id`;
export const get_booking_by_id: string = `SELECT * FROM bookings WHERE id=$1`;
export const get_review_by_id: string = `SELECT * FROM reviews WHERE id=$1`
export const get_reviews_by_bookId: string = `SELECT * FROM reviews WHERE booking_id=$1`;

export const update_booking_by_id: string = `UPDATE bookings SET status='cancelled' WHERE id=$1`;
export const update_hotel_wit_rateNreview: string = `UPDATE hotels SET rating=$1, total_review=$2 WHERE id=$3`; 