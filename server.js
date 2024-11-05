import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());

const connectionString = process.env.MONGODB_URL;  
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


const user = new mongoose.Schema({
    name: String,
    mail : String,
    feedback : String,
})

const userModel = mongoose.model('user', user);

app.get('/bb-students',(req,res)=>{
    userModel.find()
    .then((data)=> res.json(data))
    .catch(()=> res.status(500).send('Error'))
});
app.post('/',(req,res)=>{
    const studentsList = new userModel(req.body);
    studentsList.save()
    .then((data)=> res.json(data))
    .catch(()=>res.status(500).send('Error'))
});
app.put('/bb-students/:id',(req,res)=>{
    const {id} =  req.params;
    const updatedData = req.body;

    userModel.findByIdAndUpdate(id,updatedData)
    .then((data)=> res.json(data))
    .catch(()=>res.status(500).send('Error'))
});
app.delete('/bb-students/:id',(req,res)=>{
    const {id} = req.params;
    userModel.findByIdAndDelete(id)
    .then((data)=> res.json(data))
    .catch(()=>res.status(500).send('Error'))
});

app.listen(3000,()=>console.log('server running 3000'))