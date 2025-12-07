var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { title: 'My Simple TODO', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

// create task into the list
router.post('/create', function (req, res, next) {
    const { task } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

// delete the task from the list
router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});


// change the status of the task (ex: change Not Completed to Completed. Vice versa.)
router.post('/changeStatus', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('UPDATE todos SET completed = NOT completed WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error changing status todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo changing status successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error changing status todo:', error);
        res.status(500).send('Error changing status todo:');
    }
});

/* change/update the description of the task based on the textbox
   ex: if user click "Change Task" button without changing the text of the task,
       won't effect the current description of the task.*/
router.post('/changeTask', function (req, res, next) {
    const { id, task } = req.body;
    try {
      req.db.query('UPDATE todos SET task = ? WHERE id = ?;', [task, id], (err, results) => {
        if (err) {
          console.error('Error changing status todo:', err);
          return res.status(500).send('Error changing tasks todo');
        }
        console.log('Todo changing status successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error changing status todo:', error);
        res.status(500).send('Error changing status todo:');
    }
});

module.exports = router;