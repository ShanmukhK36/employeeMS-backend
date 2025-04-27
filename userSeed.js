import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  try {
    console.log('Attempting to connect to database...');
    await connectToDatabase();
    console.log('Checking for admin user...');
    const testEmail = `shanmukh@gmail.com`;
    const admin = await User.findOne({ email: testEmail });
    if (!admin) {
      console.log('Creating admin user with email:', testEmail);
      const hashPassword = await bcrypt.hash('admin', 10);
      const newUser = new User({
        name: 'shanmukh',
        email: testEmail,
        password: hashPassword,
        role: 'admin',
      });
      await newUser.save();
      console.log('Admin user created successfully with email:', testEmail);
    } else {
      console.log('Admin user already exists with email:', testEmail);
    }
  } catch (error) {
    console.error('Error in userRegister:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export { userRegister };