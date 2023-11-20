const express = require('express');
const router = express.Router();
const Exer = require('../models/users');
const USER = require('../models/users');

router.post('/', async function(req, res) {
  // Get the username from the request body
    let user= await USER.findOne({_id: req.body._id})
    if(user) {

    console.log(user.username);

  const resp = await Exer.create({
    _id: req.body._id,
    // username: user.username,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
  });
console.log(resp)
  try {
    const saved = await resp.save();

    res.json({
        _id: saved._id,
        username: saved.username,
        date: saved.date,
        duration: saved.duration,
        description: saved.description
    });
  } catch (error) {
    // Handle the error appropriately, for example, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error.message);
  }
}
});

module.exports = router;
