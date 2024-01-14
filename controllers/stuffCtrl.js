const Stuff = require('../models/stuffModel.js');

exports.createStuff = (req, res, next) => {
  const stuff = new Stuff({
    titre : req.body.titre,
    sousTitre : req.body.sousTitre,
    description : req.body.description,
    prix : req.body.prix,
    difficulte : req.body.difficulte,
  });
  stuff.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error : error
      });
    }
  );
}

exports.getAllStuff = (req, res, next) => {
  Stuff.find().then(
    (stuffs) => {
      res.status(200).json(stuffs);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error : error
      });
    }
  );

}

exports.getOneStuff = (req, res, next) => {
  Stuff.findOne({
    _id : req.params.id
  }).then(
    (stuff) => {
      res.status(200).json(stuff);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error : error
      });
    }
  );

}

exports.modifyStuff = (req, res, next) => {
  const stuff = new Stuff({
    _id : req.params.id,
    titre : req.body.titre,
    sousTitre : req.body.sousTitre,
    description : req.body.description,
    prix : req.body.prix,
    difficulte : req.body.difficulte,
  });
  Stuff.updateOne({_id : req.params.id}, stuff).then(
    () => {
      res.status(201).json({
        message : 'Updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error : error
      });
    }
  );

}

exports.deleteStuff = (req, res, next) => {
  Stuff.deleteOne({
    _id : req.params.id
  }).then(
    () => {
      res.status(200).json({
        message : 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error : error
      });
    }
  );
  }


/* exports.createGame = (req, res, next) => {
  
    const generatedCode = generateUniqueCode();
    
    const game = new Game({
      code: generatedCode,
      status: 'wait',
      hostId: req.body.hostId,
    });
    //game.listPlayer.push({userId:req.body.hostId, surname: req.body.surname});
    game.save().then(
      (savedGame) => {
        res.json({ success: true, code: savedGame.code });
        
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  //Initialisation de la connexion socket
  //socket.join(code)
  //io.to(code).emit("sendListPlayer", listPlayer);
  exports.getPlayers = (req, res, next) => {
  Game.findOne({
    code: req.params.code
  }).then(
    (game) => {
      res.json({ success: true, listPlayer: game.listPlayer });
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.addPlayer = (req, res, next) => {

  if (!req.params.code || !req.body.userId) {
    return res.status(400).json({
      error: 'Code and userId are required in the request.',
    });
  }

  Game.findOne({
    code: req.params.code
  })
    .then((game) => {
      console.log(game);
      if (!game) {
        console.log('Pas de game')
;        return res.status(404).json({
          error: 'Game not found.',
        });
      }
      // vérifier que le surnom n'est pas déjà utilisé
      console.log('test', game.listPlayer.find(player => player.surname === req.body.surname));
      if(game.listPlayer.find(player => player.surname === req.body.surname)){
        return res.status(400).json({
          error: 'This nickname is already used.',
        });
      }

      const newPlayer = { userId: req.body.userId, surname: req.body.surname };
      // Ajouter le joueur à la liste
      game.listPlayer.push(newPlayer);
      // Enregistrez la mise à jour dans la base de données
       game.save().then(() => {
      
        if(game){
          io.to(game.code).emit("sendListPlayer", game.listPlayer);
          // Ne renvoie la réponse que si tout s'est bien passé
          res.json({ success: true });

        }
        
      
    })
  })
    .catch((error) => {
      console.log("Erreur");
      console.error('Error:', error);
      // Gérez l'erreur sans renvoyer une réponse réussie ici
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.removePlayer = (req, res, next) => {
  // Vérifiez si les paramètres requis sont présents dans la requête
  if (!req.params.code || !req.body.userId) {
    return res.status(400).json({
      error: 'Code and userId are required in the request.',
    });
  }

  // Recherchez le jeu par code
  Game.findOne({ code: req.params.code })
    .then((game) => {
      if (!game) {
        // Si le jeu n'est pas trouvé, renvoyez une réponse appropriée
        return res.status(404).json({
          error: 'Game not found.',
        });
      }

      // Filtrer la liste des joueurs pour supprimer celui avec le userId spécifié
      game.listPlayer = game.listPlayer.filter(player => player.userId !== req.body.userId);

      // Enregistrez la mise à jour dans la base de données
      return game.save();
    })
    .then((game) => {
      if (game) {
        // Émettez l'événement pour mettre à jour la liste des joueurs
        io.to(game.code).emit("sendListPlayer", game.listPlayer);
        // Renvoie la réponse uniquement si tout s'est bien passé
        res.json({ success: true });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Gérez l'erreur sans renvoyer une réponse réussie ici
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.startGame = (req, res, next) => {
  console.log("startGame");
  Game.findOne({ code: req.params.code })
    .then((game) => {
      if (!game) {
        // Si le jeu n'est pas trouvé, renvoyez une réponse appropriée
        return res.status(404).json({
          error: 'Game not found.',
        });
      }
      const listPlayer = game.listPlayer;
      for (let i=0 ; i<listPlayer.length-1 ; i++){
        listPlayer[i].target = listPlayer[i+1].surname;
      }
      listPlayer[listPlayer.length-1].target = listPlayer[0].surname;
      game.save().then(() => {
        if(game){
          console.log(game.listPlayer);
          io.to(game.code).emit("sendTarget", game.listPlayer);
          // Ne renvoie la réponse que si tout s'est bien passé
          res.json({ success: true });

        }
      });
    })
    .catch((error) => {
      console.log("Erreur");
      console.error('Error:', error);
      // Gérez l'erreur sans renvoyer une réponse réussie ici
      res.status(500).json({
        error: error.message,
      });
    });

} */
