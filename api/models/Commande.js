/**
 * Vente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports={
  attributes:{
    commercial:{
      model: 'Commercial'
    },
    grossiste:{
      model: 'Grossiste'
    },
    choixCasierHelpers:{
      collection: 'ChoixCasierHelpers',
      via: "commande"
    },
   heure:{
      type: "string"
   },
   date:{
    type: "string"
   },
   montantTotal:{
      type: "float",
     defaultsTo: 0
   },
   isPayed:{
      type: 'boolean'
   }
  }

};

