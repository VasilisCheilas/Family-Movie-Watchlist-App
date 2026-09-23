import {verifyToken,signToken} from "../utils/jwt.js";


function authenticate(req,res,next){
    const header_auth = req.headers.authorization;
    if(!header_auth || !header_auth.startsWith("Bearer ")){
     return res.status(401).json({"error":"No token provided."});
    }
    const token = header_auth.split(" ")[1];
    const decoded = verifyToken(token);
    if(!decoded){
        return  res.status(401).json({ "error": "Invalid or expired token." });

    }
    req.user = decoded;
    return next();

}

export {authenticate};
