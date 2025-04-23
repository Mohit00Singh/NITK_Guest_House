import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongo = () => {
  mongoose
    .connect(`mongodb+srv://mohit:mohit@nitk-gh.nh8fums.mongodb.net/?retryWrites=true&w=majority&appName=NITK-GH`)
    .then(() => {
      console.log("Connection success");
    })
    .catch((error) => {
      console.log(" Error " + error);
    });
};

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDb disconnected");
})
mongoose.connection.on("connected",()=>{
  console.log("MongoDb connected");
})
export default connectToMongo;

