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
   const user = req.session.currentUser._id;

   if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'user not found'  
    });
  }

  if (user.match(/^[0-9a-fA-F]{24}$/)) {

    Speech.findById(id)
     .then((result) => {
        if (!result){
          return res.status(404).json({
            error: 'user not found'  
          })
        }
          return res.status(200).json(result)
      })
      .catch((error) => {
        return res.status(404).json({
        error: 'user not found'
        })
      })

    }


  // if (user.match(/^[0-9a-fA-F]{24}$/)) {

  //   Speech.findById(id, (err, speech) => {
  //     if (err) {
  //       next(err);
  //     } else {
  //       res.status(200).json(speech)
  //     }
  //   });   
  //  } else {
  //   return res.status(404).json({
  //     error: 'User not found'  
  //   });
  //  }

   
   
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

  const newSpeech = new Speech({
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    owner: req.body.owner,
    is_Public: req.body.is_Public,
  });

  if ( !newSpeech.title || !newSpeech.message || !newSpeech.tag[0] || !newSpeech.is_Public) {
      return res.status(422).json({
      error: 'Fields cannot be empty'
    })
  }

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

  if ( !updateSpeech.title || !updateSpeech.message || !updateSpeech.tag[0] || !updateSpeech.is_Public) {
    return res.status(422).json({
    error: 'Fields cannot be empty'
  })
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
      next(err);
    }else{
        res.status(204);
    }
  })
})

// Push favourites.
router.post('/:id', (req, res, next) => {
  const userId = req.session.currentUser._id
  const speechId = req.params.id;
  console.log(userId, 'soy el userId')
  User.findById(userId)
    .then((user) => {
      const favourite = user.favourites.find((element) => {
        return element === speechId
      })
      if (favourite === undefined) {
        user.favourites.push(ObjectId(speechId))
        user.save()
        .then(() => {
          console.log('saved to favs')
        })
        .catch(next)
      } 
    })
    .catch(() => {
      res.status(422).json({
        error: 'Favourites didnt work'
      })
    })
  })

module.exports = router;