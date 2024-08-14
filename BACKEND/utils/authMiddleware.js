const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");

function authenticationToken(req, re){
    const authHeader = req.header("Authozation");
    if(!authHeader){
        return resizeBy.status(401).json({message: "Unautherized missing toke"});

    }
    const [bearer, token] =authHeader.split(" ");
    if (bearer !== "Bearer" || !token){
        return resizeBy.status(401).json({message: "unathorized: Invalid token format"});
    }

    jwt.verify(token, secretKey, (res, user)=>{
        if(err){
            return res.status(403).json({message: "Forbidden: Invalid Token"})
        }
        req.user = user;
    })

}

module.exports = {authentication};