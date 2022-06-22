/* MATERIALI UTILI
(my ip and position api)
http://ip-api.com/json/IPv4address // <-- <-- <-- <--

(geolocation api free)
Top 10 Best IP Geolocation APIs (in 2022) https://rapidapi.com/blog/ip-geolocation-api/

(backend node js geolocation) // <-- <-- <-- <--
10 Best Node.js IP Geolocation API Libraries https://openbase.com/categories/js/best-nodejs-ip-geolocation-api-libraries


*/

const express = require('express')
const app = express()
const port = 9000

app.set('trust proxy', true)
app.get('/', (req, res) => {
  var geoip = require('geoip-lite');
  
  var ip = req.ip; 
  var geo = geoip.lookup(ip);

  console.log(ip,geo) 
  res.send({"ip":ip,"geo":geo});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



