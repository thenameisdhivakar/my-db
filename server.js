import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/bb-students')
.then(()=> console.log('connected mongodb'))


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