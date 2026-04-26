import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "bug-bounty-auth-secret";

function getToken(req) {
    if (req.cookies?.token) return req.cookies.token;

    let cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        let cookies = cookieHeader.split(";").map(cookie => cookie.trim());
        let tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
        if (tokenCookie) return decodeURIComponent(tokenCookie.split("=").slice(1).join("="));
    }

    let authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);

    return null;
}

function auth(req, res, next){
    let token = getToken(req)
    if(!token) return res.status(401).send({message: "Not Logged in"});

    try {
        let decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send({message: "Token is not valid"})
    }
}

export default auth
