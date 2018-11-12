
'use strict';

const mongoose = require('mongoose');
const PrivateMessages = require('../models/privateMessages');
const mongoConnection = require('../lib/mongoConnections');
const privateMessages = new PrivateMessages(mongoose, mongoConnection.getConnectionApp());

module.exports = {
  getPrivateMessages: (request, h) => {
    return privateMessages.list()
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  getPrivateMessageById: (request, h) => {
    let id = request.params.privateMessage_id;
    return privateMessages.getById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  addPrivateMessage: (request, h) => {
    let body = request.payload;
    return privateMessages.add(body)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  updatePrivateMessage: (request, h) => {
    let body = request.payload;
    return privateMessages.update(body)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  deletePrivateMessageById: (request, h) => {
    let id = request.params.privateMessage_id;
    return privateMessages.deleteById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  }
};