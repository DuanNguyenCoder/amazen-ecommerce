const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const mongooseAlgolia = require("mongoose-algolia");

const ProductSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    image: String,
    title: String,
    description: String,
    price: Number,
    created: { type: Date, default: Date.now },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual("averageRating").get(function () {
  var rating = 0;
  if (this.reviews.length == 0) {
    rating = 0;
  } else {
    this.reviews.map((review) => {
      rating += review.rating;
    });
    rating = rating / this.reviews.length;
  }
  return rating;
});

// Sync function to Algolia
ProductSchema.plugin(deepPopulate);
ProductSchema.plugin(mongooseAlgolia, {
  appId: "FCW6D3LK4W",
  apiKey: "8ade48fef80aecbfacfea2b94183c2cc",
  indexName: "mean",
  selector:
    "_id title image reviews description category price owner created averageRating brand",
  populate: {
    path: "owner reviews brand category",
    select: "name rating",
  },
  defaults: {
    author: "unknown",
  },
  mappings: {
    title: function (value) {
      return `${value}`;
    },
  },
  debug: true,
});
let Model = mongoose.model("Product", ProductSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
  searchableAttributes: ["title"],
});

module.exports = Model;
