import mongoose from "mongoose";

const saplingArticleSchema = mongoose.Schema({
    name: String,
    origin: String,
    price: Number,
    plantingDate: Date,
    releaseDate: Date,
    createdAt: Date,
});

const SaplingArticle = mongoose.model("saplingArticle", saplingArticleSchema);

export default SaplingArticle;
