import { InferSchemaType, model, models, Schema } from "mongoose";

const MilkEntrySchema = new Schema(
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

    shift: {
      type: String,
      enum: ["AM", "PM"],
      required: true,
    },

    milkAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bonus: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

MilkEntrySchema.index(
  {
    settlementId: 1,
    date: 1,
    shift: 1,
  },
  {
    unique: true,
  },
);

export type IMilkEntry = InferSchemaType<typeof MilkEntrySchema>;

export default models.MilkEntry || model("MilkEntry", MilkEntrySchema);
