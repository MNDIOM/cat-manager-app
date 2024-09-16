const express = require('express');
const Cat = require('../models/Cat'); // Correct path to the Cat model
const router = express.Router();

// Route to add a new cat
router.post('/cats', async (req, res) => {
  try {
    const { name, age, colour } = req.body;
    const newCat = new Cat({ name, age, colour });
    await newCat.save();
    res.status(201).send('Cat added successfully');
  } catch (error) {
    res.status(400).send('Error adding cat: ' + error.message);
  }
});

// Route to get all cats
router.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(400).send('Error fetching cats: ' + error.message);
  }
});

// Route to get a specific cat by ID
router.get('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (cat) {
      res.status(200).json(cat);
    } else {
      res.status(404).send('Cat not found');
    }
  } catch (error) {
    res.status(400).send('Error fetching cat: ' + error.message);
  }
});

// Route to delete a cat by ID
router.delete('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);
    if (cat) {
      res.status(200).send('Cat deleted successfully');
    } else {
      res.status(404).send('Cat not found');
    }
  } catch (error) {
    res.status(400).send('Error deleting cat: ' + error.message);
  }
});

module.exports = router;
