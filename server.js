import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import db from './src/config/db.js';
import categoryRoute from './src/routes/categoryRoute.js';
import {errorHandler} from "./src/middlewares/errorHandler.js";
import categoryController from "./src/controllers/categoryController.js";
import authorRoute from "./src/routes/authorRoute.js";
import publisherRoute from "./src/routes/publisherRoute.js";
import bookRoute from "./src/routes/bookRoute.js";
import reviewRout from "./src/routes/reviewRout.js";
import userRoute from "./src/routes/userRoute.js";
import {swaggerServe, swaggerUiMiddleware} from "./src/config/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerServe, swaggerUiMiddleware);

// set port for requests
const PORT = process.env.PORT || 3000;

// simple route
app.get("/", (request,response) => {
    response.send({msg: "Welcome to bookManagement API"});
})

// routs
app.use('/api/categories',categoryRoute);
app.use('/api/authors',authorRoute);
app.use('/api/publishers',publisherRoute);
app.use('/api/books',bookRoute);
app.use('/api/reviews',reviewRout);
app.use('/api/users',userRoute);


// error handle middleware
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});