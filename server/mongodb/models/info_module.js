const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    englishCountryName: { type: String, required: true },
    englishBody: [{ type: String, required: true }],
    hebrewCountryName: { type: String },
    hebrewBody: [{ type: String }],
    arabicCountryName: { type: String },
    arabicBody: [{ type: String }],
    songsList: [
        {
            songName: { String, default: "" },
            songArtist: { type: String, default: "" },
            songPath: { type: String, default: "" },
            imgPath: String,
            like: Number,
            dislike: Number,
        }
    ]
});

const infoSchema = new mongoose.Schema({
    asia: [countrySchema],
    africa: [countrySchema],
    oceania: [countrySchema],
    europe: [countrySchema],
    northAmerica: [countrySchema],
    southAmerica: [countrySchema],
});


const Info = mongoose.model('Info', infoSchema);

module.exports = Info;