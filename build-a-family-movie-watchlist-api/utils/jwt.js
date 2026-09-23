import jwt from "jsonwebtoken";

const signToken = (payload, expiresIn = '1d') => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        throw new Error("Λείπει το JWT_SECRET από το αρχείο .env");
    }

    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("Λείπει το JWT_SECRET από το αρχείο .env");
    }

    try {
     
        return jwt.verify(token, secret);
    } catch (error) {
     
        console.error("Αποτυχία επαλήθευσης Token:", error.message);
        return null;
    }
};

export { signToken, verifyToken };




