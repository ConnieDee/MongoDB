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
//Part 3
app.get('/films', async (reg, res) => {
    const getTen = await client.db('movie').collection(
        'films').find({}, {projection:{title:1}, limit: 10}).toArray().

    res.json({
        message: 'Here are the first ten films!',
        data: getTen
    })
})

//Part 5

app.get('/films', async (reg, res) => {
    const starSearch = await client.db('movie').collection(
        'films').find({}, {projection:{title:1}}).toArray().
    res.json({
        message: 'Results Found!',
        data: starSearch
    })
})

//Part 6

app.get('/films', async (reg, res) => {
    const actorSearch = await client.db('movie').collection(
        'films').find({}, {projection:{title:1}}).toArray().
    res.json({
        message: 'Actor Found!',
        data: actorSearch
    })
})

//Part 7


app.post('/films', (req, res) => {
    const watchList= await client.db('movie').collection(
        'watch').insertOne(req,body)

    res.json({
        message: 'You Added a New Film!',
        data: watchList 
    })
})

//Part 8

app.get('/films', async (reg, res) => {
    const getTen = await client.db('movie').collection(
        'watch').find({}, {limit: 10}).toArray().

    res.json({
        message: 'Here are the first ten films!',
        data: getTen
    })
})

//Part 9


app.delete('/watch/:id', async (res, req) => {
    await client.db('movie').collection('film').deleteOne({
        _id: new ObjectId(req.params.id)})

    res.json({
        message: 'You Deleted a Film!'
    })
})



app.listen(3000, () => {
    console.log('Serving is running')
})