import express from 'express' ; 
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express() ; 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); 
app.use(express.json())
app.use(bodyParser.json())

app.get('/' , (req , res) =>{
    res.json("Api is running")
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const bindAdress = process.env.BIND_ADDRESS || '0.0.0.0'
app.listen(port , bindAdress, () =>{
    console.log(`Server is running at http://localhost:${port}`)
})