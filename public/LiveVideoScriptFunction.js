function iframeVisibility(){
    let video= document.getElementById("iframe")
    let a= document.getElementById("videoButton")
    if(video.style.display == "none" ){
        video.style.display = "block"
        a.innerText= "Nascondi video"
    }
    else{
        video.style.display = "none"
        a.innerText= "Mostra video"
    }
}

function LiveVideoMenagerError(){
    let iframe= document.getElementById("iframe")
    let url= window.location.host + "/error404"
    console.log("reindirizzo l'iframe a non trovato: all'url ",url)
    iframe.setAttribute("src",url)
}

function LiveVideoMenager(lat,lon){
    let iframe= document.getElementById("iframe")
    let url= window.location.hostname + "/error404"

    const URL = "https://api.windy.com/api/webcams/v2/list/nearby="+lat+","+lon+",5/orderby=popularity,desc/limit=20?show=webcams:player,image&lang=it&key=UhJKmIPKWbD93516TJyvwM44A0u1zzm8"
    fetch(URL)
    .then(res => res.json())
    .then(data =>{
    if(data.status=="OK"){
        let trovato= false
        //cerco video live
        for(let i=0;i<data.result.total;i++){
        if(data.result.webcams[i].status=="active"){
            trovato= true;
            if(data.result.webcams[i].player.live.available==true){
            url= data.result.webcams[i].player.live.embed
            break;
            }
            else if(data.result.webcams[i].player.day.available==true){
            url= data.result.webcams[i].player.day.embed
            break;
            }
            else
            trovato= false
        }
        }
        if(trovato==false){
        //cerco immagine live
        for(let i=0;i<data.result.total;i++){
            if(data.result.webcams[i].status=="active"){
            trovato= true;
            if("current" in data.result.webcams[i].image){
                url= data.result.webcams[i].image.current.preview
                break;
            }
                trovato= false
            }
        }
        if (trovato==false)
            throw "windly.com non ha immagini/video live per questa località"
        }
        iframe.setAttribute("src",url)
    }
    else
        throw "cattiva risposta windly.com"
    })
    .catch((error) => {
        onsole.log({"satatus":"WbcamLiveAndataMale","risposta":error})
        iframe.setAttribute("src",url)
    });
}