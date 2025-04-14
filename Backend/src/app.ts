import express from "express";
import farmRoutes from "./routes/farm.routes";
import userRoutes from "./routes/user.routes"
import answerRoutes from "./routes/answer.routes"
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

require('dotenv').config();

const prisma = new PrismaClient();

// Test the DB connection when the app starts
async function testDbConnection() {
	try {
	  	await prisma.$connect();  // Attempt to connect to the DB
	  	console.log('Successfully connected to the database');
	} catch (error) {
		console.error('Error connecting to the database:', error);
	}
};
  
// Run the test connection function on server startup
testDbConnection();

const app = express();	

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 204
};

app.use(cors(corsOptions))
app.options('/*api', cors(corsOptions));

console.log("Frontend: " + process.env.FRONTEND_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});
  

// Routes
app.use("/api/farms", farmRoutes);
app.use("/api/save-user", userRoutes);
app.use("/api/answers", answerRoutes);

export default app;