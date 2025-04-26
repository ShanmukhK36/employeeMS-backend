import User from "./models/User.js";
import bcrypt from 'bcrypt';
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
    connectToDatabase()
    try {
        const admin = await User.findOne({ email: "admin@gmail.com" });
        if (!admin) {
          const hashPassword = await bcrypt.hash("admin", 10);
          const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
          });
          await newUser.save();
          console.log("Admin user created!");
        } else {
          console.log("Admin user already exists.");
        }
      } catch (error) {
        console.log("Error creating admin user:", error);
      }
}

export {userRegister}