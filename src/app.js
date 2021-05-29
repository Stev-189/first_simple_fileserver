const express = require('express');
const multer = require('multer');// es un middleware
const mimeTypes = require('mime-types');
const cors = require('cors');

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback){
    // callback('', 'image.jpg');
    //regularmen se usa que los servidores alamacenan lso archivos segun su fecha de subida
    //y si ya son muchos archivos por segundos toman otros nombres
    callback('', Date.now()+ file.originalname+'.'+ mimeTypes.extension(file.mimetype));
    //con el mimetypes le dmoasla extencion al archivo
  }
});

const upload = multer({
  // dest:'uploads/'//sin storage
  storage: storage
});

app.set('port', process.env.PORT || 3001);

app.get('/hola_mundo', (req, res)=>{
  res.send("hola mundo")
})

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/views/index.html')
})
//el nombre del name d el etiqueta html del input debe ser el mimos nombre dentro de single
app.post('/files', upload.single('avatar'), (req, res)=>{
  res.send('No Problem, every Good')
})

module.exports =app;