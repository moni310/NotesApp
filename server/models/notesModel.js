const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Note = sequelize.define('Note', {
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});


Note.sync({ 'alter': false, force: false });
module.exports = Note;
