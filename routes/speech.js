const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Speech = require('../models/speech');
const session = require('express-session');
const { isLoggedIn } = require('../helpers/middlewares');

const ObjectId = mongoose.Types.ObjectId;

router.get('/:id', (req, res, next) => {
   const id = req.params.id;

  Speech.findById(id, (err, speech) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(speech)
    }
  });   
});


router.get('/', (req, res, next) => {
console.log(req.query);
  
  Speech.find(req.query, (err, speechList) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(speechList)
    }
  });
});

router.post('/', (req, res, next) => {
  // const userId = req.session.currentUser._id;

  // console.log('entra');
  // console.log(req.query);

  // const owner = ObjectId("5be42047b88f1e220904717a");
  const newSpeech = new Speech({
    // owner,
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    owner: req.body.owner,
    is_Public: req.body.is_Public,
  });

  newSpeech.save((err) => {
    if(err){
        next(err);
    }else{
      res.status(200).json({ newSpeech });
    }
  })
});

router.put('/:id', (req,res,next) => {
  const id = req.params.id;

  let addTag = []
  addTag.push(req.body.tag);

  const updateSpeech = {
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    is_Public: req.body.is_Public,
  }

  Speech.findByIdAndUpdate(id, updateSpeech, (err) => {
    if (err){
      next(err);
    }else{
        res.status(200).json({message: 'Updated'});
    }
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Speech.findByIdAndDelete(id, (err) => {
    if (err){
      console.log('error delete no llega al 200')
      next(err);
    }else{
      console.log('llega al 200')
        res.status(200).json({message: 'Deleted.'});
    }
  })
})

module.exports = router;