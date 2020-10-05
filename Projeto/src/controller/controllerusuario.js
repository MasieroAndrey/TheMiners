const { NOMEM } = require('dns');
const bcrypt = require('bcrypt')



module.exports = () => {
    const controller = {};
    const serialize = require('node-serialize');
    const Usuario = require('../models/usuario')

    const interesses = require('../data/interesses')
    const eventos = require('../data/eventos')
    const usuarios = require('../data/usuarios');



    controller.listarUsuarios = (req, res) => res.status(200).json(usuarios);
    
    controller.index = (req, res) => {  
        res.render('index.ejs',{name : '#'})
    }
    controller.login = (req, res) => {  
        res.render('login.ejs')
    }
    controller.register = (req, res) => {
        res.render('register.ejs')

    }

    
    controller.registrar = async (req, res) => {

        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            var user = new Usuario()
            var userobj = serialize.unserialize(user)
            var bolinho = [req.body.Hackathon,
            req.body.Futebol,
            req.body.Jogos,
            req.body.Animes,
            req.body.Filmes,
            req.body.Series,
            req.body.Carros,
            req.body.Cozinhar,
            req.body.Ler,
            req.body.Exercicio,
            ]

            userobj.Idusuario = contador(),
            userobj.Nome = req.body.name,
            userobj.DataNascimento = req.body.DataNascimento,
            userobj.Sexo = req.body.Sexo,
            userobj.Cpf = req.body.Cpf,
            userobj.Descricao = req.body.Descricao,
            userobj.Email = req.body.email,
            userobj.Senha = hashedPassword,
            userobj.ListaInteresse = selecionaInteresse(bolinho),
            usuarios.push(userobj)
            
            
        }catch{
            console.log("erroo")
        }
        res.render('index.ejs',{name : userobj.Nome})
    }



    controller.logar = async (req, res) => {
        
        const user = usuarios.find(user => user.email = req.body.email)
        if(user == null){
            res.status(400).send('Usuario não encontrado')
        }
        try {
            if(await bcrypt.compare(req.body.password, user.Senha)){
                res.render('index.ejs',{name : user.Nome})
            }else{
                res.render('login.ejs')
            }
        } catch {
            res.status(500).send()
        }    
        
    }

    function selecionaInteresse(bolinho) {
        var retornoInteresse = []
        for (let index = 0; index < bolinho.length; index++) {
            if (bolinho[index] == interesses[index].NomeInteresse) {
                retornoInteresse.push(interesses[index])
            }

        }
        return retornoInteresse
    }









    controller.alterarUsuario = (req, res) => {
        const index = req.body.Idusuario
        usuarios[index - 1] = req.body
        res.status(200).send()
    };
    controller.excluirUsuario = (req, res) => {
        const index = req.params.Idusuario
        usuarios.splice(index - 1, 1)
        res.status(200).send()
    };


    //metodo selecionar 2 randons


    controller.buscarUsuario = (req, res) => {
        const { cpf } = req.params

        res.status(200).json(usuarios.filter((usuario) => {
            return usuario.cpf === cpf;
        }))
    }

    controller.validarUsuario = (req, res, next) => {
        if (true) {
            res.status(400).send()
        }
        return next();
    }

    controller.upload = (req, res, next) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const { type, name, path, size } = files.arquivo

            console.log("tamanho: "+size)

            if (size > 111110000) {
                const error = new Error();
                error.message = "tamanho do arquivo inválido";
                error.httpStatusCode = 400;
                error.code = 'ERR001';
                return next(error)
            }

            if (type.indexOf("image/png") != -1) {                
                fsextra.move(files.arquivo.path, './src/storage/' + files.arquivo.name, function (error) {
                    if (error) {                        
                        //error.httpStatusCode = 400;
                        //return next(error)
                        console.log(error)
                    }                    
                })
                res.write('File uploaded');
                res.end();
            } else {
                const error = new Error()
                error.message = "tipo do arquivo inválido"
                error.httpStatusCode = 400;
                error.code = 'ERR002';
                return next(error)
            }
        });

        //res.status(200).send()
    };




    function contador() {
        if (usuarios.length == 0) {
            return 1
        } else {
            var teste = new Usuario()
            teste = usuarios[usuarios.length - 1]
            return teste.Idusuario + 1
        }


    }


    return controller;
}