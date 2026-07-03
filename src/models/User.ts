import  {Schema, InferSchemaType, model, models} from "mongoose";

const UserSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        mobile: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true},
        address: {type: String, required: true},
        village: {type: String, required: true},
        dairyCode: {type: String, required: true},
        secretaryName: {type: String, required: true, default:""},
    },{
        timestamps: true
    }
)

export type IUser = InferSchemaType<typeof UserSchema>
export default models.User || model("User", UserSchema)