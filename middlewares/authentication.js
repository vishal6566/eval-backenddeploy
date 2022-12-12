const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const token = req.headers?.auth?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send("Please login")
        }  
    }
    else{
        res.send("Please login")
    }
}


module.exports = auth