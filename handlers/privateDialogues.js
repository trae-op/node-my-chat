
'use strict';

const mongoose = require('mongoose');
const PrivateDialogues = require('../models/privateDialogues');
const mongoConnection = require('../lib/mongoConnections');
const privateDialogues = new PrivateDialogues(mongoose, mongoConnection.getConnectionApp());


module.exports = {
  getPrivateDialogues: (request, h) => {
    return privateDialogues.list()
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  getPrivateDialogById: (request, h) => {
    let id = request.params.privateDialog_id;
    return privateDialogues.getById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  addPrivateDialog: (request, h) => {
    let body = request.payload;
    return privateDialogues.add(body)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  deletePrivateDialogById: (request, h) => {
    let id = request.params.privateDialog_id;
    return privateDialogues.deleteById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  }
};