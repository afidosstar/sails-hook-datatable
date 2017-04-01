/**
 * CasierCommande.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    qtePetit:{
      type: 'float',
      required: true
    },
    qteGrand:{
      type:"float"
    },
    prixVentePetit:{
      type:"float"
    },
   prixVenteGrand:{
     type:"float"
   },

    casierChoisis:{
      model: 'Casier'
    },
    commande:{
      model: "Commande"
    }
  }
};

