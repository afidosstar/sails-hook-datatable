/**
 * Grossiste.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports={
  attributes:{
    nom:{
      type: 'string',
      required: false
    },
    telephone:{
      type:"string",
      required: false
    },
    raisonSociale:{
      type:"text",
      required: false
    },
    adresse:{
      type:"string",
      required: false
    },
    getFullNom: function (){
      return this.prenoms + ' ' + this.nom?this.nom.toUpperCase():"";
    },
    commandes:{
      collection: 'Commande',
      via:'grossiste'
    }
  }

};

