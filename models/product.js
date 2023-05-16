const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0.1,
      max: 1000000,
    },
    imageLink: {
      type: String,
      requried: false,
      minLength: 5,
      maxLength: 4000,
    },
    inStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product = mongoose.model("product", ProductSchema);
