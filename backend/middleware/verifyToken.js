import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ msg: 'Token is not valid or missing user id' });
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}