import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "bug-bounty-auth-secret";

const cookieOptions = {
    httpOnly: true,
    secure: false,
    // sameSite: "lax", 
    path: "/"
};

function removePassword(user) {
    let userResponse = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;
    return userResponse;
}

// POST /users  — Register a new user
async function addUser(req, res) {
    try {
        let newUser = req.body;

        if (!newUser.username || !newUser.email || !newUser.password) {
            return res.status(400).send({ message: "Username, email and password are required" });
        }

        if (req.file) {
            newUser.avatarUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        let existing = await User.findOne({
            $or: [
                { email: newUser.email },
                { username: newUser.username }
            ]
        });
        if (existing) {
            return res.status(400).send({ message: "User already exists with this email or username" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        let createdUser = await User.create(newUser);
        res.status(201).send(removePassword(createdUser));

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not added", error: error.message });
    }
}

// GET /users  — All users (admin)
async function allUsers(req, res) {
    try {
        let { role } = req.query;
        let filter = {};
        if (role) filter.role = role;

        let users = await User.find(filter).select("-password").sort({ reputation: -1, createdAt: -1 });
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error fetching users", error: error.message });
    }
}

// GET /users/:id
async function getUserById(req, res) {
    try {
        let { id } = req.params;
        let user = await User.findById(id).select("-password").populate("company");

        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error fetching user", error: error.message });
    }
}

// GET /users/search?query=...
async function searchUser(req, res) {
    try {
        let { query } = req.query;

        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        let users = await User.find({
            username: { $regex: query, $options: "i" }
        }).select("-password");

        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error searching users", error: error.message });
    }
}

// PUT /users/:id/avatar
async function updateUserAvatar(req, res) {
    try {
        let { id } = req.params;

        if (!req.file) {
            return res.status(400).send({ message: "Avatar image is required" });
        }

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { avatarUrl: `http://localhost:5000/uploads/${req.file.filename}` },
            { new: true }
        );

        if (updatedUser) {
            res.send(removePassword(updatedUser));
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Avatar not updated", error: error.message });
    }
}

// PUT /users/:id
async function updateUser(req, res) {
    try {
        let { id } = req.params;
        let updatedData = req.body;

        // If password is being updated, hash it
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            updatedData,
            { new: true }
        );

        if (updatedUser) {
            res.send(removePassword(updatedUser));
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not updated", error: error.message });
    }
}

// DELETE /users/:id
async function deleteUser(req, res) {
    try {
        let { id } = req.params;
        let user = await User.findOneAndDelete({ _id: id });

        if (user) {
            res.send({ message: "User deleted" });
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not deleted", error: error.message });
    }
}

// POST /users/login
async function loginUser(req, res) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Please provide email and password" });
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Password" });
        }

        let token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { ...cookieOptions, maxAge: 86400 * 1000 });
        
        res.send(removePassword(user));
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error during login", error: error.message });
    }
}

// GET /users/logout
async function logout(req, res) {
    try {
        res.clearCookie("token", cookieOptions);
        res.send({ message: "Logged Out" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "User not logged out", error: error.message });
    }
}

// GET /users/current
async function getCurrentUser(req, res) {
    try {
        let user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error", error: error.message });
    }
}

export {
    addUser,
    allUsers,
    getUserById,
    searchUser,
    updateUser,
    updateUserAvatar,
    deleteUser,
    loginUser,
    logout,
    getCurrentUser
};
