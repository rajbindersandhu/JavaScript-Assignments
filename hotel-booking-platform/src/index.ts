import  express  from "express";
import {
   signUpValidator, 
   loginValidator, 
   hotelSignUpValidator, 
   roomSignUpValidator, 
   bookingValidator,
   reviewValidator
} from "./middleware/payload_validation.js";
import {signInAuth, verifyAuthToken} from "./middleware/auth.js";
import {
   insert_new_hotel, 
   insert_new_user, 
   insert_new_room, 
   insert_new_booking,
   insert_new_review
} from "./db/insert_db.js";
import {
   getUserByEmail, 
   getRoomByNumber, 
   getHotelById, 
   getHotelJoinRoom, 
   getAllRooms, 
   getRoomById, 
   getBookingByRoomId, 
   getBookingByDates,
   getBookingByUserId,
   getBookingById,
   getReviewById,
   getReviewByBookid
} from "./db/get_db.js";
import {
   updateBookingById,
   updateHotelWidRatNReview
} from "./db/update_db.js"
import {generateToken} from "./util/jwt.js"
import {hash}  from "bcrypt";
import type {Request, Response, NextFunction} from "express";
import type {UserSignUp, HotelSignUp, RoomSignUp} from "./middleware/payload_validation.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();
 app.use(express.json());

//  app.get("/", (req, res) =>{
//    res.status(200).json({"data": "hello world"});
//  })

 app.post("/api/auth/signup", signUpValidator, async (req: Request, res: Response) => {
    const plainPass: string = req.body.password;
    const hashPassword: string = await hash(plainPass, 10);
   const uuid: string = crypto.randomUUID();
    const userPayload:UserSignUp& {"id": string}= {
      "id": uuid,
      "name": req.body.name,
      "email": req.body.email,
      "password": hashPassword,
      "role": req.body.role ?? 'customer',
      "phone": req.body.phone ?? ""
    }

    const db_res = await insert_new_user(userPayload);
   //  console.log(db_res);
    res.status(201).json({
      "success": true,
      "data":{
         "id": uuid,
         "name": req.body.name,
         "email": req.body.email,
         "role": req.body.role,
         "phone": req.body.phone
      },
      "error":null
    });
 });


app.post("/api/auth/login", loginValidator , signInAuth, async (req:Request, res: Response) => {
   const email: string = req.body.email;
   const db_res = await getUserByEmail(email);
   const token: string = <string>generateToken(JSON.stringify({"email": req.body.email, "password": req.body.password}))
   res.status(200).json({
      "success": true,
      "data": {
         "token": token,
         "user": {
            "id": db_res[0].id,
            "name": db_res[0].name,
            "email": db_res[0].email,
            "role": db_res[0].role
         }
      }, 
      "error": null
   });
});

app.post("/api/hotels", hotelSignUpValidator, verifyAuthToken("owner"), async (req:Request, res:Response) => {
   const hotel_id:string = `hotel_${crypto.randomUUID()}`;
   const db_payload: {"id": string, "owner_id":string}&HotelSignUp = {
      "id": hotel_id,
      "owner_id": res.get("owner_id")!,
      "name": <string>req.body.name,
      "description": <string>req.body.description,
      "city": <string>req.body.city,
      "country": <string>req.body.country,
      "amenities": <string[]>req.body.amenities
   };

   const db_res = await insert_new_hotel(db_payload);
   res.status(201).json({
      "success": true,
      "data": {
         "id": hotel_id,
         "owner_id": res.get("owner_id")!,
         "name": <string>req.body.name,
         "description": <string>req.body.description,
         "city": <string>req.body.city,
         "country": <string>req.body.country,
         "amenities": <string[]>req.body.amenities,
         "rating":0.0,
         "totalReviews":0
      },
      "error": null
   });
});


app.post("/api/hotels/:hotelid/rooms", roomSignUpValidator, verifyAuthToken("owner"), async (req:Request, res:Response) => {
   const db_rows = await getRoomByNumber(req.body.roomNumber);
   const hotel_id:string = <string>req.params.hotelid ?? "";
   if(db_rows && db_rows.length > 0){
      res.status(400).json({
         "success": false, 
         "data": null,
         "error": "ROOM_ALREADY_EXISTS"
      })
   }else{
      const hotel_db_rows = await getHotelById(hotel_id);
      if(!hotel_db_rows || hotel_db_rows.length == 0){
         res.status(404).json({
            "success":false,
            "data": null,
            "error": "HOTEL_NOT_FOUND"
         });
         return;
      }else{
         const roomId = `room_${crypto.randomUUID()}`;
         const payload: {"id": string, "hotel_id":string}&RoomSignUp = {
            "id": roomId,
            "hotel_id": hotel_id,
            "roomNumber": req.body.roomNumber,
            "roomType": req.body.roomType,
            "pricePerNight": req.body.pricePerNight,
            "maxOccupancy": req.body.maxOccupancy
         }
         await insert_new_room(payload);
         res.status(201).json({
            "success": true,
            "data": payload,
            "error": null
         });
         return;
      }
   }
});

app.get("/api/hotels", verifyAuthToken("all"), async (req: Request, res: Response) => {
   const queryObjt: Record<string, any> = req.query;
   const db_res = await getHotelJoinRoom(queryObjt);
   res.status(200).json({
      "success": true,
      "data": db_res,
      "error": null
   });
});

app.get("/api/hotels/:hotelId", verifyAuthToken("all"), async (req:Request, res:Response) => {
   const hotel_id: string = <string>req.params.hotelId ?? "";
   const db_hotel_res = await getHotelById(hotel_id);
   if(!db_hotel_res || db_hotel_res.length == 0){
      res.status(404).json({
         "success": false,
         "data": null,
         "error":"HOTEL_NOT_FOUND"
      });
   }else{
      const db_room_res = await getAllRooms();
      const room_lst= [];
      for(let i=0;i<db_room_res.length;i++){
         if(db_room_res[i].hotel_id == hotel_id){
            room_lst.push({
               "id": db_room_res[i].id,
               "roomNumber": db_room_res[i].room_number,
               "roomType": db_room_res[i].room_type,
               "pricePerNight": db_room_res[i].price_per_night,
               "maxOccupancy": db_room_res[i].max_occupancy
            });
         }
      }
      res.status(200).json({
         "success": true,
         "data": {
            "id": db_hotel_res[0].id,
            "ownerId": db_hotel_res[0].owner_id,
            "name": db_hotel_res[0].name,
            "description": db_hotel_res[0].description,
            "city": db_hotel_res[0].city,
            "country": db_hotel_res[0].country,
            "amenities": db_hotel_res[0].amenities,
            "rating": db_hotel_res[0].rating,
            "totalReviews": db_hotel_res[0].total_review,
            "rooms":room_lst
         },
         "error": null
      });
      return;
   }
});

app.post("/api/bookings", bookingValidator, verifyAuthToken("customer"), async (req:Request, res:Response) => {
   const room_id: string = <string> req.body.roomId ?? "";
   const guests: number = parseInt(<string>req.body.guests);
   const checkInDate: string = <string> req.body.checkInDate;
   const checkOutDate: string = <string> req.body.checkOutDate;

   const db_room_res = await getRoomById(room_id);
   if(!db_room_res || db_room_res.length == 0){
      res.status(404).json({
         "success": false,
         "data": null,
         "error": "ROOM_NOT_FOUND"
      });
   }else{
      if(guests>db_room_res[0].max_occupancy){
         res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_CAPACITY"
         });
         return;
      }
      if(new Date(checkInDate) > new Date(checkOutDate) || new Date(checkInDate) < new Date()){
         res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_DATES"
         });
         return;
      }
      let db_booking_res = await getBookingByRoomId(room_id);
      const db_booking_wid_date_res = await getBookingByDates(checkInDate, checkOutDate);
      if(db_booking_wid_date_res && db_booking_wid_date_res.length >0){
         res.status(400).json({
            "success": false,
            "data": null,
            "error": "ROOM_NOT_AVAILABLE"
         });
         return;
      }
      const pricePerNight = parseInt(db_room_res[0].price_per_night);
      const end: any = new Date(checkOutDate);
      const start: any = new Date(checkInDate);
      const totalPrice = ((end-start) / ( 1000 *60 *60 *24)) * pricePerNight;
      const bookingInsertPayload = {
         "id": `booking_${crypto.randomUUID()}`,
         "user_id": res.get("customer_id")!,
         "roomId": room_id,
         "hotel_id": <string>db_room_res[0].hotel_id,
         "checkInDate": checkInDate,
         "checkOutDate": checkOutDate,
         "guests": guests,
         "total_price": `${totalPrice}`,
      }
      // console.log("Booking payload : ", bookingInsertPayload)
      await insert_new_booking(bookingInsertPayload);
      db_booking_res = await getBookingByRoomId(room_id);
      res.status(201).json({
         "success": true,
         "data": db_booking_res[0],
         "error": null
      });
   }
 });

app.get("/api/bookings", verifyAuthToken("customer"), async (req:Request, res: Response) => {
   const userId: string = res.get("customer_id") ?? "";
   const status: string = <string>req.query.status ?? "";
   const db_res = await getBookingByUserId(userId);
   console.log("Customer ID: ", userId)
   console.log("DB_RESPOSNE: ", db_res)
   let finalPayload = []
   if(db_res.length > 0){
      for(let i=0;i<db_res.length;i++){
         const tempPayload = {
            "id": db_res[i].id,
            "roomId": db_res[i].room_id,
            "hotelId": db_res[i].hotel_id,
            "hotelName": db_res[i].hotel_name,
            "roomNumber": db_res[i].room_number,
            "roomType": db_res[i].room_type,
            "checkInDate": db_res[i].check_in_date,
            "checkOutDate": db_res[i].check_out_date,
            "guests": db_res[i].guests,
            "totalPrice": db_res[i].total_price,
            "status": db_res[i].status,
            "bookingDate": db_res[i].booking_date
         };
         if(status){
            if(status == db_res[i].status){
               finalPayload.push(tempPayload);
            }
         }else{
            finalPayload.push(tempPayload);
         }
      }
   }

   res.status(200).json({
      "success": false,
      "data": finalPayload,
      "error": null
   })
});

app.put("/api/bookings/:bookingId/cancel", verifyAuthToken("customer"), async (req:Request, res:Response) => {
   const booking_id:string = <string>req.params.bookingId ?? "";
   const db_res = await getBookingById(booking_id)
   if(!db_res || db_res.length == 0){
      res.status(400).json({
         "success": false,
         "data": null,
         "error": "BOOKING_NOT_FOUND"
      });
      return;
   }else{
      const db_res_status = db_res[0].status;
      if(db_res_status == "cancelled"){
         res.status(400).json({
            "success": false,
            "data": null,
            "error": "ALREADY_CANCELLED"
         });
         return;
      }
      const checkInDate: any = new Date(db_res[0].check_in_date);
      const currentDate: any = new Date();
      const hoursLeft = (checkInDate-currentDate) / (1000*60*60);
      if(hoursLeft<24 || hoursLeft<0){
         res.status(400).json({
            "success": false,
            "data": null,
            "error": "CANCELLATION_DEADLINE_PASSED"
         });
         return;
      }
      const db_update_res = await updateBookingById(booking_id);
      console.log(db_update_res)
      res.status(200).json({
         "success": true,
         "data":[],
         "error": null
      })
   }
});

app.post("/api/reviews", reviewValidator, verifyAuthToken("customer"), async (req:Request, res:Response) => {
   const user_id = res.get("customer_id");
   const {
      bookingId,
      rating,
      comment
   }  = req.body;

   const db_review_res = await getReviewByBookid(bookingId);
   if(db_review_res && db_review_res.length >0){
      res.status(400).json({
         "success":false,
         "data": null,
         "error": "ALREADY_REVIEWED"
      });
      return;
   }
   const db_booking_res = await getBookingById(bookingId);
   // console.log("Booking_id: ", bookingId);
   // console.log("Booking response: ", db_booking_res);
   if(!db_booking_res || db_booking_res.length == 0){
      res.status(404).json({
         "success": false,
         "data": null,
         "error": "BOOKING_NOT_FOUND"
      });
      return;
   }
   const checkoutDate: any = new Date(db_booking_res[0].check_out_date);
   const currentDate: any = new Date();
   const diffBtwDates = checkoutDate - currentDate;
   if(db_booking_res[0].status == "cancelled" || diffBtwDates > 0 ){
      res.status(400).json({
         "success": false,
         "data": null,
         "error": "BOOKING_NOT_ELIGIBLE"
      });
   }

   const db_hotel_res = await getHotelById(db_booking_res[0].hotel_id);
   const hotelRating: number = parseInt(db_hotel_res[0].ratings);
   const hotelTotalReview: number = parseInt(db_hotel_res[0].total_reviews);
   const update_res = await updateHotelWidRatNReview({
      "rate":((hotelRating*hotelTotalReview) + rating) / (hotelTotalReview + 1),
      "totalReview": hotelTotalReview+1,
      "hotelId": db_booking_res[0].hotel_id
   });

   console.log("Updated the hotel with new rating and reviews");

   const payload = {
      "id": `review_${crypto.randomUUID()}`,
      "user_id": db_booking_res[0].user_id,
      "hotel_id": db_booking_res[0].hotel_id,
      "booking_id": db_booking_res[0].id,
      "rating": rating,
      "comment": comment,
   };

   await insert_new_review(payload);
   console.log("Created review entry for a hotel");
   const db_rev_res = await getReviewByBookid(bookingId);
   res.status(201).json({
      "success": true,
      "data":db_rev_res[0],
      "error": null
   });
})

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
   console.error(err.stack);
   res.status(500).json({
      "success": false,
      "data": null,
      "error": "INTERNAL_SERVER_ERROR"
   })
});


app.listen(process.env.PORT, () => {
   console.log("Server is listening on ", process.env.PORT)
});
