import mongoose from "mongoose";
import fs from 'fs';
import connectDB from "../config/db.js";
import Alien from "../models/Alien.js";
import path from "path";


await connectDB();

const __dirname = path.resolve();

const loadAliens = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${fileName}`);
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};


const classicAliens = loadAliens("./data/classic.json");
const alienForceAliens = loadAliens("./data/alien-force.json");
const ultimateAliens = loadAliens("./data/ultimate-alien.json");


try {
  console.log("🧹 Clearing old aliens from database...");
  await Alien.deleteMany({});


  if (classicAliens.length) {
    const withSeries = classicAliens.map(a => ({ ...a, series: "Ben 10 Classic"}));
    await Alien.insertMany(withSeries);
    console.log(`✅ Imported ${classicAliens.length} Ben 10 Classic Aliens`);
  }
  if (alienForceAliens.length) {
    const withSeries = alienForceAliens.map(a => ({ ...a, series: "Ben 10 Alien Force"}));
    await Alien.insertMany(withSeries);
    console.log(`✅ Imported ${alienForceAliens.length} Alien Force Aliens`);
  }
  if (ultimateAliens.length) {
    const withSeries = ultimateAliens.map(a => ({ ...a, series: "Ben 10 Ultimate Alien"}));
    await Alien.insertMany(withSeries);
    console.log(`✅ Imported ${ultimateAliens.length} Ultimate Aliens`);
  }

  console.log("✅ All aliens imported successfully!");
  
} catch (error) {
  console.error("❌ Error importing aliens:", error);
} finally {
  mongoose.connection.close();
}
