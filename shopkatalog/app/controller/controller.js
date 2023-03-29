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

      //Spezialisierte Werte Hemd
      kindshirt: req.body.kindshirt,
      shirtsize: req.body.shirtsize,
    });
  
    // Eintragg in der Datenbank speichern
    shopkatalog
      .save(shopkatalog)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Fehler bei der Erstellung des Shopeintrages."
        });
      });
  };

  //Erstelle mehrere Shopeinträge
exports.createMany=(req,res) =>
{
  let arraygrosse= req.body.anfangswert.length;
  let shopkata;
  for(let i=0;i<arraygrosse;i++ )
    {//Loopen für Ausgabe bis letze Element erreicht
   
    // Erstellen Element mit Werten muss ne Ebene tiefer rein da nun in Array "anfangswert" verpackt und diese durchgehen
    const shopkatalog = new Shopkatalog({
      title: req.body.anfangswert[i].title,
      description: req.body.anfangswert[i].description,
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

      //Spezialisierte Werte Hemd
      kindshirt: req.body.anfangswert[i].kindshirt,
      shirtsize: req.body.anfangswert[i].shirtsize,
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
            err.message || "Fehler bei der Erstellung der Shopeinträge."
        });
      });
    }
  
  
  
  }

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
            err.message || "Fehler beim abrufen der Shopeinträge."
        });
      });
  };

// Einen Eintrag ausgeben
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Shopkatalog.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Kein Shopeintrag mit id= " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Fehler bei abrufen des Shopeintrages mit id= " + id });
      });
  };

// Anpassen Shopeintrag über ID updaten
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
            message: `Element des Shopkatalog mit id=${id} konnte nicht geändert werden. Element wurde nicht gefunden!`
          });
        } else res.send({ message: "Element des Shopkatalog erfolgreich geändert" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Fehler beim updaten des Shopeintrages mit id=" + id
        });
      });
  };

// Entfernen eines bestimmten Shopeintrages
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Shopkatalog.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Kann Shopeintrag mit id=${id} nicht löschen. Eintrag gibt es möglicherweise nicht?`
          });
        } else {
          res.send({
            message: "Eintrag gelöscht"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Konnte Shopeintrag mit =" + id + " nicht erfolgreich löschen "
        });
      });
  };

// Löschen aller Shopeinträge in der Datenbank
 exports.deleteAll = (req, res) => {
  Shopkatalog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Einträge erfolgreich gelöscht!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Fehler beim entfernen aller Einträge."
      });
    });
};


//Ausgabe alle mit gleichen Preis / höheren Preis
exports.findAllPreis = (req, res) =>{
  const preis = req.params.wert;

  Shopkatalog.find({preis: {$gte:preis} })//Größer Gleiche preis Filtern
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Fehler beim abrufen des Eintrages."
    });
  });
};

