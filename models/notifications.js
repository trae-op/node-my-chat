

'use strict';

const _ = require('lodash');
const config = require('config');
const Boom = require('boom');

const main = require('../lib/main');

class Notifications {

  constructor(mongoose, connection) {
    this.Schema = mongoose.Schema;

    this.NotificationsSchema = new this.Schema({
      type: String,
      message: String,
      user: {
        name: String,
        email: String
      },
      interlocutor_email: String,
      created_at: String
    });

    this.model = connection.model('notification', this.NotificationsSchema);
  }



  list () {
    return new Promise( (resolve, reject) => {
      this.model.find({}, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.list')));
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
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.get_by_id')));
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
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.delete_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }

  findNotification(newData) {
    return new Promise((resolve, reject) => {
      this.model.find({
        user: {
          name: newData.user.name,
          email: newData.user.email
        },
        interlocutor_email: newData.interlocutor_email
      }, (err, doc) => {

        if (err) {
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.find_by_id')));
        } else {
          if (doc.length) {
            resolve(doc[0]);
          } else {
            reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.not_exit')));
          }
        }
      });
    });
  }

  add (body) {
    let newData = new this.model(body);
    return new Promise( (resolve, reject) => {

      this.findNotification(newData)
        .then(() => {
          reject(Boom.badRequest(config.get('messages.notificationsByUser.errors.having')));
        })
        .catch(() => {
          const notificationMessage = value => newData.message = `<strong>${newData.user.name}</strong> ${value}`;

          switch(newData.type) {
            case config.get('messages.notificationsByUser.notificationType.invite.type'):
              notificationMessage(config.get('messages.notificationsByUser.notificationType.invite.message'));
              break;
            case config.get('messages.notificationsByUser.notificationType.denied.type'):
              notificationMessage(config.get('messages.notificationsByUser.notificationType.denied.message'));
              break;
            case config.get('messages.notificationsByUser.notificationType.approved.type'):
              notificationMessage(config.get('messages.notificationsByUser.notificationType.approved.message'));
              break;
            default:
              reject(Boom.badRequest(config.get('messages.notificationsByUser.notificationType.missing')));
              return;
          }

          let {
            type,
            message,
            user,
            interlocutor_email,
            created_at
          } = newData;

          if (!main.fieldsValidNotifications({
                type,
                message,
                user,
                interlocutor_email,
                created_at
              })) {
            reject(Boom.badRequest(config.get('messages.fields_valid_notifications')));
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

module.exports = Notifications;
