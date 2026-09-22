function authorizeModification(req,res,next){
    const isParent = req.user.role === "parent";
    const isValidChild = req.user.role === "child" && req.user.id == req.params.userId;

    if(!isParent && !isValidChild){
       return res.status(403).json({ "error": "Access denied" });
    }
    return next();
}

export {authorizeModification};