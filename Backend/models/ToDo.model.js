const mongoose = require('mongoose');

const toDoShema = mongoose.Schema ({
    text: String,
    compleate: {
      type: Boolean,
      default: false,
    },
});


const ToDo = mongoose.model('ToDo', toDoShema);

module.exports = ToDo