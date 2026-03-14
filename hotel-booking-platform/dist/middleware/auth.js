import { validPassword } from "../util/bcrypt.js";
import { getUserByEmail, getUserByRoomId } from "../db/get_db.js";
import { verifyToken } from "../util/jwt.js";
async function signInAuth(req, res, next) {
    const { email, password } = req.body;
    const dbResRows = await getUserByEmail(email);
    // console.log(dbResRows);
    if (!dbResRows || dbResRows.length == 0) {
        console.log("email does not exist");
        res.status(401).json({
            "success": false,
            "data": null,
            "error": "INVALID_CREDENTIALS"
        });
        return;
    }
    const hashPass = dbResRows[0].password;
    const isSame = await validPassword(password, hashPass);
    if (isSame) {
        next();
    }
    else {
        console.log("password incorrect");
        res.status(401).json({
            "success": false,
            "data": null,
            "error": "INVALID_CREDENTIALS"
        });
        return;
    }
}
function verifyAuthToken(role) {
    return async (req, res, next) => {
        let data = "";
        try {
            const bearerStr = req.get("Authorization");
            if (!bearerStr.startsWith("Bearer ")) {
                throw new Error('"Bearer ", not present in starting of string');
            }
            const authToken = bearerStr.replace("Bearer ", "") ?? "";
            console.log("JWT Token recived: ", authToken);
            data = verifyToken(authToken);
            console.log("Data fetched from token: ", JSON.stringify(data));
        }
        catch (err) {
            console.log(err);
            res.status(401).json({
                "success": false,
                "data": null,
                "error": "UNAUTHORIZED"
            });
            return;
        }
        const userEmail = JSON.parse(JSON.stringify(data)).email;
        // console.log("Recieved user email as: ", userEmail);
        const db_res = await getUserByEmail(userEmail);
        console.log("DB response: ", db_res);
        if (!db_res || db_res.length == 0) {
            res.status(401).json({
                "success": false,
                "data": null,
                "error": "UNAUTHORIZED"
            });
            return;
        }
        else if (db_res.length > 0) {
            const userRole = db_res[0].role;
            console.log("Email in JWT token have role as: ", userRole);
            if (req.url.includes("/api/bookings") && userRole == "owner" && req.body && req.body.roomId) {
                const userDbResWithRmId = await getUserByRoomId(req.body.roomId ?? "");
                if (userEmail == userDbResWithRmId[0].email) {
                    console.log("inside url validation: ", userDbResWithRmId[0]);
                    res.status(403).json({
                        "success": false,
                        "data": null,
                        "error": "FORBIDDEN"
                    });
                    return;
                }
            }
            else if (!req.url.includes("/api/bookings") && role != "all" && userRole != role) {
                res.status(403).json({
                    "success": false,
                    "data": null,
                    "error": "FORBIDDEN"
                });
                return;
            }
            else {
                const ownerId = db_res[0].id;
                res.set(role + "_id", ownerId);
                next();
            }
        }
    };
}
export { signInAuth, verifyAuthToken };
//# sourceMappingURL=auth.js.map