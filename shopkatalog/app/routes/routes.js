module.exports = app => {
    const controller = require("../controller/controller.js");
    
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", controller.create);

    // Erstelle mehrere Elemente
    router.post("/many",controller.createMany);
  
    // Retrieve all Tutorials
    router.get("/", controller.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", controller.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", controller.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", controller.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", controller.delete);
  
    // Delete all Tutorials
    router.delete("/", controller.deleteAll);
  
    //Filtern Preis
    router.get("/preis/:wert",controller.findAllPreis);

    app.use('/api/shopkatalog', router);
  };