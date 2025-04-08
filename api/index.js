import express from "express";
import connectToMongo from './db.js';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import guesthousesRoute from "./routes/guesthouses.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const port = 5000;
connectToMongo();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

app.use("/auth", authRoute);
app.use("/guesthouses", guesthousesRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


  app.post("/send-email", async (req, res) => {
    const { email, subject, text } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "punamkumavat01@gmail.com", // Replace with your email
        pass: "", // Replace with your email password
      },
    });
    
    const mailOptions = {
      from: "punamkumavat01@gmail.com", // Replace with your email
      to: email,
      subject,
      text,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(port , () => {
    console.log("Connected to Backend!");
})