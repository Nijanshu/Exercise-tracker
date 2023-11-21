const express = require('express');
const router = express.Router();
const Exer = require('../models/exercises');
const USER = require('../models/users');

router.get('/', async (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  require('dotenv').config();

  // Connection URI
  const uri = process.env.mongoDBURI;

  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the collection name
    const collectionName = 'userrs';

    // Access the database and collection
    const db = client.db();
    const collection = db.collection(collectionName);

    // Find all documents in the collection
    const cursor = collection.find();

    // Convert the cursor to an array of documents
    const documents = await cursor.toArray();

    // Send the documents as JSON response
    res.json(documents);

    // Close the connection
    await client.close();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).send('Error connecting to MongoDB');
  }
});


router.get('/:_id/logs', async(req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params._id });
    const dateFrom = new Date(req.query.from);
    const dateTo = new Date(req.query.to);
    const limit = parseInt(req.query.limit);

    if (user) {
      user.exercises.filter(exercise =>
        new Date(Date.parse(exercise.date)).getTime() > dateFrom
        && new Date(Date.parse(exercise.date)).getTime() < dateTo
    )
    let log=user.exercises;
      if (limit) log = log.slice(0, limit)

      res.json({
        _id: user._id,
        username: user.username,
        count: log.length,
        log: log
      });
    }else{
      res.json({error: 'User not found'});
    }
  }catch(e){

  }
})


router.post('/', async function(req, res) {
  try {
    const resp = await USER.create({
      exercises: [],
      username: req.body.username,
    });

    res.json({
      username: resp.username,
      exercises: resp.exercises,
      _id: resp._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error.message);
  }
});

router.post('/:_id/exercises', async function(req, res) {
  try {
    const user = await USER.findOne({ _id: req.params._id });
    if (user) {
      const invalidDate = "Invalid Date";

      let pdate = req.body.date?new Date(req.body.date).toDateString(): new Date().toDateString();
      pdate.toString() === invalidDate
        ? res.json({ error: invalidDate })
        : ''
      let {description, duration}= req.body;
      duration=Number(duration);
        const newExercise={
          description: description,
          duration: duration,
          date: pdate
        }

        async function updateUserExercise() {
          try {
            const user = await USER.findOne({ _id: req.params._id });
            console.log(newExercise);
            user.exercises.push(newExercise);
            await user.save();
        
            const response = {
              _id: user._id,
              username: user.username,
              description: user.exercises[user.exercises.length - 1].description,
              duration: user.exercises[user.exercises.length - 1].duration,
              date: new Date(user.exercises[user.exercises.length - 1].date).toDateString(),
             
            };
        
            res.json(response);
          } catch (err) {
            console.error(err);
            res.send(ERROR);
          }
        }
        updateUserExercise();
    } else {
      return res.json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error.message);
  }
});

module.exports = router;
