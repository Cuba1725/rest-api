const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

//capturar el body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//conexion a la base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ubznqpy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Base de datos conectada 🚀'))
  .catch(err => console.log('😞',err));
//importar rutas
const authRoutes = require('./routes/auth');
const validateToken = require('./routes/validate-token');
const dashboardRoutes = require('./routes/dashboard');

//route middleware
app.use('/api/user', authRoutes);
app.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona! 🥰'
  })
});  

app.use('/api/dashboard', validateToken, dashboardRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});