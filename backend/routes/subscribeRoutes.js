const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route POST /api/subscribe
//@desc Handle newsletter subscription
//@access public

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    //CHeck if email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    //Create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Successfully subscribed to newsletter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
