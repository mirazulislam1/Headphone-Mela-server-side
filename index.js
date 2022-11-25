const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express();

//middleware
app.use(cors());
app.use(express.json());



// Application code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qrjo9vr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// crud operation
async function run(){
    try{
        const categoriesCollection = client.db('categoryProduct').collection('categories');

        app.get('/categories', async(req, res)=>{
            const query= {};
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    finally{

    }

}
run().catch(error => console.error(error))

app.get('/', async(req, res)=>{
    res.send('Resell server side is running ')
})

app.listen(port, ()=>{
    console.log(`resell server running on ${port}`)
})