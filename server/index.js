import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import { clientRoutes, salesRoutes, managementRoutes, generalRoutes } from './routes/index.js';
import { User, AffiliateStat, OverallStat, Product, ProductStat, Transaction } from './models/index.js'
import { dataUser, 
    dataProduct, 
    dataAffiliateStat, 
    dataProductStat, 
    dataOverallStat, 
    dataTransaction } from './data/index.js';



//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


//mongoose setup
const PORT = process.env.PORT || 9000;          //9000 is the backup port 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} http://localhost:5001`));

    //AffiliateStat.insertMany(dataAffiliateStat);
    //OverallStat.insertMany(dataOverallStat);
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
    //Transaction.insertMany(dataTransaction);
    //User.insertMany(dataUser);
    
}).catch((error) => console.log(`${error} did not connect`));






