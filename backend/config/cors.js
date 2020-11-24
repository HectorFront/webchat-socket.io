const cors = (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept', 'Authorization')
    res.header("Access-Control-Max-Age", "1728000");
    next();
 };

module.exports = cors;