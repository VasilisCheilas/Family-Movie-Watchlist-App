import {authenticate} from "../middleware/authenticate.js";
import {authorizeModification} from "../middleware/authorize.js";
import { getWatchlist,addMovie, updateMovie, deleteMovie } from "../utils/db.js";

import express from "express";

const router = express.Router();

router.get("/:userId",authenticate,(req,res)=>{
    const id = Number(req.params.userId);
    const watchlist = getWatchlist(id);
    return res.status(200).json({watchlist});
});

router.post("/:userId/movies",authenticate,authorizeModification,(req,res)=>{
    const user_id = Number(req.params.userId); 
   
    const result = addMovie(user_id,req.body);
    if(!result){
        return res.status(500).json({"error":"Problem during adding the movie"});

    }
    return res.status(201).json({"message":"Movie added successfully"});
});
router.put("/:userId/movies/:movieId",authenticate,authorizeModification,(req,res)=>{

    const user_id = Number(req.params.userId);
    const movie_id = Number(req.params.movieId);

    const result = updateMovie(user_id,movie_id,req.body);
    if(!result){
        return res.status(500).json({"error":"Problem during updating the movie"});

    }
    return res.status(200).json({"message":"Movie updated successfully"});


});
router.delete("/:userId/movies/:movieId",authenticate,authorizeModification,(req,res)=>{
    const user_id = Number(req.params.userId);
    const movie_id = Number(req.params.movieId);
    const result = deleteMovie(user_id,movie_id);
    if(!result){
        return res.status(500).json({"error":"Problem during delete the movie"});

    }
    return res.status(200).json({"message":"Movie deleted successfully"});

});

export default router;