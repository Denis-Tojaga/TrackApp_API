const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');


//making a Track model
const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);




router.get('/tracks', async (req, res) => {
  //query for finding all tracks that specific user made
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});








router.post("/tracks", async (req, res) => {

  const { name, locations } = req.body;

  if (!name || !locations)
    return res.status(422).send({ error: "You must provide a name and locations!" });


  try {

    //after creating this new track we can attempt to save it to our database
    const track = new Track({ name: name, locations: locations, userId: req.user._id });
    await track.save();
    res.send(track);

  } catch (error) {

    res.status(422).send({ error: error.message });

  }

});






module.exports = router;
