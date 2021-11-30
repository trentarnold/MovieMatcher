const db = require('../DB');

const save = (user) => {
    db.users.push(user);
    return user;
};

const getAll = () => (db.users);

module.exports = {
  save,
  getAll
}