import User from "../models/user.model.js";

async function addUser(req, res) {
    try {
        let newUser = req.body;

        if (req.file) {
            newUser.avatarUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        let user = await User.findOne({ email: newUser.email });
        if (user) {
            return res.status(400).send({ message: "Email is already taken" });
        }

        newUser = await User.create(newUser);
        res.status(201).send(newUser);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not added", error: error.message });
    }
}



async function allUsers(req, res) {
    try {
        let { role } = req.query;
        let filter = {};
        if (role) filter.role = role;

        let users = await User.find(filter).sort({ reputation: -1, createdAt: -1 });
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error fetching users", error: error.message });
    }
}



async function getUserById(req, res) {
    try {
        let { id } = req.params;

        let user = await User.findById(id).populate("company");

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



async function searchUser(req, res) {
    try {
        let { query } = req.query;

        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        let users = await User.find({
            username: { $regex: query, $options: "i" }
        });

        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error searching users", error: error.message });
    }
}

async function updateUserAvatar(req, res) {
    try {
        let { id } = req.params;

        if (!req.file) {
            return res.status(400).send({ message: "Avatar image is required" });
        }

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            {
                avatarUrl: `http://localhost:5000/uploads/${req.file.filename}`
            },
            { returnDocument: "after" }
        );

        if (updatedUser !== null) {
            res.send(updatedUser);
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Avatar not updated", error: error.message });
    }
}



async function updateUser(req, res) {
    try {
        let { id } = req.params;
        let updatedUser = req.body;

        updatedUser = await User.findOneAndUpdate(
            { _id: id },
            updatedUser,
            { returnDocument: "after" }
        );

        if (updatedUser !== null) {
            res.send(updatedUser);
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not updated", error: error.message });
    }
}



async function deleteUser(req, res) {
    try {
        let { id } = req.params;

        let user = await User.findOneAndDelete({ _id: id });

        if (user !== null) {
            res.send({ message: "User deleted" });
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "User not deleted", error: error.message });
    }
}

// auth functions
async function loginUser(req, res){
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email: email })
        if(user){
            if(user.password == password){
                let token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 86400 * 1000 // milis: 1 day
                })
                res.send(user)
            } else {
                res.status(401).send({message: "Invalid Password"})
            }
        } else {
            res.status(404).send({message: "Invalid Email"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({"message": "user not logged in", "error": error.message})
    
    }
}

async function logout(req, res){
    try {
        res.clearCookie('token')
        res.send({message: "Logged Out"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"message": "user not logged out", "error": error.message})
    }
}

async function getCurrentUser(req, res){
    try {
        let { id } = req.user
        let user = await User.findOne({_id: id}).select('-password')
        if(user){
            res.send(user)
        } else {
            res.status(404).send({message: "User not found"});
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({"message": "user not found", "error": error.message})
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