
const _ = require('lodash');

var mongoose = require('mongoose');
var mongoConnection = require('../lib/mongoConnections');

// var Model = require('../models/privateDialogues');
// var collection = new Model(mongooses, mongoConnection.getConnectionApp());

var Model = require('../models/notifications');
var collection = new Model(mongoose, mongoConnection.getConnectionApp());

exports.up = function(next) {



      collection.model.find({}, (err, doc) => {
        if (err) {
          console.error(error);
        } else {



                  collection
                      .model
                      .insertMany([
                        { interlocutor: { name: 'trae', email: 'traeopwork@gmail.com' },
                          sender: { name: 'tanos', email: 'tanos@gmail.com' },
                          created_at: '12.11.2018 12:50' },

                        { interlocutor: { name: 'trae', email: 'traeopwork@gmail.com' },
                          sender: { name: 'odin', email: 'odin@gmail.com' },
                          created_at: '12.11.2018 11:30' } 
                  ], function(err) {
                        if (err) {
                          console.log('error insert');
                          return;
                        }
                      });





        next();

        }
      });
};

exports.down = function(next) {

  collection.model.find({}, (err, doc) => {
    if (err) {
      console.error(error);
    } else {

          collection
            .model
            .remove({}, function(){
              console.log('removed');
            });

        next();
    }
  });
    // collection
    //     .model
    //     .update(
    //         {},
    //         {
    //             //$unset: { creator_email: '' }
    //             $set: { created_at: '21.05.2018 18:33' }
    //         },
    //         {
    //             multi: true,
    //             strict: false
    //         },
    //         function (error, numberAffected, raw) {
    //             if (error) {
    //                 console.error(error);
    //             }
    //             console.log('The number of updated documents was %d', numberAffected);
    //             console.log('The raw response from Mongo was ', raw);
    //             next();
    //         }
    //     );
};