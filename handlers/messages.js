
'use strict';

const mongoose = require('mongoose');
const config = require('config');
const Messages = require('../models/messages');
const mongoConnection = require('../lib/mongoConnections');
const messages = new Messages(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getMessages: (request, h) => {
        return messages.list()
            .then( (doc) => {
              return doc;
            })
            .catch( (error) => {
              return error;
            });
    },
    getMessageById: (request, h) => {
        let id = request.params.message_id;
        return messages.getById(id)
            .then( (doc) => {
              return doc;
            })
            .catch( (error) => {
              return error;
            });
    },
    addMessage: (request, h) => {
        let body = request.payload;
        //console.log(body);
        return messages.add(body)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    updateMessage: (request, h) => {
        let body = request.payload;
        return messages.update(body)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    deleteMessageById: (request, h) => {
        let id = request.params.message_id;
        return messages.deleteById(id)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    }
};