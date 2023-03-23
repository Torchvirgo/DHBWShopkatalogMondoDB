module.exports = app => {
    const controller = require("../controller/controller.js");
    
  
    var router = require("express").Router();
  
    // Erstelle Shopeintrag
    router.post("/", controller.create);

    // Erstelle mehrere Shopeinträge
    router.post("/many",controller.createMany);
  
    // Ausgeben Shopeinträge
    router.get("/", controller.findAll);

    // Ausgabe über ID
    router.get("/:id", controller.findOne);
  
    // Ändern mit id
    router.put("/:id", controller.update);
  
    // Löschen mit id
    router.delete("/:id", controller.delete);
  
    // Löschen aller Einträge
    router.delete("/", controller.deleteAll);
  
    //Filtern Preis
    router.get("/preis/:wert",controller.findAllPreis);

    app.use('/api/shopkatalog', router);
  };