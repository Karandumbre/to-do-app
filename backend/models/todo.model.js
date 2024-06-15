const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date();
const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const today = `${date.getUTCFullYear()}-${month}-${day}`;

let Todo = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    priority: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
    createdAt: {
        type : String,
        default: today
    },
    dueDate: {
      type : String,
      default: today
  }
});

module.exports = mongoose.model('Todo', Todo);