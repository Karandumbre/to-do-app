const Todo = require('../models/todo.model');

module.exports.getData = (req,res) => {
  const order = req.params.order === 'true' ? '1' : '-1'
  Todo.find({}).sort({ [req.params.field]: order }).exec((err, todos) => {
    if(err)
      console.log(err);
    else {
      res.json(todos);
    }
   });
};

module.exports.search = (req,res) => {
  Todo.find({ [req.body.field]: { $regex: req.body.data, $options: "i" } }, (err, todos) => {
    if(err)
      res.status(404).send('Record not found');
    else {
      res.status(200).json(todos);
    }
  });
};

module.exports.getTodoBasedOnId = (req,res) => {
  const id = req.params.id;
  Todo.findById(id, (err,todo) => {
      res.json(todo);
  });
};

module.exports.addTodo = (req,res) => {
  const todo = new Todo(req.body);
  todo.save()
      .then( todo => {
          res.status(200).json({'todo': 'Todo Created successfully'});
      })
      .catch( err => {
          res.status(400).send('Some problem occured, Please again later');
      });
};

module.exports.updateTodo = (req,res) => {
  Todo.findById(req.params.id, (err, todo) => {
      if(!todo)
          res.status(404).send('Record not found');
      else {
          todo.title = req.body.title;
          todo.description = req.body.description;
          todo.priority = req.body.priority;
          todo.isCompleted = req.body.isCompleted;
          todo.dueDate = req.body.dueDate;
          todo.save().then( todo => {
              res.json('Todo updated');
          })
          .catch( err => {
              res.status(400).send("Update not possible");
          });
      }
  });
};


module.exports.deleteTodo = (req,res) => {
  Todo.findByIdAndDelete(req.params.id).then(todo => {
    res.status(200).json({'todo': 'todo deleted successfully'});
  }).catch( err => {
    res.status(400).send('Deleting todo failed');
  });
};