const express = require('express');
const port = process.env.PORT || 5000
const cors = require('cors');
const { Collection, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()

// Middleware

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Genius car server running..........')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cjbk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db('geniusCarData').collection('service')
        // console.log('Genius car server mongo db connected')
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            res.send(service)
        })

        app.post('/service', async (req, res) => {
            const newService = req.body
            const result = await servicesCollection.insertOne(newService)
            res.send(result)
        })

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await servicesCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }

}
run().catch(console.dir)











app.listen(port, () => {
    console.log('Genius car server Server running port: ', port)
})