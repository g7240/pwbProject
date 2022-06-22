/* MATERIALI UTILI
(my ip and position api)
https://ip-api.com/
https://www.iplocation.net/
https://ipgeolocation.io/
https://ipregistry.co/pricing // first 100000 free access
//il modulo di express require('geoip-lite'); non è accurato
*/

const express = require('express')
const app = express()
const port = 9001


app.get('/', (req, res) => {
  const axios = require("axios");
  // API
  const URL = "https://api.iplocation.net/?ip="+req.ip;

  // Send a GET request to the API
  axios.get(URL)
  .then((resp) => {
    console.log(resp)
    res.json({"satatus":"bene","risposta":resp.data});
  })
  .catch((error) => {
    console.log(error)
    res.send({"satatus":"male","risposta":error.data});
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



