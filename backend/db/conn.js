const mongoose = require("mongoose");

async function main () {

     try {
          mongoose.set("strictQuery", true);

        await mongoose.connect("mongodb+srv://MJ:7KhkZ2E94FCijTTL@cluster0.zzoif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Conectado ao banco!");
     } catch (error) {
        console.log(`Erro: ${error}`);
     }
};

module.exports = main;