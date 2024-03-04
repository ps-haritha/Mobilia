const express = require('express');
const cors = require('cors');


const mongoose = require ('mongoose')
const loginRouter = require('./src/routes/loginRouter')
const userRouter = require('./src/routes/userRouter')
const furnitureRouter = require('./src/routes/furnitureRouter')
const furnitureCartRouter = require('./src/routes/furnitureCartRouter')


const app = express();

app.use(cors());

app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
         res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
         next();
     });


app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/login',loginRouter)              //for login
app.use('/api/register',userRouter)            // for registration
app.use('/api/furniture',furnitureRouter)       // for add/edit/delete furniture details
app.use('/api/cart',furnitureCartRouter)        //for managing cart 

mongoose.connect('mongodb+srv://haritha0105:haritha0105@cluster0.oqvptms.mongodb.net/Mobilia_db?retryWrites=true&w=majority').then((data) => {
    app.listen(2000, () => {
        console.log('server starts at http://localhost:2000');
    })
}).catch(err=>{
console.log(err);
})