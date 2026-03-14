import type { QueryResult, QueryResultRow } from "pg";
import {queryDB} from "./db_init.js";
import {
    get_user_by_email, 
    get_room_by_roomNumber, 
    get_hotel_by_id, 
    get_all_rooms, 
    get_hotels_join_room, 
    get_room_by_id, get_booking_by_roomid, 
    get_booking_btw_dates, 
    get_user_using_hotelnrooms_join,
    get_bookingby_user_id,
    get_booking_by_id,
    get_review_by_id,
    get_reviews_by_bookId
} from "./query.js"

async function getUserByEmail(email:string): Promise<QueryResultRow>{
    const res = await queryDB(get_user_by_email, [email]);
    return res.rows;
}

async function getAllRooms(): Promise<QueryResultRow>{
    const db_res = await queryDB(get_all_rooms, []);
    return db_res.rows;
}

async function getRoomByNumber(roomNumb: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_room_by_roomNumber, [roomNumb]);
    return db_res.rows;
}

async function getHotelById(hotelId: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_hotel_by_id, [hotelId]);
    return db_res.rows;
}

async function getHotelJoinRoom(queryObjt: Record<string, string>): Promise<QueryResultRow>{
    let queryStr: string = ``;
    const queryLst = Object.keys(queryObjt);
    if(queryLst.length > 0){
        queryStr = ` WHERE`
        if(queryLst.includes("country")){
            queryStr += ` ht.country=${queryObjt.country}`
        }
        if(queryLst.includes("city")){
            queryStr==` WHERE` ? queryStr += ` ht.city=${queryObjt["city"]}` : queryStr += ` AND ht.city=${queryObjt["city"]}`
        }
        if(queryLst.includes("minPrice")){
            if(queryLst.includes("maxPrice")){
                queryStr==` WHERE` ? queryStr += ` rm.price_per_night BETWEEN (${queryObjt["minPrice"]}, ${queryObjt["maxPrice"]})` : queryStr += ` AND rm.price_per_night BETWEEN (${queryObjt["minPrice"]}, ${queryObjt["maxPrice"]})`
            }else{
                queryStr==` WHERE` ? queryStr += ` rm.price_per_night >= ${queryObjt["minPrice"]}` : queryStr += ` AND rm.price_per_night >= ${queryObjt["minPrice"]}`
            }
        }else if(queryLst.includes("maxPrice")){
            queryStr==` WHERE` ? queryStr += ` rm.price_per_night <= ${queryObjt["maxPrice"]}` : queryStr += ` AND rm.price_per_night <= ${queryObjt["maxPrice"]}`
        }
        if(queryLst.includes("minRating")){
            queryStr==` WHERE` ? queryStr += ` ht.rating>=${queryObjt["minRating"]}` : queryStr += ` AND ht.rating>=${queryObjt["minRating"]}` 
        }
    }
    const finalQuery: string = get_hotels_join_room+queryStr;
    console.log("Final query created after all joins: ", finalQuery);
    const db_res = await queryDB(finalQuery);
    return db_res.rows;
}

async function getRoomById(roomId: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_room_by_id, [roomId]);
    return db_res.rows;
}

async function getBookingByRoomId(roomid: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_booking_by_roomid, [roomid]);
    return db_res.rows;
}

async function getBookingByDates(checkinDate: string, checkoutDate: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_booking_btw_dates, [checkinDate, checkoutDate]);
    return db_res.rows;
}

async function getUserByRoomId(roomid: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_user_using_hotelnrooms_join, [roomid]);
    return db_res.rows;
}

async function getBookingByUserId(user_id: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_bookingby_user_id, [user_id]);
    return db_res.rows;
}

async function getBookingById(booking_id: string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_booking_by_id, [booking_id]);
    return db_res.rows;
}

async function getReviewById(review_id:string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_review_by_id, [review_id]);
    return db_res.rows;
}

async function getReviewByBookid(book_id:string): Promise<QueryResultRow>{
    const db_res = await queryDB(get_reviews_by_bookId, [book_id]);
    return db_res.rows;
}

export {
    getUserByEmail, 
    getRoomByNumber, 
    getHotelById, 
    getHotelJoinRoom, 
    getAllRooms, 
    getRoomById, 
    getBookingByRoomId, 
    getBookingByDates, 
    getUserByRoomId, 
    getBookingByUserId,
    getBookingById,
    getReviewById,
    getReviewByBookid
};