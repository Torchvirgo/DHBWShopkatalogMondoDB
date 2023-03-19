const db = require("../models");
const Shopkatalog = db.shopkatalog;

// Erstellen Shopeintrag
exports.create = (req, res) => {
    // Gültige Anfrage?
    if (!req.body.title) {
      res.status(400).send({ message: "Inhalt kann nicht leer sein" });
      return;
    }
   
    // Erstellen Element mit Werten
    const shopkatalog = new Shopkatalog({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      preis: req.body.preis,
      endDate: req.body.endDate,
      type: req.body.type,

      //Spezialisierte Werte Schuhe
      bootsize: req.body.bootsize,
      kindBoot: req.body.kindBoot,

      //Spezialisiert Werte Hut
      kindHat: req.body.kindHat,

      //Spezialisierte Werte Hose
      kindPants:req.body.kindPants,
      pantsize:req.body.pantsize,
    });
  
    // Save Tutorial in the database
    shopkatalog
      .save(shopkatalog)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Fehler bei der Erstellung des Elements."
        });
      });
  };

  //Erstelle mehrere Elemente
exports.createMany=(req,res) =>
{
  let arraygrosse= req.body.anfangswert.length;
  let shopkata;
  for(let i=0;i<arraygrosse;i++ )
    {//Loopen für Ausgabe bis letze Element erreicht
   
    // Erstellen Element mit Werten muss ne Ebene tiefer rein da nun in Array verpackt und diese durchgehen
    const shopkatalog = new Shopkatalog({
      title: req.body.anfangswert[i].title,
      description: req.body.anfangswert[i].description,
      published: req.body.anfangswert[i].published ? req.body.anfangswert.published : false,
      preis: req.body.anfangswert[i].preis,
      endDate: req.body.anfangswert[i].endDate,
      type: req.body.anfangswert[i].type,

      //Spezialisierte Werte Schuhe
      bootsize: req.body.anfangswert[i].bootsize,
      kindBoot: req.body.anfangswert[i].kindBoot,

      //Spezialisiert Werte Hut
      kindHat: req.body.anfangswert[i].kindHat,

      //Spezialisierte Werte Hose
      kindPants:req.body.anfangswert[i].kindPants,
      pantsize:req.body.anfangswert[i].pantsize,
    });
   if(i<arraygrosse-1) //Wenn noch nicht letzte Element erreicht Alles speichern um auszugeben
   {
    shopkatalog.save(shopkatalog) //Einspeichern jeden Arrays
    shopkata= shopkatalog;
   }
    if(i == arraygrosse-1 ) //Letze Element erreicht alles zusammen ausgeben
    {
      shopkatalog.save(shopkatalog)
      .then(data => {
        res.send(data);
      })
      .catch(err => { //Error Catch
        res.status(500).send({
          message:
            err.message || "Fehler bei der Erstellung des Elements."
        });
      });
    }
  
  
  
  }

/* //Test andere Weise mehrere Ausgeben
  Shopkatalog('shopkatalog').insertMany(req.body.anfangswert, function(err, restaurants){
    if(err) console.log(err);
    else console.log("restaurants Added Successfully");
}); */
    // Save Tutorial in the database


}

// Alle Einträge ausgeben
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Shopkatalog.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Fehler beim abrufen des Elements."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Shopkatalog.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Kein Element mit Wert id= " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Fehler bei abrufen des Elemen mit id= " + id });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Änderung kann nicht leer sein!"
      });
    }
  
    const id = req.params.id;
  
    Shopkatalog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Element des Shopkatalog mit id=${id} konnte nicht geändert werden. Element nicht gefunden`
          });
        } else res.send({ message: "Element erfolgreich erstellt" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Fehler beim updaten der id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Shopkatalog.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Kann Element mit id=${id} nicht löschen. Element gibt es nicht?`
          });
        } else {
          res.send({
            message: "Element gelöscht"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Konnte Element =" + id + " nicht erfolgreich löcshen "
        });
      });
  };

// Delete all Tutorials from the database.
 exports.deleteAll = (req, res) => {
  Shopkatalog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Elemente erfolgreich gelöscht!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Fehler entfernen."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Shopkatalog.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Fehler Filtern."
        });
      });
  };

  //Ausgabe alle mit gleichen Preis / höheren Preis
  exports.findAllPreis = (req, res) =>{
    const preis = req.params.wert;
    //({preis: {$gte:200} }) Größer Gleiche FIltern
  
    Shopkatalog.find({preis: {$gte:preis} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Fehler beim abrufen des Elements."
      });
    });
};

