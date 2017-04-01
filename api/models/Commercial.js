/**
 * Commercial.js
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
    matricule:{
      type: 'string',
      required: false
    },
    telephone:{
      type:"string",
      required: true
    },
    getFullNom: function (){
      return this.prenoms + ' ' + this.nom.toUpperCase();
    },
    commandes:{
      collection: 'Commande',
      via:'commercial'
    }
  }

};

