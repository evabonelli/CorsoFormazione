//const express = require("express") no

const { error } = require("node:console");

movies = require("../data/movies")

function index (req, res){
    let result = movies;

    if(req.query.titolo){
        needle = req.query.titolo;
        result = movies.filter(film => film.titolo.toLowerCase().includes(needle.toLowerCase()));
    }

    res.json(movies);
}


function filmById (req, res){
    const id = parseInt(req.params.id);
    const result = movies.find(film => film.id === id);

    if(!result){
        res.json({
            error: "Not Found",
            message: "Film non trovato"
        });
    }

    res.json(result);
}

//aggiungi film
function addFilm (req, res){
    const tuttiId = movies.map(film => film.id);
    const lastId = Math.max(...tuttiId);
    console.log("Id maggiore: ", lastId);
    newId = lastId + 1;

    const newFIlm = {
        id: newId,
        titolo: req.body.titolo,
        regista: req.body.regista,
        anno: req.body.anno,
        durata: req.body.durata,
        genere: req.body.genere,
        locandina: req.body.locandina
    };

    movies.push(newFIlm);

    res.status(204);
    res.json(movies[movies.length - 1]);
    console.log("Film aggiunto con successo");
}

function deleteFilm (req, res){
    const id = parseInt(req.params.id);
    result = movies.find(film => film.id === id);

    if(!result){
        req.json({
            error: "NOt Found",
            message: "Film non trovato"
        });
    }

    const moviesIndex = movies.indexOf(result);
    movies.splice(moviesIndex, 1);
}

function sostituisciFilm (req, res){
    const id = parseInt(req.params.id);
    result = movies.find(film => film.id === id);

    if(!result){
        req.json({
            error: "NOt Found",
            message: "Film non trovato"
        });
    }

    if(!req.body.titolo || !req.body.regista || !req.body.anno || !req.body.durata  || !req.body.genere || !req.body.locandina){
        return res.status(404).json({
            error: "Not Found",
            message: "Non sono stati inseriti tutti i dati. Passare un oggetto intero o usare PATCH"
        });
    }

    result.titolo = req.body.titolo;
    result.regista = req.body.regista;
    result.anno = req.body.anno;
    result.durata = req.body.durata;
    result.genere = req.body.genere;
    result.locandina = req.body.locandina;

    res.json(result); 

}

function modificaFilm (req, res){
    const id = parseInt(req.params.id);
    result = movies.find(film => film.id === id);

    if(!result){
        req.json({
            error: "NOt Found",
            message: "Film non trovato"
        });
    }

    if(req.body.titolo){result.titolo = req.body.titolo;}
    if(req.body.regista){result.regista = req.body.regista;}
    if(req.body.anno){result.anno = req.body.anno;}
    if(req.body.durata){result.durata = req.body.durata;}
    if(req.body.genere){result.genere = req.body.genere;}
    if(req.body.locandina){result.locandina = req.body.locandina;}

    if (!req.body.titolo && !req.body.regista && !req.body.anno && !req.body.durata && !req.body.genere  && !req.body.locandina) {
		return res.status(400).json({
			error: "Cannot update",
			message: "Specificare proprietà valide"
		});
	}

  res.json(result);

}

module.exports = {
    index,
    filmById,
    addFilm,
    deleteFilm,
    sostituisciFilm,
    modificaFilm
}
