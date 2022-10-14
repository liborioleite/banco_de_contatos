const express = require('express');
const app = express();
app.use(express.json());

const { checkAuth } = require('./middlewares/checkAuth');

const UserController = require('./controller/userController');
const ContactController = require('./controller/contactController');
const AuthContoller = require('./controller/authController');

const noAuth = require('./routes/no_auth');
const userRouters = require('./routes/user');

//Rota com JWT para Login
app.use(noAuth);
app.use(userRouters);
// //Rotas Usuário

// app.get("/index", UserController.index);
// app.post("/store", UserController.store);
// app.get("/show/:id", UserController.show);
// app.put("/update/:id", UserController.update);
// app.delete("/destroy/:id", UserController.destroy);


// //Rotas Contatos

// app.get("/contacts", checkAuth, ContactController.index);
// app.post("/contacts", checkAuth, ContactController.store);
// app.get("/contacts/:id", checkAuth, ContactController.show);
// app.put("/contacts/:id", checkAuth, ContactController.update);
// app.delete("/contacts/:id", checkAuth, ContactController.destroy);


//Porta de Acesso
app.listen(3333);

