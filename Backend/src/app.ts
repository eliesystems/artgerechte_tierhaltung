import express from "express";
import farmRoutes from "./routes/farm.routes";
import userRoutes from "./routes/user.routes"
import answerRoutes from "./routes/answer.routes"
import cors from 'cors';

require('dotenv').config();

const app = express();	

app.use(cors({
    origin: "https://artgerechtepferdehaltung.elie.de"
}));

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});
  

// Routes
app.use("/api/farms", farmRoutes);
app.use("/api/save-user", userRoutes);
app.use("/api/answers", answerRoutes);

export default app;