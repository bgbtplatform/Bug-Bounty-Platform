import User from "../models/user.model.js";

async function isSuperAdmin(req, res, next) {
    try {
        let user = await User.findById(req.user.id);
        if (!user || user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ message: "Forbidden: Super Admin access required" });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: "Server error verifying admin status" });
    }
}

export default isSuperAdmin;
