const express = require("express")
const filmsRouter = require("./routers/films")
console.log(filmsRouter)
const app = express()
const port = 3000

const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/serverError")

//per immagini e dati statici
app.use(express.static("./public"));

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.query); 
    res.type("html").send('<h1>Server del mio blog di film</h1>');
});

app.get("/debug", (req, res) => {
	const richiestaSemplificata = {
		query: req.query, //query params come ?chiave=valore
		params: req.params, //parametri di rotta (non ancora visti)
		body: req.body, //body richesta json/form (non ancora visti)
		headers: req.headers, //header allegati alla richiesta
		method: req.method, //metodo HTTP (GET, POST, …)
		originalUrl: req.originalUrl, //URL richiesto
		path: req.path, //path (senza query)
		protocol: req.protocol, //http / https
		ip: req.ip, //IP client
		secure: req.secure, //true se HTTPS
		xhr: req.xhr, //true se AJAX
	};

	console.log("Ricevuta richiesta: ", richiestaSemplificata);

	res.json(richiestaSemplificata);
});

app.use("/films", filmsRouter); 

//middleware errori
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});