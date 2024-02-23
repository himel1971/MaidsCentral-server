const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://MaidsCentral:MaidsCentral2024@cluster0.8q4v8nz.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        // My codes 

        const MaidCollection = client.db("MaidsCentral").collection("maids");
        const BlogCollection = client.db("MaidsCentral").collection("blogs");
        const userCollection = client.db("MaidsCentral").collection("users");
        const tipsCollection = client.db("MaidsCentral").collection("tips");





        app.get('/maids', async (req, res) => {
            const cursor = MaidCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });
        app.get('/blogs', async (req, res) => {
            const cursor = BlogCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });
        app.get('/tips', async (req, res) => {
            const cursor = tipsCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });


        app.post('/users', async (req, res) => {
            const userData = req.body;
            console.log(userData);
            const result = await userCollection.insertOne(userData);
            res.send(result);
        })



        app.post('/maids', async (req, res) => {
            const data = req.body;
            const result = await MaidCollection.insertOne(data);
            res.send(result);
          })
      





        //Update User Type
        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id, "update");
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updateUser = req.body;

            const updateDeliverymen = {
                $set: {
                    type: updateUser.type,


                }
            }

            // console.log(updateDeliverymen);
            const result = await userCollection.updateOne(filter, updateDeliverymen, options);
            res.send(result);
        })

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id, "update");
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updateUser = req.body;

            const updateDeliverymen = {
                $set: {
                    type: updateUser.type,


                }
            }

            // console.log(updateDeliverymen);
            const result = await userCollection.updateOne(filter, updateDeliverymen, options);
            res.send(result);
        })

        //delete Function
        app.delete('/maids/:id', async (req, res) => {
            const id = req.params.id;
            console.log('id', id);
            const filter = { _id: new ObjectId(id) }
            const result = await MaidCollection.deleteOne(filter);
            res.send(result);
        })


        // My codes 



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Maid Central is running!");
})


app.listen(port, () => {
    console.log(`Maid Central server is on ${port}`);
})