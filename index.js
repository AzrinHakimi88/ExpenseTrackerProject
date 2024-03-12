import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ExpenseModel } from './Models/ExpenseModel.js';
dotenv.config()

const PORT = process.env.PORT
const app = express();

app.use(cors({
    origin: 'https://expense-tracker-kappa-pied.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json());

const db = mongoose.connect(process.env.MONGODB_CONNECTION)
            .then(() => {
                console.log('Connected to MongoDB')
            })

app.post('/', async (req, res) => {
    try{
        if(
            !req.body.type || !req.body.amount
        ){
            return res.send('Please provide request body')
        }

        const data = {
            type: req.body.type,
            amount: req.body.amount
        }

        const add = await ExpenseModel.create(data)
        return res.send('Added to MongoDB')

    }catch(err){
        console.log(err)
    }
})


app.get('/', async (req, res) => {
    try{
        const data = await ExpenseModel.find()
        return res.send(data)
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT,() => {
    console.log('listening on port '+process.env.PORT);
})