
const datetime = require('node-datetime');
const _ = require('lodash');
const Bcrypt = require('bcrypt');
const config = require('config');
const Boom = require('boom');
const validator = require('validator');

module.exports = {
    currentTime: () => {
        return datetime.create().format('d.m.Y H:M');
    },
    checkPassword: (password, doc) => {
      return new Promise( (resolve, reject) => {
        Bcrypt.compare(password, doc.password).then( isValid => {
              if (!isValid) {
                  reject(Boom.badRequest(config.get('messages.password')));
              } else {
                  resolve(isValid);
              }
          });
      });
    },
    fieldsValidMessages: newData => newData.message.length >= 3,
    fieldsValidNotifications: newData => (_.size(newData) + _.size(newData.user)) === 7,
    fieldsValidPrivateDialogues: newData => (_.size(newData) + _.size(newData.interlocutor) + _.size(newData.sender)) === 7,
    fieldsValidRegister: (newData) => {
      let result = 0;
      if (newData.confirm_password === newData.password && newData.name.length >= 3 && validator.isEmail(newData.email)) {
        result = result + 1;
      }
      return result;
    },
    checkRole: (newData) => {
      return (newData.email === 'traeopwork@gmail.com') ? 'Admin' : 'User';
    }
};