const express = require('express')
const bachecaRouter = require("./routers/bacheca")
console.log(bachecaRouter)
const app = express()
const port = 3000
const checkTimeMiddleware = require("./middlewares/checkTime")
const errorHandlerMiddleware = require("./middlewares/serverError")
const notFoundMiddleware = require("./middlewares/notFound")


//Middleware per uso globale - ordine in cui dichiariamo app.use è importante
app.use(checkTimeMiddleware);
//con il primo argomento specifico per quali rotte oglio che venga usato
//app.use("/bacheca", checkTimeMiddleware); 



//per immagini e dati statici
app.use(express.static("./public"));

//abilitiamo il request body, utile per dati form o dati più complessi
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req.query); //per vedere le query presenti nell'url 
    res.type("html").send('<h1>Server del mio blog</h1>');
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

app.use("/bacheca", bachecaRouter); //prendi le funzioni nel file bacheca e dagli delle rotte comuni con inizio /bacheca (in modo da non ripeterlo sempre)

//middleware per gli errori (lo metto in fondo)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

