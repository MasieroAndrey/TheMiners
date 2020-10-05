module.exports = () => {
    const controller = {};
    const serialize = require('node-serialize');
    const Interesse = require('../models/interesse')

    const interesses = require('../data/interesses')
    const eventos = require('../data/eventos')
    const usuarios = require('../data/usuarios');

     
    controller.povoarInteresse = (req, res) =>{
        povoar();
        res.status(200).json(interesses);
    }
    controller.listarInteresse = (req, res) =>{
        res.status(200).json(interesses);

    } 
   
    controller.salvarInteresse = (req, res) => {
        var interesse = new Interesse()
        var interesseobj = serialize.unserialize(interesse)
        interesseobj.IdInteresse = contador()
        interesseobj.NomeInteresse = req.body.NomeInteresse
        
        interesses.push(interesseobj)
        res.status(200).send()
    };




    controller.alterarInteresse = (req, res) => {
        const index = req.body.IdInteresse
        interesses[index-1] = req.body
        res.status(200).send()
    };
    controller.excluirInteresse = (req, res) => {
        const index = req.body.IdInteresse
        interesses.splice(index-1, 1)
        res.status(200).send()
    };

    function povoar(){

        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Hackathon"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Futebol"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Jogos"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Animes"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Filmes"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Series"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Carros"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Cozinhar"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Ler"
        interesses.push(objinteresse)
        var objinteresse = new Interesse()
        objinteresse.IdInteresse = contador()
        objinteresse.NomeInteresse = "Exercicio"
        interesses.push(objinteresse)

    }
    function contador(){
        if (interesses.length == 0) {
            return 1
        } else {
            var teste = new Interesse()
            teste = interesses[interesses.length - 1]
            return teste.IdInteresse + 1
        }
    }
    return controller;


}