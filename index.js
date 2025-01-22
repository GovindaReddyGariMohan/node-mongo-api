const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/userDetails')
const dotEnv=require('dotenv')
const app = express()
app.use(express.json())
app.use(cors())
dotEnv.config()
const PORT=process.env.PORT

mongoose.connect(process.env.MONGO_URL);

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json('success')
                }
                else {
                    res.json('password is incorrect')
                }
            } else {
                 res.json('no record existed')
            }
        })
})


app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})


app.listen(PORT, () => {
    console.log('successfully conected')
})