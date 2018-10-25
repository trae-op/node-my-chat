

'use strict';

const _ = require('lodash');
const config = require('config');
const Boom = require('boom');

const main = require('../lib/main');

class Messages {

  constructor(mongoose, connection) {
    this.Schema = mongoose.Schema;

    this.TranslationsSchema = new this.Schema({
      ava: String,
      name: String,
      message: String,
      creator_email: String,
      created_at: String
    });

    this.model = connection.model('messages', this.TranslationsSchema);
  }



  list () {
    return new Promise( (resolve, reject) => {
      this.model.find({}, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.messagesByUser.errors.list')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  getById (id) {
    return new Promise( (resolve, reject) => {
      this.model.findById(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.messagesByUser.errors.get_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  deleteById (id) {
    return new Promise( (resolve, reject) => {
      this.model.findByIdAndRemove(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.messagesByUser.errors.delete_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  add (body) {
    let newData = new this.model(body);
    return new Promise( (resolve, reject) => {
      newData.created_at = main.currentTime();

      let { message } = newData;

      if (!main.fieldsValidMessages({message})) {
        reject(Boom.badRequest(config.get('messages.fields_valid_messagesByUser')));
        return;
      }

      newData.save( (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.messagesByUser.errors.add')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  update (body) {
    let id = body._id;
    return new Promise( (resolve, reject) => {
      this.getById(id)
        .then( docFind => {

          docFind.message = body.message;
          docFind.created_at = main.currentTime();

          let { message } = docFind;

          if (!main.fieldsValidMessages({ message })) {
            reject(Boom.badRequest(config.get('messages.fields_valid_messagesByUser')));
            return;
          }

          docFind.save( (err, docUpdate) => {
            if (err) {
              reject(Boom.badRequest(config.get('messages.messagesByUser.errors.update')));
            } else {
              resolve(docUpdate);
            }
          });

        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

}

module.exports = Messages;
