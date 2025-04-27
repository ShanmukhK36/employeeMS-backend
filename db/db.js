import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch(error) {
        console.log(error)
        process.exit(1); // Exit the app if DB connection fails
    }
}

export default connectToDatabase