const express = require('express');
const app = express();
const port = 3000;


const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'adnan-drinks'; 
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  app.get('/', (req, res) => {
    db.collection('drinks')
      .find()
      .toArray((err, records) => {
        if (err) {
          console.error('Error fetching records:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.render('index', { records });
      });
  });

  app.get('/new', (req, res) => {
    res.render('new');
  });

  app.post('/new', (req, res) => {
    db.collection('drinks').insertOne(req.body, (err, result) => {
      if (err) {
        console.error('Error inserting record:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.redirect('/');
    });
  });

  app.post('/delete/:id', (req, res) => {
    const recordId = req.params.id;
    db.collection('drinks').deleteOne({ _id: recordId }, (err, result) => {
      if (err) {
        console.error('Error deleting record:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/');
    });
  });

  
});

app.listen(3000, () => {
    console.log("on 3000");
  });
