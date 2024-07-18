import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

export const generateToken = (id) => {
    return jsonwebtoken.sign(
        { id: id },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
    );
}

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        const user = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
}
