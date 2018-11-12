
'use strict';

const mongoose = require('mongoose');
const Notifications = require('../models/notifications');
const mongoConnection = require('../lib/mongoConnections');
const notifications = new Notifications(mongoose, mongoConnection.getConnectionApp());


module.exports = {
  getNotifications: (request, h) => {
    return notifications.list()
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  getNotificationById: (request, h) => {
    let id = request.params.notification_id;
    return notifications.getById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  addNotification: (request, h) => {
    let body = request.payload;
    return notifications.add(body)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  },
  deleteNotificationById: (request, h) => {
    let id = request.params.notification_id;
    return notifications.deleteById(id)
      .then( (doc) => {
        return doc;
      })
      .catch( (error) => {
        return error;
      });
  }
};