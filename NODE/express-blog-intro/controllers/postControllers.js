const blogPosts = require("../data/posts");

function index(req, res){
    let result = blogPosts;

    if(req.query.titolo){
        needle = req.query.titolo;
        result = blogPosts.filter(post => post.titolo.toLowerCase().includes(needle.toLowerCase()));

    }

  res.json(blogPosts);
}

function showById(req, res){
    const id = parseInt(req.params.id);
    const result = blogPosts.find(post => post.id === id);

    if(!result) {
        res.json({
            error: "NotFound",
            message: "Post non trovato"
        });
    }

    res.json(result);
}

function showByTitolo(req, res) {
  const titoloPost = req.params.titolo.toLowerCase();
  const post = blogPosts.find(item => item.titolo.toLowerCase() === titoloPost);

  if (!post) {
    return res.status(404).json({ errore: "Post non trovato" });
  }

  res.json(post);
}

function destroy(req, res){
    const id = parseInt(req.params.id);
    const result = blogPosts.find(post => post.id === id);

    if(!result) {

        res.status(404);

        res.json({
            error: "NotFound",
            message: "Post non trovato"
        });
    }

    const postIndex = blogPosts.indexOf(result)
    blogPosts.splice(postIndex, 1);

    res.status(200).json({ message: "Post eliminato con successo" })
}

//con questa funzione dovremo inviare dei dati più complessi al body della request
function store(req, res) {
  //prendo il max id e facendo +1 trovo l'id del nuovo post
  const TuttiId = blogPosts.map(post => post.id); //per gni post che trova mi restituisce il suo id
  const lastId = Math.max(...TuttiId);
  console.log("Id maggiore: ", lastId); 
  newId = lastId + 1;

  const nuovoPost = {
    id: newId,
    titolo: req.body.titolo,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    ingredienti: req.body.ingredienti,
    tags: req.body.tags
  };

  blogPosts.push(nuovoPost);

  res.status(201);
  res.json(blogPosts[blogPosts.length - 1]);
}

function update(req, res) {

  const id = parseInt(req.params.id);
  const result = blogPosts.find(post => post.id === id);

  if (!result) {
    //Il return serve ad interrompere davvero la funzione
    return res.status(404).json({
      error: "Not found",
      message: "Post non trovata"
    });
  }

  if (!req.body.titolo || !req.body.immagine || !req.body.ingredienti) {
    return res.status(400).json({
      error: "Cannot update",
      message: "Passare un oggetto intero o usare PATCH"
    });
  }

  result.titolo = req.body.titolo;
  result.contenuto = req.body.contenuto;
  result.immagine = req.body.immagine;
  result.ingredienti = req.body.ingredienti;
  result.tags = req.body.tags;
  
  res.json(result);

}

function modify(req, res) {
  const id = parseInt(req.params.id);
  const result = blogPosts.find(post => post.id === id);

  if (!result) {
		//Il return serve ad interrompere davvero la funzione
		return res.status(404).json({
			error: "Not found",
			message: "Post non trovata"
		});
	}

  if (req.body.titolo) { result.titolo = req.body.titolo; }
	if (req.body.immagine) { result.immagine = req.body.immagine; }
	if (req.body.ingredienti) { result.ingredienti = req.body.ingredienti; }
	if (req.body.contenuto) { result.contenuto = req.body.contenuto; }
  
  if (!req.body.titolo && !req.body.immagine && !req.body.ingredienti && !req.body.contenuto) {
		return res.status(400).json({
			error: "Cannot update",
			message: "Specificare proprietà valide"
		});
	}

  res.json(result);

}

module.exports = {
  index,
  showById,
  showByTitolo,
  store,
  destroy,
  modify,
  update
};