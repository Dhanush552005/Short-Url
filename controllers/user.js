const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { setuser } = require("../service/auth");


async function handlesignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("signup", { Error: "Email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.redirect("/user/login");
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send("An error occurred during signup.");
    }
}


async function handlelogin(req, res) {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.render("login", { Error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.render("login", { Error: "Invalid email or password" });
        }

        const token = setuser(foundUser); // ✅ Correct variable
        res.cookie("uid", token, { httpOnly: true });

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
