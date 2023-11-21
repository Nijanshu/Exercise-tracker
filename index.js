const express = require('express')
const app = express()
app.use(express.json());

const cors = require('cors')
require('dotenv').config()

let bodyParser=require('body-parser');
const connectToMongo = require('./db');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));// express 11
app.use(bodyParser.json());

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use('/api/users', require('./routes/user'));




app.listen(port,async() => {
  try{
    await connectToMongo();
  console.log(`iBlog listening at ${port}`);
}catch(e){
  console.log("error: ", e.message);}
});
