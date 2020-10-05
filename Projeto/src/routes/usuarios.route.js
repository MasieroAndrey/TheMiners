const usuarios = require('express').Router();

const controllerUsuario = require('../controller/controllerusuario')();


usuarios.get('/index', controllerUsuario.index)
usuarios.get('/login', controllerUsuario.login)
usuarios.get('/register', controllerUsuario.register)
usuarios.post('/register', controllerUsuario.registrar)
usuarios.post('/logar', controllerUsuario.logar)

/*implementado porem nao esta sendo utilizado */
usuarios.post('/upload', controllerUsuario.upload)




usuarios.get('/', controllerUsuario.listarUsuarios)
// usuarios.post('/', controllerUsuario.salvarUsuario)
usuarios.put('/', controllerUsuario.alterarUsuario)
usuarios.delete('/:Idusuario',controllerUsuario.excluirUsuario)


usuarios.get('/buscar/:nome', controllerUsuario.buscarUsuario)

module.exports = usuarios;