const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_Url);
};

async function listingData(){
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "69d9579e88766b62273df438"}));
    await Listing.insertMany(initData.data);
    console.log("Data is stored");
};

listingData();