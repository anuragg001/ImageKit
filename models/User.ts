import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";


// create interface for user model
export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

// create user Schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

},{
    timestamps: true,
}

);


// hooks before sending the data to the database ( to hash the pass)
userSchema.pre("save", async function () {
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10);
    }
});

// if model is already created, use it, otherwise create a new model
const User = models.User || model<IUser>("User", userSchema);

export default User;
