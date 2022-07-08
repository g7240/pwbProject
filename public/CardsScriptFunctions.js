function swap_card(n,m){
    let V=["name","url","goto"]
    for(let i=0;i<=2;i++){
        let tmp= localStorage.getItem(V[i]+n)
        localStorage.setItem(V[i]+n,localStorage.getItem(V[i]+m))
        localStorage.setItem(V[i]+m,tmp)
    }
}

function CardsMenager(urls,title){
    let i
    if(localStorage.hasOwnProperty('url0')==false){
        localStorage.setItem("name1","PARIGI")
        localStorage.setItem("url1","https://www.turistafaidate.it/wp-content/uploads/2016/10/Parigi-696x462.jpg")
        localStorage.setItem("goto1","search?city=Parigi&country=FR")

        localStorage.setItem("name2","LONDRA")
        localStorage.setItem("url2","https://www.viaggilondra.it/wp-content/uploads/2016/04/meteo-londra.jpg")
        localStorage.setItem("goto2","search?city=London&country=UK")

        localStorage.setItem("name3","TOKIO")
        localStorage.setItem("url3","https://media-assets.vanityfair.it/photos/614d9c858292c15b12d9d1ad/3:2/w_1200,h_800,c_limit/P10.jpeg")
        localStorage.setItem("goto3","search?city=Tokyo&country=JP")
    }
    else{
        let bool= true
        
        console.log({"titolo":title})
        if (localStorage.getItem("name0")==title)
            bool= false
        else if (localStorage.getItem("name1")==title){
            bool= false
            swap_card(1,0)
        }
        else if (localStorage.getItem("name2")==title){
            bool= false
            swap_card(2,1)
            swap_card(1,0)
        }
        
        if(bool==true)
            for(i=3;i>=1;i--){
                localStorage.setItem("name"+i,localStorage.getItem("name"+(i-1)))
                localStorage.setItem("url"+i,localStorage.getItem("url"+(i-1)))
                localStorage.setItem("goto"+i,localStorage.getItem("goto"+(i-1)))
            }
    }
    localStorage.setItem("name0",title)
    localStorage.setItem("url0",urls[0])
    localStorage.setItem("goto0",window.location.href)
    //"img_1",      "h2_name1",      "a_url1"
    for(i=1;i<=3;i++){
        let img= document.getElementById("img_"+i)
        img.setAttribute('src',localStorage.getItem("url"+i))
        let h2= document.getElementById("h2_name"+i)
        h2.innerText= localStorage.getItem("name"+i)
        let link= document.getElementById("a_url"+i)
        link.setAttribute("href",localStorage.getItem("goto"+i))
    }
}