const Decimal128 = require("mongoose/lib/schema/decimal128");

module.exports = mongoose => {
    const Shopkatalog = mongoose.model(
      "Shopkatalog",
      mongoose.Schema(

        //Eintrag für Shop Item Standard
        {
          title: String,
          description: String,
          //picture: File,
          preis: Decimal128,
          endDate: Date,
          type: String,

          //Spezialisierte Attribute Schuhe
          bootsize: Decimal128,
          kindBoot: String,

          //Spezialisierte Attribute Hüte
          kindHat: String,
          
          //Spezialisierte Attribute Hose
          kindPants: String,
          pantsize: String,

          //Spezialisierte Attribute Hemd
          kindShirt: String,
          shirtsize: String,

          
        },
        
        { timestamps: true }
      )
    );
  
    return Shopkatalog;
  };