const jwt = require('jsonwebtoken');

//middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: 'Acceso denegado'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); //continua con la siguiente funcion
    }catch (error){
        res.status(400).json({error: 'Token no válido'});
    }
}

module.exports = verifyToken;