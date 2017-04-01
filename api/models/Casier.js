/**
 * Casier.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    libelle: {
      type: 'string',
      required: false
    },
    prixUnitairePetit: {
      type: 'float',
      required: false
    },
    prixUnitaireGrand: {
      type: 'float',
      required: false
    },

    prixCasierPetit: {
      type: "float",
      required: false
    },
    prixCasierGrand: {
      type: "float",
      required: false
    },
    qtePetit: {
      type: 'integer',
      required: false
    },
    qteGrand: {
      type: 'integer',
      required: false
    },
    cc: {
      type: 'integer',
      required: false
    },
    imageId : {
      type: 'string',
      required: false
    },
    categorie : {
      type: 'integer',
      required:false
    },
    imageUrl : {
      type: 'string',
      required:false
    },
    ChoixCasierHelpers: {
      collection: 'ChoixCasierHelpers',
      via: 'casierChoisis'
    }
  },
  SMALL_TRASH: 0,
  BIG_TRASH: 1
};

