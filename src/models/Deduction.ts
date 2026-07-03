import { InferSchemaType, model, models, Schema } from "mongoose";

const DeductionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    settlementId: {
      type: Schema.Types.ObjectId,
      ref: "Settlement",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "ADVANCE",
        "COW_FEED",
        "MILK",
        "GHEE",
        "MEDICINE",
        "OTHERS",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

DeductionSchema.index({
  settlementId: 1,
  date: -1,
});

export type IDeduction = InferSchemaType<typeof DeductionSchema>;

export default models.Deduction ||
  model("Deduction", DeductionSchema);