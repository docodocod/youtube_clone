import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import config from './config/key.js';
import mongoose from 'mongoose';
const connect=mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users',require('./routes/users'));

app.use('/uploads',express.static('uploads'));

if(process.env.MODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../client","build","index.html"));
    });
}

const port=process.env.PORT || 8089

app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})

