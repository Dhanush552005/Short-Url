const user = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setuser } = require("../service/auth");

async function handlesignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.render("signup", { Error: "Email is already in use" });
        }

        await user.create({
            name,
            email,
            password,
        });

        return res.redirect("/login");
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send("An error occurred during signup.");
    }
}

async function handlelogin(req, res) {
    const { email, password } = req.body;

    try {
        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.render("login", {
                Error: "Invalid username or password",
            });
        }

        if (foundUser.password !== password) {
            return res.render("login", {
                Error: "Invalid username or password",
            });
        }

        const token=setuser(user);
        res.cookie("uid",token);
        return res.redirect("/");
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("An error occurred during login.");
    }
}
module.exports = {
    handlesignup,
    handlelogin,
};
