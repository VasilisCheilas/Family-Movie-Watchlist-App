import express from "express";
import {findByUsername} from "../utils/db.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/jwt.js";
const router = express.Router();


router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({"error":"Username or password missing"});
    }
    const user = findByUsername(username); 
    let isPasswordCorrect = false;
    
    if (user) {
        // Κανονική σύγκριση αν βρέθηκε ο χρήστης
        isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    } else {
        // Αν ο χρήστης ΔΕΝ βρέθηκε, προσομοιώνουμε τον χρόνο ελέγχου
        // Κάνουμε ένα "άχρηστο" hash ώστε ο χρόνος απόκρισης να είναι πανομοιότυπος
        await bcrypt.hash(password, 10);
    }
    
    // Τώρα κάνουμε τον έλεγχο. Αν ελέγξουμε το `user` πρώτα, δεν θα "σκάσει" το user.id παρακάτω
    if (!user || !isPasswordCorrect) {
        return res.status(401).json({ "error": "Username or password incorrect" });
    }
    const payload = {
        id: user.id,
        role: user.role,
        username: user.username
    };
    const token = generateToken(payload);
    return res.status(200).json({"token":token});

});

export default router;
