import { InferSchemaType, model, models, Schema } from "mongoose";

const SettlementSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true, index: true},
    startDate: {type: Date, required: true, default: Date.now},
    endDate: {type: Date, default: null},
    status: {type: String, enum: ["ACTIVE", "COMPLETED"], default: "ACTIVE"},
    completedAt: {type: Date, default: null},   
}, {timestamps: true})

SettlementSchema.index({
  userId: 1,
  status: 1,
});

export type ISettlement = InferSchemaType<typeof SettlementSchema>
export default models.Settlement || model("Settlement", SettlementSchema)