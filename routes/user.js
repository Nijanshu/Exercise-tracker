const express = require('express');
const router = express.Router();
const Exer = require('../models/exercises');
const USER = require('../models/users');

router.post('/', async function(req, res) {
  try {
    const resp = await USER.create({
      username: req.body.username
    });

    res.json({
      username: resp.username,
      _id: resp._id
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

      let pdate = new Date(req.body.date).toDateString();
      pdate.toString() === invalidDate
        ? res.json({ error: invalidDate })
        : console.log("valid date");

      const existingExer = await Exer.findOne({ _id: req.params._id });

      if (existingExer) {
        const ans = await Exer.updateOne(
          { _id: req.params._id },
          {
            username: user.username,
            description: req.body.description,
            duration: req.body.duration,
            date: pdate
          }
        );

        res.json({
          _id: req.params._id,
          username: user.username,
          date: pdate,
          duration: req.body.duration,
          description: req.body.description
        });
      } else {
        const newExer = await Exer.create({
          _id: req.params._id,
          username: user.username,
          description: req.body.description,
          duration: req.body.duration,
          date: pdate
        });

        res.json({
          _id: newExer._id,
          username: newExer.username,
          date: newExer.date,
          duration: newExer.duration,
          description: newExer.description
        });
      }
    } else {
      return res.json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error.message);
  }
});

module.exports = router;
