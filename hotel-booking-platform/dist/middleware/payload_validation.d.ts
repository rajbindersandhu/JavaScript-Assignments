import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
declare const signUpPayload: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const loginPayload: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const hotelSignUpPayload: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    city: z.ZodString;
    country: z.ZodString;
    amenities: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const roomSignUpPayload: z.ZodObject<{
    roomNumber: z.ZodString;
    roomType: z.ZodString;
    pricePerNight: z.ZodNumber;
    maxOccupancy: z.ZodNumber;
}, z.core.$strip>;
declare const bookingPayload: z.ZodObject<{
    roomId: z.ZodString;
    checkInDate: z.ZodString;
    checkOutDate: z.ZodString;
    guests: z.ZodNumber;
}, z.core.$strip>;
declare const reviewPayload: z.ZodObject<{
    bookingId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodString;
}, z.core.$strip>;
declare function signUpValidator(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction): Promise<void>;
declare function hotelSignUpValidator(req: Request, res: Response, next: NextFunction): void;
declare function loginValidator(req: Request, res: Response, next: NextFunction): void;
declare function roomSignUpValidator(req: Request, res: Response, next: NextFunction): void;
declare function bookingValidator(req: Request, res: Response, next: NextFunction): void;
declare function reviewValidator(req: Request, res: Response, next: NextFunction): void;
type UserSignUp = z.infer<typeof signUpPayload>;
type UserLogin = z.infer<typeof loginPayload>;
type HotelSignUp = z.infer<typeof hotelSignUpPayload>;
type RoomSignUp = z.infer<typeof roomSignUpPayload>;
type Booking = z.infer<typeof bookingPayload>;
type Review = z.infer<typeof reviewPayload>;
export { signUpValidator, loginValidator, hotelSignUpValidator, roomSignUpValidator, bookingValidator, reviewValidator };
export type { UserSignUp, UserLogin, HotelSignUp, RoomSignUp, Booking, Review };
//# sourceMappingURL=payload_validation.d.ts.map