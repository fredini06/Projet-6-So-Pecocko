const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  console.log(JSON.parse(req.body.sauce));
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  console.log('params', req.params);
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      res.status(200).json(sauce);
      console.log(sauce);
    })
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce =  (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(() => {
    if (req.body.like === 1){
      // if (sauce.usersLiked.includes(req.body.userId)) {
      //   console.log(req.body.userId);
      // }
        console.log(req.params.id);
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $addToSet: { usersLiked: req.body.userId }})
          .then(() => {
            res.status(201).json({ message: 'like enregistré !' });
            console.log('like enregistré !');
          })
          .catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
      }
    
    if (req.body.like === -1) {
      console.log('ok disliked');
      Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $addToSet: { usersDisliked: req.body.userId }})
      .then(() => res.status(201).json({ message: 'dislike enregistré !' }))
      .catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
    }
    if (req.body.like === 0) {
      console.log('0');
    }
  })
  .catch(error => res.status(400).json({ error: 'Erreur' }));
}



// exports.likeSauce = (req, res, next) => {
//   if(req.body.like == 1) {
//     Sauce.updateOne({ _id: req.params.id }, {
//       $inc: { likes: 1 },
//       $push: { usersLiked: req.body.userId },
//       _id: req.params.id
//     })
//     .then(() => res.status(200).json({ message: 'Objet liké !'}))
//     .catch(error => res.status(400).json({ error }));
//   } else if(req.body.like == -1) {
//     Sauce.updateOne({ _id: req.params.id }, {
//       $inc: { dislikes: 1 },
//       $push: { usersDisliked: req.body.userId },
//       _id: req.params.id
//     })
//     .then(() => res.status(200).json({ message: 'Objet disliké !'}))
//     .catch(error => res.status(400).json({ error }));
//   } else if(req.body.like == 0) {
    
//   }
// }

