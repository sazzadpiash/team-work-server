const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

// midleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Team Server Is Running SuccesFully!")
})

// assignment10 IU3jnI20EyJc0tJu

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.06w34xu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const teams = client.db("team-work").collection("teams");
        // const review = client.db("team-work").collection("reviews");
        app.post('/create-team', async (req, res) => {
            const data = req.body;
            data.date = new Date();
            const result = await teams.insertOne(data)
            res.send(result);
        })

        app.get('/teams/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = teams.find(query);
            const result = cursor.toArray();
            res.send(await result)
        })

    }
    finally { }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('HTTP Server Runing at 5000')
})
