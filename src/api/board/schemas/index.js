import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    id: { type: String, required: true },
    content: { type: String, required: true },
    columnId: { type: String, required: true },
  },
  { _id: false }
);

const columnSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    cards: [cardSchema],
  },
  { _id: false }
);

const boardSchema = new Schema(
  {
    userId: { type: String, required: true },
    columns: [columnSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_obj, ret) => {
        delete ret._id;
      },
    },
  }
);

boardSchema.index({ userId: 1 });

boardSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? { ...view, columns: this.columns } : view;
  },
};

const model = mongoose.model("board", boardSchema);

export const schema = model.schema;
export default model;
