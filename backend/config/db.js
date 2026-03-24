import mongoose from "mongoose";

const connectDb=async () => {
  try {
   await mongoose.connect(process.env.MONGODB_URI)
    console.log('Db is connected');
    
  } catch (error) {
    console.log("Db is not connected");
    
  }
}
export default connectDb