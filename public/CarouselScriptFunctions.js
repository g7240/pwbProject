function CarouselMenager(urls,city){
    let i
    //console.log(urls)
    //carosello= document.getElementsByClassName("carousel-inner")
    let carosello= document.getElementById("carousel-inner")
    let carosIndicator= document.getElementById("carousel-indicators")
    //console.log("numero url= ",urls.length)
    for(i=0;i<urls.length;i++){
        let button= document.createElement("button")
        let item= document.createElement("div")
        let img= document.createElement("img")
        img.className = "cover"
        img.src= urls[i]

        button.type="button";
        button.setAttribute("data-bs-target", "#myCarousel");
        button.setAttribute("data-bs-slide-to",String(i));
        if(i==0){
            //button.class="active";
            button.setAttribute("class","active");
            button.setAttribute("aria-current","true");
            item.className = "carousel-item active";
        }
        else{
            item.className = "carousel-item";
        }
        button.setAttribute("aria-label", "Slide "+String(i+1))
        //console.log(button)
        //console.log(img)
        carosIndicator.appendChild(button)
        item.appendChild(img)
        if(i==0){
            let primoDiv= document.createElement("div")
            primoDiv.className= "container"
            let secondoDiv= document.createElement("div")
            secondoDiv.className= "carousel-caption text-start"
            let h1= document.createElement("h1")
            h1.innerText= ("Meteo "+city).toUpperCase()
            h1.style.backgroundColor= "rgba(0, 0, 0, 0.35)"
            h1.style.display= "table"
            let primoP= document.createElement("p")
            primoP.innerText= "Il meteo di oggi e dei prossimi giorni"
            primoP.style.backgroundColor= "rgba(0, 0, 0, 0.35)"
            primoP.style.display= "table"
            let secondoP= document.createElement("p")
            let a= document.createElement("a")
            a.className= "btn btn-lg btn-primary"
            a.href= '#'
            a.innerText= "Sign up today"

            secondoP.appendChild(a)
            secondoDiv.appendChild(h1)
            secondoDiv.appendChild(primoP)
            secondoDiv.appendChild(secondoP)
            primoDiv.appendChild(secondoDiv)
            item.appendChild(primoDiv)
        }
        carosello.appendChild(item)
    }
}