const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})
const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});

app.get('/info', (req, res) => {
  res.render('info.hbs');
});

app.get('/history', (req, res, next) => {
  res.render('history.hbs');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const file = req.file;

  if (author && sender && title && message && file) {
    res.render('contact', { isSent: true, name: file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
  console.log('Contact send message');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
