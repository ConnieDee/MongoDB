const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()

app.use(epress.json())

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, { useUnifiedTopology:true});

const connect = async() => {
    try{
        await client.connect();
        console.log("Connected to Local Database");
    }catch (e) {
         console.log("An Error Occurred: (")
         console.error(e);
     } //finally {await client.close();}
}

connect()

app.get('/films', async (reg, res) => {
    const getTen = await client.db('movie').collection(
        'films').find({}, {projection:{title:1}, limit: 10}).toArray().

    res.json({
        message: 'Here are the first ten films!',
        data: getTen
    })
})




app.listen(3000, () => {
    console.log('Serving is running')
})