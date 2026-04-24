import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        user: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true, unique: true},
        role: { type: String, enum: ["user", "admin"], default: "user"},
    },
    {versionKey: false},
);

export default mongoose.model("user", userSchema);
