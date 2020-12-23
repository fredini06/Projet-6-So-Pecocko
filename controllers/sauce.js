const Thing = require('../models/Thing');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  console.log(JSON.parse(req.body.sauce));
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  console.log(req.body);
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce =  (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  if(req.body.like == 1) {
    Thing.updateOne({ _id: req.params.id }, {
      $inc: { likes: 1 },
      $push: { usersLiked: req.body.userId },
      _id: req.params.id
    })
    .then(() => res.status(200).json({ message: 'Objet liké !'}))
    .catch(error => res.status(400).json({ error }));
  } else if(req.body.like == -1) {
    Thing.updateOne({ _id: req.params.id }, {
      $inc: { dislikes: 1 },
      $push: { usersDisliked: req.body.userId },
      _id: req.params.id
    })
    .then(() => res.status(200).json({ message: 'Objet disliké !'}))
    .catch(error => res.status(400).json({ error }));
  } else if(req.body.like == 0) {
    
  }
}


