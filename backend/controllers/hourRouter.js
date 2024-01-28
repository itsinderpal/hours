const hourRouter = require("express").Router();
const Hour = require("../models/hour");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}

hourRouter.get("/", async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({error: 'Invalid token'});
  }

  const userHours = await User.findById(decodedToken.id).populate('hours');
  
  res.json(userHours.hours);
});

hourRouter.post("/", async (req, res) => {
  const hour = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({error: 'Invalid token'});
  }

  const user = await User.findById(decodedToken.id);

  if (!hour.date || !hour.input || !hour.output) {
    return res.status(400).json({
      error: "Missing fields",
    });
  }

  const newHour = new Hour({ user: user.id , ...hour });
  const result = await newHour.save()

  user.hours = user.hours.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

hourRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({error: 'Invalid token'});
  }

  const user = await User.findById(decodedToken.id)

  user.hours = user.hours.filter(hour => {
    return String(hour) !== id;
  })
  await user.save();

  const newUserHours = await user.populate('hours');

  res.json(newUserHours.hours);
});

module.exports = hourRouter;
