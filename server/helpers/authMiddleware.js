module.exports = function(req,res,next){
    if (req.isAuthenticated())  next()
    else res.status(500).send({msg: "You need to Log In to access to this feature"});
}