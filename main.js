/*

 *** Trenoolean ***

   Un treno è rappresentato dalle seguenti caratteristiche:

   - numero indentifico di 4 cifre orari
   - Stazione di partenza
   - Stazione di arrivo
   - Durata del viaggio in minuti
   - Orario di partenza
   - Numero di posti liberi

   A) Generare 10 treni in partenza da Roma e in arrivo a firenze e 10 treni in partenza da milano e in arrivo a Roma
   Non devono essere generati a mano, ma con cicli che creino dei valori plausibili per ogni dato

   B) Stampare il numero identificativo e l'orario di partenza di un treno che da Roma e va a Firenze, con le seguenti caratteristiche
    1) Quello che parte prima
    2) Quello che ci mette meno
    3) Quello più vuoto

   C) Prenotazione: chiedere al'utente la stazione di partenza, la stazione di arrivo e il modo di ricerca.
      Il modo di ricerca può essere una delle opzioni del punto B.
      Il software deve individuare il treno con le caratteristiche scelte dall'utente che abbiamo posti liberi,
      decrementare il numero di posti liberi e generare un Codice Prenotazione di 6 caratteri alfanumerici casuali.

*/

listaTreni = new Array();
// Con i due cicli for genero 10 treni Roma-Firenze e 10 treni Milano-Roma
//I treni vengono salvati nell'array listaTreni
for (var i = 0; i < 10; i++) {
   listaTreni.push(new Train("Roma", "Firenze"));
}
for (var i = 0; i < 10; i++) {
   listaTreni.push(new Train("Milano", "Roma"));
}


var piuPostiLiberi = maxValue(listaTreni, "postiLiberi");
var piuVeloce = minValue(listaTreni, "durataViaggio");
var partePrima = minValue(listaTreni, "orarioPartenza");

//Trasformo l'ora nel formato corretto HH:mm
toCorrectFormat( listaTreni[partePrima], listaTreni[partePrima].orarioPartenza );

console.log(listaTreni);

alert("\nInfo generali: " +
      "\nPrimo treno in partenza: " + listaTreni[partePrima].id + " ,Orario partenza: " + listaTreni[partePrima].orarioPartenza +
      "\nTreno più veloce: " + listaTreni[piuVeloce].id + " ,Durata viaggio: " + listaTreni[piuVeloce].durataViaggio +
      "\nTreno con piu posti liberi: " + listaTreni[piuPostiLiberi].id + " ,Posti liberi: " + listaTreni[piuPostiLiberi].postiLiberi );

do {
   var haveTorepeat = true;
   var departureStation = prompt("Inserisci la stazione di partenza: ");
   var arrivalStation = prompt("Inserisci la stazione di arrivo: ");

   if ( checkTrainLine(listaTreni, departureStation, arrivalStation) ) {

      var t = getTrainByStation(listaTreni, departureStation, arrivalStation);
      console.log(t);

      var usrChoice = choiceSearchMode();
      switch (usrChoice) {
         case 0:
            var postiLiberi = maxValue(t, "postiLiberi");
            alert("Partenza: " + t[postiLiberi].partenza + ", Arrivo: " + t[postiLiberi].arrivo + "\nTreno con piu posti liberi: " + t[postiLiberi].id + " ,Posti liberi: " + t[postiLiberi].postiLiberi );
            if (wantReserveIt()) {
               t[postiLiberi].postiLiberi -= 1;
               var code = genReservationCode();
               alert("Prenotazione effettuata correttamente!!\nCodice Prenotazione: " + code +
                     "\nPosti liberi rimasti: " + t[postiLiberi].postiLiberi );
            }
            break;
         case 1:
            var viaggioMinorDurata = minValue(t, "durataViaggio");
            alert("Partenza: " + t[viaggioMinorDurata].partenza + ", Arrivo: " + t[viaggioMinorDurata].arrivo + "\nTreno più veloce: " + t[viaggioMinorDurata].id + " ,Durata viaggio: " + t[viaggioMinorDurata].durataViaggio );
            if (wantReserveIt()) {
               t[viaggioMinorDurata].postiLiberi -= 1;
               var code = genReservationCode();
               alert("Prenotazione effettuata correttamente!!\nCodice Prenotazione: " + code +
                     "\nPosti liberi rimasti: " + t[viaggioMinorDurata].postiLiberi );
            }
            break;
         case 2:
            var primaPartenza = minValue(t, "orarioPartenza");
            toCorrectFormat( t[primaPartenza], t[primaPartenza].orarioPartenza );
            alert("Partenza: " + t[primaPartenza].partenza + ", Arrivo: " + t[primaPartenza].arrivo + "\nPrimo treno in partenza: " + t[primaPartenza].id + " ,Orario Partenza: " + t[primaPartenza].orarioPartenza );
            if (wantReserveIt()) {
               t[primaPartenza].postiLiberi -= 1;
               var code = genReservationCode();
               alert("Prenotazione effettuata correttamente!!\nCodice Prenotazione: " + code +
                     "\nPosti liberi rimasti: " + t[primaPartenza].postiLiberi );
            }
            break;
      }

      haveTorepeat = false;
   } else {
      alert("La tratta inserita è inesistente, riprova!");
      haveTorepeat = true;
   }
} while ( haveTorepeat );


var t = getTrainByStation(listaTreni, "Roma", "Firenze");
console.log(t);






//console.log( Object.keys(listaTreni[0]));

//console.log(isKeysExist(listaTreni[0], "durataViaggio"));
// **********
// var a = minValue(listaTreni, "postiLiberi");
// console.log(listaTreni[a[1]]);
//
// var b = minValue(listaTreni, "orarioPartenza");
// console.log(listaTreni[b[1]]);

//
// var b = minValue(listaTreni, "orarioPartenza");
// console.log(listaTreni[b[1]]);
//
// console.log("/*****/");
// console.log(listaTreni[partePrima[1]].orarioPartenza);
// toCorrectFormat( listaTreni[partePrima[1]], listaTreni[partePrima[1]].orarioPartenza );
// console.log(listaTreni[partePrima[1]]);
//console.log(toCorrectFormat("1225"));



//Funzione che controlla l'esistenza della keys passata come parametro,
//nell'oggetto passato come parametro. Se l'esito è positivo ritorna l'indice
//in cui si trova quella proprietà altrimenti -1
function isKeysExist(obj, k) {
   var res = -1;
   if (Object.keys(obj).includes(k)) {
      res = Object.keys(obj).indexOf(k);
   }
   return res;

}

//La funzione riceve un array e una key. Prende tutti i valori relativi alla key inserita
//e ne restituisce il valore piu basso, e l'indice in cui esso si trova.
function minValue(listT, key) {
   //console.log(key);
   var min = listT[0][key];
   var indexMin = 0;
   for (var i = 0; i < listT.length; i++) {
      //Object.keys(obj).indexOf(key)
      //console.log(listT[i][key]);
      if ( min > listT[i][key] ) {
         min = listT[i][key];
         indexMin = i;
      }
   }
   var res = [min, indexMin];
   return indexMin;
}

//La funzione riceve un array e una key. Prende tutti i valori relativi alla key inserita
//e ne restituisce il valore piu alto, e l'indice in cui esso si trova.
function maxValue(listT, key) {
   //console.log(key);
   var max = listT[0][key];
   var indexMax = 0;
   for (var i = 0; i < listT.length; i++) {
      //Object.keys(obj).indexOf(key)
      //console.log(listT[i][key]);
      if ( max < listT[i][key] ) {
         max = listT[i][key];
         indexMax = i;
      }
   }
   var res = [max, indexMax];
   return indexMax;
}

//Costruttore che riceve in ingresso partenza e arrivo e genera le
//caratteristiche in maniera casuale.
function Train(partenza, arrivo) {
   this.id = genCode();
   this.partenza = partenza;
   this.arrivo = arrivo;
   this.durataViaggio = genDurata(arrivo);
   this.orarioPartenza = genOrario();
   this.postiLiberi = genPostiLiberi();
}

//Funzione che genera un codice casuale formato da quattro numeri casuali:
function genCode() {
   var code = "";
   for (var i = 0; i < 4; i++) {
      code += randomNumber(0, 9);
   }
   return code;
}

//Funzione che genera una durata del viaggio in base alla destinazione
function genDurata(arrivo) {
   var durata = 0;
   if (arrivo == "Firenze") {
      durata = randomNumber(70, 100);
   } else {
      durata = randomNumber(165, 195);
   }
   return durata;
}

//Funzione che genera l'orario di partenza, e ritorna un array con due elementi
//il primo equivale alle ore il secondo ai minuti
function genOrario() {
   var ora = randomNumber(0, 23);
   var min = randomNumber(0, 59);
   if (ora < 10) {
      ora = "0" + ora;
   }
   if (min < 10) {
      min = "0" + min;
   }
   return ora.toString() + min.toString();
}

//Riceve in ingresso un oggetto Treno e il suo orario con il formato HHmm.
//Sostituisce il valore orario dell'oggetto con l'orario nel formato HH:mm
function toCorrectFormat(obj, orario) {
   strIni = orario.toString().substring(0, 2);
   strEnd = orario.toString().substring(2, 4);
   obj.orarioPartenza = strIni + ":" + strEnd;
}

//Funzione che genera casualmente i posti liberi di un treno
function genPostiLiberi() {
   return randomNumber(0, 350);
}

function randomNumber(start, end) {
   return Math.floor(Math.random() * (end - start + 1)) + start;
}

//Funzione che riceve la stazione di partenza e quella di arrivo. restituisce true
//se la tratta esiste, false altrimenti
function checkTrainLine(arr, partenza, arrivo) {
   var railwayExist = false;
   var i = 0;
   while ( (!railwayExist) && (i < arr.length) ) {
      if ( arr[i].partenza == partenza) {
         if ( arr[i].arrivo == arrivo ) {
            railwayExist = true;
         }
      }
      i++;
   }
   return railwayExist;
}

//Funzione che chiede all'utente la modalità di ricerca. Restituisce la modalità
//scelta
function choiceSearchMode() {
   do {
      var isCorrect = false;
      var usrChoice = parseInt( prompt("Scegli la modalità di ricerca:" +
                                       "\n[0] Maggiore numero di posti liberi" +
                                       "\n[1] Minore durata del viaggio" +
                                       "\n[2] Primo treno in partenza") );
      if ( (usrChoice != 0) && (usrChoice != 1) && (usrChoice != 2)) {
         alert("Opzione non ammessa, riprova.");
      } else {
         isCorrect = true;
      }

   } while (!isCorrect);
   return usrChoice;
}

//Funzione che riceve l'array di treni, stazione di partenza e di arrivo, e genera un nuovo
//array contenente solo treni che partono e arrivano nelle stazioni scelte. Non verranno presi
//in considerazione treni senza posti liberi.
function getTrainByStation(arr, partenza, arrivo) {
   var trainsByStation = new Array();
   for (var i = 0; i < arr.length; i++) {
      if ( (arr[i].partenza == partenza) && (arr[i].arrivo == arrivo) ) {
         if (arr[i].postiLiberi != 0) {
            trainsByStation.push(arr[i]);
         }
      }
   }
   return trainsByStation;
}

//Funzione che richiede all'utente se vuole prenotare quel treno oppure no.
//Ritorna true in caso affermativo, false altrimenti
function wantReserveIt() {
   var v = false;
   do {
      var y_n = parseInt( prompt("Vuoi prenotare questo treno?\n[0] Si\n[1] No") );
      if (y_n == 0) {
         v = true;
      }
   } while ( (y_n != 0) && (y_n != 1) );
   return v;
}


//Funzione che genera un codice casuale formato da tre lettere maiuscole e tre numeri:
//Il primo ciclo genera un numero casuale tra 0 e la lunghezza della stringa maiusc-1. Tale
//numero verrà utilizzato come indice per prendere quel carattere presente in quella posizione della stringa
//Il secondo ciclo genera 3 numeri casuali da 0 a 9 e li concatenta
//Le tre lettere e i tre numeri verranno concatenati insieme e restituiti come codice.
function genReservationCode() {
   var maiusc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var literal = "";
   var number = "";
   var code = "";
   for (var i = 0; i < 3; i++) {
      literal += maiusc.charAt(randomNumber( 0, (maiusc.length-1) ) );
   }
   for (var i = 0; i < 3; i++) {
      number += randomNumber(0, 9);
   }
   code = literal + number;
   return code;
}
