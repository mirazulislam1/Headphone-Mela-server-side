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
        const productsCollection = client.db('categoryProduct').collection('products');
        const bookingsCollection = client.db('categoryProduct').collection('bookings');

        app.get('/categories', async(req, res)=>{
            const query= {};
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/categories/:id', async(req, res) =>{
            const queryNumber = req.params.id
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            let productList = result.filter((x) => parseFloat(x.Category_id) === parseFloat(queryNumber))
            res.send(productList);
        });

        app.get('/bookings', async(req,res) =>{
            const email = req.query.email;
            const query = {email: email};
            const bookings = await bookingsCollection.find(query).toArray();
            console.log(bookings)
            res.send(bookings);
        })

        app.post('/bookings', async(req, res) =>{
            const bookings = req.body;
            const result = await bookingsCollection.insertOne(bookings);
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