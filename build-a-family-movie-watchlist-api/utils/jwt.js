import jwt from "jsonwebtoken";

const generateToken = (payload, expiresIn = '1d') => {
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
        // Αν το token είναι σωστό και δεν έχει λήξει, επιστρέφει το αρχικό payload
        return jwt.verify(token, secret);
    } catch (error) {
        // Πιάνουμε τα σφάλματα (όπως TokenExpiredError ή JsonWebTokenError) σιωπηλά
        console.error("Αποτυχία επαλήθευσης Token:", error.message);
        return null;
    }
};

export { generateToken, verifyToken };




