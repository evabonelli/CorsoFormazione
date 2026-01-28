function checkTime(req, res, next) {
    const currentTime = new Date().toLocaleString();
    console.log(`Richiesta ricevuta alle ${currentTime}[Request] da ${req.originalUrl}`);

next();
}

module.exports = checkTime;