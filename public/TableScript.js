/* Qui creodinamicamente in base al giorno i bottoni selettori di tabella per scegliere il giorno di meteo */
let data = new Date();
let dizGiorni=["Lun","Mar",'Mer','Gio','Ven','Sab','Dom']
for(let i=1;i<5;i++)
    document.getElementById("labelDay"+i).innerText= dizGiorni[(data.getDay()-1+i)%7]+' '+(data.getDate()+i)

/* Seleziono città e paese di cui disporre il meteo */
//let cit= document.title.split(' ')[1]
//let coun= document.title.split(' ')[2]

/* Qui riempio le tabelle vuote con righe contenenti i dati del medeo ottenuti tramite API */
//let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=45.4642&lon=9.18998&appid=8a61bf56d4672adf8cb76531ec758bb7&lang=it';
function TableMenager(cit,coun){
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q='+cit+','+coun+'&appid=c7b2c14e753d0c6435376c7d0e35a0e4&lang=it&units=metric';
    fetch(url)
    .then(res => res.json())
    .then(o =>{
        if(o.cod=="200"){
            console.log({"ricerca":'https://api.openweathermap.org/data/2.5/forecast?q='+cit+','+coun})
            let i, j, tmp, data
            console.log(o)
            let count= 0
            for(i=0;i<o.cnt;i++){
                data= o.list[i].dt_txt.split(' ')[0]
                while(i<o.cnt && (data==o.list[i].dt_txt.split(' ')[0] || o.list[i].dt_txt.split(' ')[1]=="00:00:00")){
                    let td0= document.createElement("th")
                    td0.textContent = o.list[i].dt_txt.split(' ')[1].split(':')[0]
                    td0.setAttribute("scope", "row")
                    let td1= document.createElement("td")
                    let img= document.createElement("img")
                    img.className= "ring" //"img-fluid" 
                    img.setAttribute('src',"http://openweathermap.org/img/wn/"+o.list[i].weather[0].icon+"@2x.png")
                    img.alt= "icona "+o.list[i].weather[0].main+" id "+o.list[i].weather[0].id
                    td1.appendChild(img)
                    let td2= document.createElement("td")
                    td2.textContent = o.list[i].weather[0].description
                    let td3= document.createElement("td")
                    td3.textContent = o.list[i].main.temp.toFixed('1')
                    let td4= document.createElement("td")
                    td4.textContent = o.list[i].clouds.all.toFixed('0')+'%'
                    let td5= document.createElement("td")
                    td5.textContent = (o.list[i].pop*100).toFixed('0')+'%'
                    let td6= document.createElement("td")
                    if(o.list[i].hasOwnProperty("rain"))
                        td6.textContent= o.list[i].rain["3h"]
                    else
                        td6.textContent= "assenti"
                    
                    let td7= document.createElement("td")
                    td7.textContent = (o.list[i].visibility/1000).toFixed('1')
                    let td8= document.createElement("td")
                    td8.textContent = o.list[i].main.feels_like.toFixed('1')
                    let td9= document.createElement("td")
                    td9.textContent = o.list[i].wind.speed.toFixed('1')
                    let td10= document.createElement("td")
                    td10.textContent = o.list[i].wind.deg.toString()+'°'
                    let td11= document.createElement("td")
                    td11.textContent = o.list[i].wind.gust.toFixed('1')
                    let td12= document.createElement("td")
                    td12.textContent = o.list[i].main.humidity.toString()+'%'

                    let tr= document.createElement("tr")
                    tr.appendChild(td0)
                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td8)
                    tr.appendChild(td4)
                    tr.appendChild(td5)
                    tr.appendChild(td6)
                    tr.appendChild(td12)
                    tr.appendChild(td7)
                    tr.appendChild(td9)
                    tr.appendChild(td10)
                    tr.appendChild(td11)
                    //console.log({"i":i,"seleziono": "table"+count, "\ntr": tr})
                    document.getElementById("table"+count).children[2].appendChild(tr)
                    i++
                }
                count++;
                if(count>=5)
                    break
            }
        }
        else
            document.getElementById("meteoUnsuccesMessage").innerText= "Errore nel caricamento dei dati meteo. Codice errore: "+o.cod+'. Messaggio di errore: "'+o.message+'"'
    })
    .catch((err) => {
        console.log(err)
        document.getElementById("meteoUnsuccesMessage").innerText= err
    });
}




/*______________________________________________________________________________________________________________________*/
/* queste sono le due funzioni che permettono di selezzionare quale giorno (tabella) e quali dati (colonna) visualizzare*/
let currentShowingTable= 0
function showTable(n){
    currentShowingTable= n
    //console.log("show",n)
    let tabF= document.getElementById("table"+n)
    tabF.style.display= "block"

    let tabG= document.getElementById("table"+((n+1)%5))
    tabG.style.display= "none"

    let tabH= document.getElementById("table"+((n+2)%5))
    tabH.style.display= "none"   
    
    let tabI= document.getElementById("table"+((n+3)%5))
    tabI.style.display= "none"   
    
    let tabJ= document.getElementById("table"+((n+4)%5))
    tabJ.style.display= "none"   
    
}

function ColumnVisibility(colName){
    //let col= document.querySelectorAll("#table"+currentShowingTable+" > col."+colName)
    for(let i=0;i<5;i++){
        let col= document.getElementById("table"+((currentShowingTable+i)%5)).querySelector("."+colName)
        //console.log("seleziono e modifico #table"+((currentShowingTable+i)%5)+" > col."+colName,col)
        //console.log("a inizio chiamata era ",col.style.visibility)
        if(col.style.visibility=="collapse")
            col.style.visibility= "visible"
        else if(col.style.visibility=="visible")
            col.style.visibility= "collapse"    
        else if(col.className=="precipitazioni" || col.className=="visibil" || col.className=="vento" || col.className=="direzione" || col.className=="raffiche")
            col.style.visibility= "visible"
        else
            col.style.visibility= "collapse"   
        //console.log("ora è ",col.style.visibility)
    }
}

