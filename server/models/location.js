import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  males: {
    type: Number,
    trim: true,
    required: true
  },
  females: {
    type: Number,
    trim: true,
    required: true
  },
  province: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("location", LocationSchema);
