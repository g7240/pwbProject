const express = require('express')
const path= require('path')
const GoogleImages = require('google-images');
//const { stringify } = require('querystring');
const app = express()
const port = 9000



app.use(express.static(__dirname + '/public/'))
/*app.get('/', (req, res) => {
  console.log("rispondo con index")
    res.sendFile("./index.html",{root:__dirname})
})*/

/** SERVO PAGINA CON IMMAGINI E NOME CITTA PERSONALIZZATI IN BASE ALLA QUERY */
app.set('/views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.get('/search', (req, res) => {
  console.log("rispondo con pagina creata su misura")
  let urls=[] //["https://www.fashiontimes.it/wp-content/uploads/media/2021/02/cucciolo-di-cani.jpg","https://assets.puzzlefactory.pl/puzzle/196/010/original.jpg","https://w8x8f6n3.stackpathcdn.com/wp-content/uploads/2015/09/maxresdefault5.jpg"]
  const {city,country}= req.query
  
  const client = new GoogleImages('173566bad65e72385','AIzaSyBwQt4tzdNR6l3t8cw7eVcBSozQrG9UG4M');
  if(city=="undefined" && country=="undefined"){
    urls.push("https://live.staticflickr.com/2693/4453498888_f576a9afd5_b.jpg")
    urls.push("https://upload.wikimedia.org/wikipedia/commons/4/40/Gfp-sunlight-streaming-above-the-clouds.jpg")
    urls.push("https://upload.wikimedia.org/wikipedia/commons/b/b7/Sunset_above_the_clouds.jpg")
    res.render('./index.ejs',{"city":city, "country":country, "urls_catalogue": urls.toString()})
  }
  else
    client.search(city, {imgSize: "xlarge"})
    .then(images => {// https://unsplash.com/ https://it.wikipedia.org/
      //console.log(images)
      for(let i=0;i<images.length;i++){
        if(images[i].width<2.6*images[i].height && images[i].height<images[i].width && images[i].width>800) 
          urls.push(images[i].url)
        //console.log("ho pusciato ",images[i].url)
      }
      if(urls.length<=2){
        urls.push("https://live.staticflickr.com/2693/4453498888_f576a9afd5_b.jpg")
        urls.push("https://upload.wikimedia.org/wikipedia/commons/4/40/Gfp-sunlight-streaming-above-the-clouds.jpg")
        urls.push("https://upload.wikimedia.org/wikipedia/commons/b/b7/Sunset_above_the_clouds.jpg")
      }
      console.log({"urls mandati bene":urls})
      res.render('./index.ejs',{"city":city, "country":country, "urls_catalogue": urls.toString()})
    }).catch(error => {
      urls.push("https://live.staticflickr.com/2693/4453498888_f576a9afd5_b.jpg")
      urls.push("https://upload.wikimedia.org/wikipedia/commons/4/40/Gfp-sunlight-streaming-above-the-clouds.jpg")
      urls.push("https://upload.wikimedia.org/wikipedia/commons/b/b7/Sunset_above_the_clouds.jpg")
      console.log({"errore nella ricerca delle immagini":error})
      console.log({"urls mandati non bene":urls})
      res.render('./index.ejs',{"city":city, "country":country, "urls_catalogue": urls.toString()})
    });
}) 

/** REINDIRIZZO DA INDEX A QUERY TRAMITE GEOLOCALIZZAZIONE IP */
app.set('trust proxy', true)
app.get('/', (req, res) => {
  console.log("rispondo con tracciamento dell'ip",req.ip,"e reindirizzamento ad hoc")
  var url = req.protocol + '://' + req.get('host') + req.originalUrl; //mi da l'url da dove proviene la richiesta
  const axios = require("axios");
  // API
  const URL = "http://ip-api.com/json/"+req.ip;

  // Send a GET request to the API
  axios.get(URL)
  .then((resp) => {
    //console.log({"ecco la risposta dell'API di geolocationIP":resp})
    //console.log(resp.data.countryCode, resp.data.city)
    let cc= resp.data.countryCode
    let cty= resp.data.city
    res.statusCode = 302;
    res.setHeader("Location", url+"search?city="+cty+'&country='+cc);
    //res.send({"indirizzo": url+"/search?city="+cty+'&country='+cc})
    res.end();
  })
  .catch((error) => {
    console.log(error)
    res.send({"satatus":"andataMale","risposta":error});//error.data
  });
  
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



