
//var done;
//var remove;
var raahattava;


//Lisätään event listenerit kuvalinkkeihin (post-it <-> tussitaulu)
var tarrakuva=document.getElementById('tarrat');
  tarrakuva.addEventListener("click",naytaTauluna,false);
  tarrakuva.addEventListener("mouseover", reunatOn, false);
  tarrakuva.addEventListener("mouseout", reunatOff, false);
var listakuva= document.getElementById('todolista');
  listakuva.addEventListener("click",naytaListana,false);
  listakuva.addEventListener("mouseover",reunatOn, false);
  listakuva.addEventListener("mouseout",reunatOff, false);

//mouseover efekti em.kuvalinkeille(korostetaan kasvattamalla ja tuomalla punainen reunus)
function reunatOn(event){
  var kuva=document.getElementById(this.id);
    kuva.style.width="80px";
    kuva.style.border="4px solid red";
}

//mouseout.. palautetaan kuva ennalleen
function reunatOff(event){
  var kuva=document.getElementById(this.id);
    kuva.style.width="60px";
    kuva.style.border="none";
}
//mouseover tussitaulu.. tuodaan napit esiin ja korostetaan kohdetta reunuksella ja taustavärillä
function hoverEfekti(event){
  console.log(this.id);
  var liElem=document.getElementById(this.id);
    liElem.childNodes[1].style.display="block";
    liElem.childNodes[2].style.display="block";
    liElem.style.border="solid 1px red";
    liElem.style.backgroundColor="white";
    liElem.style.paddingTop="15px";
}
//mouseout.. palautetaan elementti oletusasetuksiinsa
function hoverPois(event){
  var liElem=document.getElementById(this.id);
    liElem.childNodes[1].style.display="none";
    liElem.childNodes[2].style.display="none";
    liElem.style.border="none";
    liElem.style.backgroundColor="initial";
    liElem.style.paddingTop="initial";
  
}
//tarrataulunäkymä esiin.. muutetaan tekstit. viedään tussitaulu näkymättömiin ja tuodaan tarrataulu + tarrat esiin
function naytaTauluna(){
  document.getElementsByTagName('h2')[0].innerText = "Muistilaput";
  document.getElementById("uusiLappunen").style.visibility="visible";
  document.getElementById("handu").style.display= "block";
  document.getElementById("valko").style.display= "none";
  document.getElementById("ohje").innerText="Kirjoita muistiinpano ja raahaa tarralappu taululle. Voit luoda niin monta lappua kuin haluat. Lappua voi zoomata klikkaamalla sitä.";
  document.getElementById('lista').style.display='none'; 
  document.getElementById('infotaulu').style.display='block';
  var lappuset=document.getElementsByClassName("laput");
    for(var i = 0; i<lappuset.length; i++){
      lappuset[i].style.display="block";
   
    } 
}

//tussitaulunäkymä.. muutetaan vähän tekstejä. viedään for luupissa tarrat näkymättömiin, jonka jälkeen sama juttu taululle ja tuodaan tussitaulu esiin
function naytaListana(){
  var otsikko= document.getElementsByTagName('h2')[0].innerText = "Tussitaulu";
  var teksti =document.getElementById("ohje").innerText="Kirjoita muistiinpanosi allaolevaan laatikkoon.";
  document.getElementById("uusiLappunen").style.visibility="hidden";
  document.getElementById("handu").style.display= "none";
  document.getElementById("valko").style.display= "block";
  var lappuset=document.getElementsByClassName("laput");

    for(var i = 0; i<lappuset.length; i++){
      lappuset[i].style.display="none";
    } 
    document.getElementById('infotaulu').style.display='none';
    document.getElementById('lista').style.display='block';      
   
  }

//muutetaan tehtävän statusta tehdyksi yliviivaamalla teksti tai vaihtoehtoisesti palautetaan alkuperäiseen tilaansa jos käyttäjä painaa nappia uudelleen
function taskDone(event){
 
  var elem = document.getElementById(this.id.substring(2)); //tarraelementti sijoitetaan elem muuttujaan..substringin avulla saadaan id, vaikka tapahtuman triggeröisi tussitaulun nappi
  var done=elem.childNodes[1]; //tarralapun napit
  var remove=elem.childNodes[2]; 
  var toinenElem = document.getElementById("li"+ this.id.substring(2)); //tussitalun listaelementti


  if(elem.style.textDecoration=="line-through"){ //jos elementti on jo merkattu yliviivauksella tehdyksi..
    elem.style.textDecoration="none";             //merkataan takaisin tekemättömäksi
    elem.style.width="90px";                      //tarralappu on nappeja käsiteltäessä zoomattu, joten palautetaan se pieneksi & palautetaan fontti normikokokoon
    elem.style.height="90px";
    elem.style.fontSize="14px";
    done.style.display="none";                     //viedään napit piiloon
    remove.style.display="none";
    toinenElem.style.textDecoration="none";       //poistetaan yliviivaus myös tussitaulun elemetistä:
  }
  else{                                           //jos ei ole merkattu tehdyksi, niin yliviivataan..muutoin sama kuin yllä.
    elem.style.textDecoration="line-through";
    elem.style.width="90px";
    elem.style.height="90px";
    elem.style.fontSize="14px";
    done.style.display="none";
    remove.style.display="none";
    toinenElem.style.textDecoration="line-through";
    
}
 
}
//poistetaan käyttäjän poistettavaksi valitsema tehtävä
function removeTask(event){
  
  var elem = document.getElementById(this.id.substring(2));             //tarralappu
  var toinenElem = document.getElementById("li"+ this.id.substring(2)); //tussitalun elementti
      var elemParent=elem.parentElement;                                //haetaan tarralapun emoelementti
      elemParent.removeChild(elem);                                     //..ja poistetaan tarralappu, jonka jälkeen tehdään sama tussitaulun elementille
      elemParent=toinenElem.parentElement;
      elemParent.removeChild(toinenElem);

}


//zoomataan tarralappu isommaksi ja tuodaan napit esiin
function zoomaaLappu(event){
/*tämän kanssa oli satunnaisesti sellaista ongelmaa, että funktion triggeröi jompikumpi lapun lapsielementeistä(napit), joka yritti sitten sijoittaa itsensä elem muuttujaan
aiheuttaen virheen. IndexOfin avulla varmistetaan, että ainoastaan "laput" luokan elementillä on pääsy funktioon.*/

  if(this.className.indexOf("laput")!=-1){      
    elem=document.getElementById(this.id);              //lappu
    var done=elem.childNodes[1];                        //kuittausnappi
    var remove=elem.childNodes[2];                      //poistonappi
    done.addEventListener('click',taskDone, false);     //eventlistenerit napeille
    remove.addEventListener('click',removeTask, false);

    //zoomataan lappu, kasvatetaan fonttia ja tuodaan napit esiin mikäli se on klikkaushetkellä pieni. Näytetään napit
    if(elem.style.width=="90px"){
      elem.style.width="220px";
      elem.style.height="220px";
      elem.style.fontSize="22px";
      done.style.display="block";
      remove.style.display="block";  
   }
    // klikattu kun lappu zoomattuna, joten palautetaan normaalikokoonsa ja piilotetaan napit
    else{
      elem.style.width="90px";
      elem.style.height="90px";
      elem.style.fontSize="14px";
      done.style.display="none";
      remove.style.display="none";
 
    }
} //eka if loppuu täällä.. eli jos väärä elementti yrittää kutsua funktiota, niin se ei tee mitään.
} 

//Funktio kuuntelee tekstikenttää. Mikäli käyttäjä painaa enteriä, niin se tulkitaan komennoksi luoda lappu ja kutsutaan ao.funktiota.
function testaaNappi(event){
  if(event.keyCode==13){
    luoLappu();
  }
}

/*käynnistetään tarralapun raahaaminen.. Olin ensin rakentanut nämä ilman event parametria ja kaikki toimi hienosti.. Tai toimi siihen asti kunnes testasin Firefoxilla,
joka ei tehnyt yhtään mitään ja herjasi undefinedia konsolissa. Lisäilin tuon sittemmin kaikkiin funktioihin, joissa viitataan elementteihin jollain parametrilla */
function raahaaElementti(event){
  raahattava=event.target.id;   //raahattavan lappuelementin id
  var tyyli= window.getComputedStyle(event.target,null);  //metodi palauttaa kaikki kohteen tyylitiedot. 

  /*alla dataksi asetetaan elementin left ja top sijainnit josta vähennetään hiiren kursorin samaisen akselin arvo..
  Näin varmistetaan lappu asemoituu juuri siihen mihin se pudotetaan. Muussa tapauksessa elementin vasen ylänurkka (nollapiste) asemoituu siihen kohtaan
  missä kursori on kun kohde tiputetaan.. eli jos elementin sijainti left 0 ja top 0 ja pituus + korkeus 90px kuten tässä tapauksessa, ja hiirellä otetaan keskeltä, niin tiedetään
  että vasemman ylänurkan sijainnin pitää olla pudottaessa left -45, top -45 suhteessa keskipisteessä olevaan hiiren kursoriin*/
  event.dataTransfer.setData("text/plain",                
  (parseInt(tyyli.getPropertyValue("left"))- event.clientX)  + ':' + (parseInt(tyyli.getPropertyValue("top"))- event.clientY));
 
 
}
//kun raahaaminen lopetetaan..
function pudotaKohde(event){
  
  var offset = event.dataTransfer.getData("text/plain").split(':'); //splitataan elementin sijainti suhde kursoriin left & top data taulukkoon käyttäen erotinmerkkinä kaksoispistettä, joka yllä asetettu..
  var elem = document.getElementById(raahattava);                     //sijoitetaan tarraelementti muuttujaan
    elem.style.left = (event.clientX + parseInt(offset[0])) + 'px';   //elementin uusi sijainti suhteessa vasempaan reunaan = kursori + aiemmin laskettu offset 
    elem.style.top = (event.clientY + parseInt(offset[1])) + 'px';    //..ja sama suhteessa ikkunan yläreunaan..
  
    event.preventDefault(); //peruuttaa elementin "oletustoiminnon", jotta pudotus toimii.. Edge ja Chrome eivät vaatisi tätä tähän kohtaan, mutta Firefox
                            //yrittää pudottaessa avata elementtiä hyperlinkkinä, mikäli tuota ei ole määritelty
    return false;

}

function raahaaYli(event){
  event.preventDefault(); //sama kuin yllä.. Oletuksena elementtejä ei voi pudottaa. Tämä estää tuon oletuksen tapahtumisen jotta pudotus onnistuu. Kaikki kokeilemani selaimet vaativat tämän.
  return false;

}

//arvotaan post-it lapulle väri switch-case rakenteella.
function arvoVari(vari){
  
  var arvonta=Math.round(Math.random()*4);
  console.log(arvonta);
  switch(arvonta){
    case 0:
    vari="yellow";
    break;
    case 1:
    vari="#66ff33";
    break;
    case 2:
    vari="#ff9999";
    break;
    case 3:
    vari="#66ccff"
    break;
    case 4:
    vari="#ff8c1a"
    break;
  }
  return vari;
}

//arvotaan fonttiväri tussitauluun
function arvoFonttiVari(fvari){
  var fvari="";
  var arvonta=Math.round(Math.random()*3);
  console.log(arvonta);
  switch(arvonta){
    case 0:
    fvari="black";
    break;
    case 1:
    fvari="blue";
    break;
    case 2:
    fvari="red";
    break;
    case 3:
    fvari="green"
    break;
  }
  return fvari;
}
//arvotaan fontti
function arvoFontti(fontti){
  var fvari="";
  var arvonta=Math.round(Math.random()*4);
  console.log(arvonta);
  switch(arvonta){
    case 0:
    fontti="Shadows Into Light", 'cursive';
    break;
    case 1:
    fontti="Permanent Marker", 'cursive';
    break;
    case 2:
    fontti="Rock Salt", 'cursive';
    break;
    case 3:
    fontti="Reenie Beanie", 'cursive';
    break;
    case 4:
    fontti="Give You Glory", 'cursive';
    break;
  }
  return fontti;
}
//muuttuja elementin id:eille funktioiden ulkopuolella.. en oikein tiedä mitä ajattelin alussa tämän kanssa kun saman olisi voinut hoitaa hienosti laskurillakin, mutta enää ei viitsi muuttaa :)
var identifoija;

//luodaan tussitaulutapahtuma piilotettuun diviin ja tarralappu oletusnäkymään
function luoLappu(){
  //ensin perinteinen listahässäkkä;
  var teksti = document.getElementsByClassName("form-control")[0].value;              //haetaan tekstikentän teksti muuttujaan
  if(teksti==""){                                                                      //tsekataan ettei kenttä ole tyhjä..
    alert("Tarkista tekstikenttä. Tyhjää tehtävää ei voida luoda");                     //annetaan virheilmoitus jos on
    document.getElementsByClassName("form-control")[0].style.border="2px solid red";    //..ja korostetaan kentän reunat
  } else {                                                                              //muussa tapauksessa aloitetaan
  document.getElementsByClassName("form-control")[0].style.border="none";               //poistetaan reunojen korostus..
  identifoija=Math.round(Math.random()*1000000)+teksti;                                 //tää oli tää kuningasajatus id:stä..
  var lista=document.getElementById("lista");               //haetaan lista div, ja luodaan sinne ensin ul "todo", johon sitten lisätään listaelementtejä
  var ul=document.createElement('ul');                      //jokainen elementti sisältää tekstikentän ja pari nappia. listaelementissä event-listener mouseover/out toiminnolle.
  ul.id="todo";                                             //napeissa remove ja done toiminnoille.. Lisäksi tyylijuttuja kuten fontin ja sen värin
  var li=document.createElement('li');
  var nappi=document.createElement('button');
  var nappi1=document.createElement('button');
  nappi.innerHTML='<i class="fa fa-trash" style="color:red; font-size:24px;" aria-hidden="true"></i>';
  nappi1.innerHTML='<i class="fa fa-check-circle" style="color:green; font-size:24px;" aria-hidden="true"></i>';
  nappi.addEventListener("click", removeTask, false);
  nappi1.addEventListener("click", taskDone, false);
  nappi.id="lb"+identifoija;
  nappi.className="deleteButtoni";
  nappi1.id="db"+identifoija;
  nappi1.className="doneButtoni";
  li.id="li"+identifoija;
  li.innerHTML="- "+teksti;
  li.addEventListener("mouseover", hoverEfekti, false);
  li.addEventListener("mouseout", hoverPois, false);
  li.appendChild(nappi1);
  li.appendChild(nappi);
  li.style.color=arvoFonttiVari();
  li.style.fontFamily=arvoFontti();
  ul.appendChild(li);
  lista.appendChild(ul);
  
  
  //tarraelementin luominen:
  var kohde=document.getElementById("uusiLappunen");
  
  var vari=arvoVari(vari);                              //arvotaan väri..samaa väriä käytetään nappuloiden taustalla.
                                                        //kuin yllä, mutta nyt luon raahattavan divin, johon tulee tekstialue ja pari buttonia. Diviin eventlistenerit
  var uusiElementti=document.createElement("div");      //drag&dropille ja lapun zoomaukselle (olisin halunnut totetuttaa mouseoverilla, mutta idea ei oikein toiminut
  var tehty=document.createElement("button");           //koska elementti pysyi zoomattuna myös raahatessa joka ei toivottavaa..)
  var poista=document.createElement("button");          //
  tehty.className="buttons_tehty";
  poista.className="buttons_poista";
  tehty.id="tb"+identifoija;
  poista.id="pb"+identifoija;
  tehty.style.backgroundColor=vari;
  poista.style.backgroundColor=vari;
  tehty.innerHTML='<i class="fa fa-check-circle" style="color:green; font-size:20px;" aria-hidden="true"></i>';
  poista.innerHTML='<i style="font-size:20px; color:red;" class="fa">&#xf00d;</i>';
  
  uusiElementti.appendChild(document.createTextNode(teksti));
  uusiElementti.appendChild(tehty);
  uusiElementti.appendChild(poista);
  uusiElementti.id=identifoija;
  uusiElementti.className="laput";
  uusiElementti.draggable="true";
  kohde.appendChild(uusiElementti);
  uusiElementti.style.backgroundColor=vari;
  uusiElementti.style.fontFamily=arvoFontti();
  uusiElementti.addEventListener("dragstart", raahaaElementti,false);
  uusiElementti.addEventListener("click", zoomaaLappu,false);
 

  if(document.getElementById('lista').style.display=="block"){    //jos käyttäjä valinnut tussitaulunäkymän, niin tarralaput luodaan "piiloon".
    uusiElementti.style.display="none";
  }
  document.getElementsByClassName("form-control")[0].value="";    //tyhjennetään tekstikenttä
}
}




