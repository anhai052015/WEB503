import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/WEB503_ASM1`);
    console.log(`Kết nối db thành công!`);
  } catch (error) {
    console.log(`Kết nối db thất bại!`, error.message);
  }
};

export default connectDB;
