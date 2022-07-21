var whiteTeamLink= "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
var blackTeamLink= "https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-night.min.css";
var integrtyCode= "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3";


// GESTISCO LA MODALITÀ NOTTE DINAMICAMENTE E RICORDANDO LE PREFERENZE DELL'UTENTE
let visualMode= localStorage.getItem("DarkMode");
if(!visualMode){
    console.log("prendo la mod dal browser/SO");
    //non si ha la info nel local storage
    //quindi si legge la preferenza dal browser/SO
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        setDarkMode();
    else
        if (window.matchMedia('(prefers-color-scheme: light)').matches)
            setLightMode();
        else{
            setLightMode(); //avrei potuto decidere di fare altro per questo ho wscritto codice ridondante
            console.error("errore nel riconoscimento di dark/light mode del browser, uso light mode di default");
        }
}
else{
    console.log("prendo la mod dal localStorage");
    if(visualMode=='1')
        setDarkMode();
    else
        if(visualMode=='0')
            setLightMode();
        else{
            setLightMode(); //avrei potuto decidere di fare altro per questo ho wscritto codice ridondante
            alert("errore nel riconoscimento di dark/light mode del localStorage, uso light mode di default");
        }
}

function setDarkMode(){
    let toggle= document.getElementById("darkWiteSwitch");
    toggle.checked= true;

    let elemLink= document.getElementById("linkBootstrapStyle");
    elemLink.removeAttribute("integrity");
    elemLink.setAttribute("href",blackTeamLink);
    localStorage.setItem("DarkMode",1);
}
function setLightMode(){
    let toggle= document.getElementById("darkWiteSwitch");
    toggle.checked= false;

    let elemLink= document.getElementById("linkBootstrapStyle");
    elemLink.setAttribute("integrity",integrtyCode);
    elemLink.setAttribute("href",whiteTeamLink);
    localStorage.setItem("DarkMode",0);
}
function BlackWhite(){
    console.log("è chiamto BlackWhit")
    let elemLink= document.getElementById("linkBootstrapStyle");
    if( elemLink.getAttribute("href")==whiteTeamLink ){
        setDarkMode();
    }
    else{
        if( elemLink.getAttribute("href")==blackTeamLink ){
            setLightMode();
        }
        else{
            alert("errore imprevisto nel link al css, ricarica la pagina\nSe il problema si ripresenta contattare email@dom.com");
        }
    }
}