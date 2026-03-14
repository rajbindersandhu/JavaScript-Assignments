import type {Request, Response, NextFunction} from "express";
import * as z from "zod";
import {getUserByEmail} from "../db/get_db.js"

const signUpPayload = z.object({
    "name": z.string(),
    "email": z.email(),
    "password": z.string(),
    "role": z.string(),
    "phone": z.optional(z.string())
});

const loginPayload = z.object({
    "email": z.email(),
    "password": z.string()
});

const hotelSignUpPayload = z.object({
    "name": z.string(),
    "description": z.string(),
    "city": z.string(),
    "country": z.string(),
    "amenities": z.array(z.string())
});

const roomSignUpPayload = z.object({
    "roomNumber": z.string(),
    "roomType": z.string(),
    "pricePerNight": z.number(),
    "maxOccupancy": z.number()
});

const bookingPayload = z.object({
    "roomId": z.string(),
    "checkInDate": z.string(),
    "checkOutDate": z.string(),
    "guests":z.number()
});

const reviewPayload = z.object({
    "bookingId": z.string(),
    "rating": z.number(),
    "comment": z.string()
});

async function signUpValidator(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction){
    // const result = signUpPayload.safeParse({
    //     "name": req.body.name,
    //     "password": req.body.password,
    //     "email": req.body.email, 
    //     "phone": req.body.phone,
    //     "role": req.body.role
    // });
    const result = signUpPayload.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            "sucess": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        const db_res = await getUserByEmail(req.body.email);
        if(db_res.length){
            res.status(400).json({
                "success": false, 
                "data": null, 
                "error": "EMAIL_ALREADY_EXISTS"
            });
            return;
        }else{
            next();
        }
    }
}

function hotelSignUpValidator(req:Request, res:Response, next:NextFunction){
    const parseRes = hotelSignUpPayload.safeParse(req.body);
    if(!parseRes.success){
        res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        next();
    }
}

function loginValidator(req: Request, res: Response, next: NextFunction){
    const result = loginPayload.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        next()
    }
}

function roomSignUpValidator(req: Request, res:Response, next: NextFunction){
    const result = roomSignUpPayload.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        next();
    }
}

function bookingValidator(req: Request, res:Response, next: NextFunction){
    const result = bookingPayload.safeParse(req.body);
    console.log("Booking validation response: ", result);
    if(!result.success){
        res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        next();
    }
}

function reviewValidator(req:Request, res:Response, next:NextFunction){
    const result = reviewPayload.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            "success": false,
            "data": null,
            "error": "INVALID_REQUEST"
        });
        return;
    }else{
        next();
    }
}


type UserSignUp = z.infer<typeof signUpPayload>;
type UserLogin = z.infer<typeof loginPayload>;
type HotelSignUp = z.infer<typeof hotelSignUpPayload>;
type RoomSignUp = z.infer<typeof roomSignUpPayload>;
type Booking = z.infer<typeof bookingPayload>
type Review = z.infer<typeof reviewPayload>

export {
    signUpValidator, 
    loginValidator, 
    hotelSignUpValidator, 
    roomSignUpValidator, 
    bookingValidator,
    reviewValidator
};
export type {
    UserSignUp, 
    UserLogin, 
    HotelSignUp, 
    RoomSignUp, 
    Booking,
    Review
};