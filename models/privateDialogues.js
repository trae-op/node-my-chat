

'use strict';

const _ = require('lodash');
const config = require('config');
const Boom = require('boom');

const main = require('../lib/main');

class PrivateDialogues {

  constructor(mongoose, connection) {
    this.Schema = mongoose.Schema;

    this.PrivateDialoguesSchema = new this.Schema({
      users: [
        {
          name: String,
          email: String
        },
        {
          name: String,
          email: String
        }
      ],
      created_at: String
    });

    this.model = connection.model('privateDialog', this.PrivateDialoguesSchema);
  }



  list () {
    return new Promise( (resolve, reject) => {
      this.model.find({}, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.privateDialogues.errors.list')));
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
          reject(Boom.badRequest(config.get('messages.privateDialogues.errors.get_by_id')));
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
          reject(Boom.badRequest(config.get('messages.privateDialogues.errors.delete_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }

  findPrivateDialog(newData) {
    return new Promise((resolve, reject) => {
      this.model.find({users: [
          {
            name: newData.users[0].name,
            email: newData.users[0].email
          },
          {
            name: newData.users[1].name,
            email: newData.users[1].email
          }
        ]}, (err, doc) => {

        if (err) {
          reject(Boom.badRequest(config.get('messages.privateDialogues.errors.find_by_id')));
        } else {
          if (doc.length) {
            resolve(doc[0]);
          } else {
            reject(Boom.badRequest(config.get('messages.privateDialogues.errors.not_exit')));
          }
        }
      });
    });
  }

  add (body) {
    let newData = new this.model(body);
    return new Promise( (resolve, reject) => {

      this.findPrivateDialog(newData)
        .then(() => {
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.having')));
        })
        .catch(() => {
          newData.created_at = main.currentTime();

          let { users, created_at } = newData;

          if (!main.fieldsValidPrivateDialogues({ users, created_at })) {
            reject(Boom.badRequest(config.get('messages.fields_valid_private_dialogues')));
            return;
          }

          newData.save( (err, doc) => {
            if (err) {
              reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.add')));
            } else {
              resolve(doc);
            }
          });

        });

    });
  }

}

module.exports = PrivateDialogues;
