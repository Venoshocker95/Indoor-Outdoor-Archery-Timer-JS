let secondi;

let intervallo;

let turnCount = 0;
turnCount = Number(turnCount);

let voleeCount = 1;
voleeCount = Number(voleeCount);


//SUL CARICAMENTO DELLA PAGINA ESEGUE LE CONVERSIONI E CHIAMA "countdown"
window.onload = function()
{
    secondi = localStorage.getItem('secondi');

    /*alert(typeof(secondi));*/

    secondi = parseInt(secondi);

    secondi = Number(secondi);

    /*alert(typeof(secondi));*/

    document.getElementById("spanTimer").textContent = secondi;

    countdown(secondi,turnCount,voleeCount);
}



//ESEGUE IL CONTO ALLA ROVESCIA CHIAMANDO POI DIVERSE FUNZIONI DI CONTROLLO
function countdown(secondi, turnoDiTiro, numVolee)
{
    let contatore = secondi;

    let ab_cd = parseInt(turnoDiTiro);
    ab_cd = Number(ab_cd);

    let turno;

    let countVolee = numVolee;
    
    //ASSEGNA AB O CD IN BASE AD UN CONTATORE CHE VA DA 0 A 3
    if(ab_cd == 0 || ab_cd == 3)
    {
        turno = "AB";
    }
    else if(ab_cd == 1 || ab_cd == 2)
    {
        turno = "CD";
    }


    //DISABILITA BOTTONE NUOVO TURNO
    const btnNuovoTurno = document.querySelector('#btnNuovoTurno');
    btnNuovoTurno.setAttribute('disabled', 'disabled');


    //ESEGUE IL COUNTDOWN E MOSTRA I SECONDI, IL TURNO E LA VOLEE SUL DISPLAY
    intervallo = setInterval(()=>
    {
        checkColore(contatore);

        if(contatore <= 0)
        {
            //Colora lo schermo di rosso e mostra "contatore" e turno
            document.getElementById("spanTimer").textContent = contatore;
            document.body.style.backgroundColor = "red";
            document.getElementById("spanTurno").textContent = turno;
            document.getElementById("spanVolee").textContent = voleeCount + " Volée";
            

            //Ferma il timer
            clearInterval(intervallo);

            //controlla e cambia il turno ed il numero delle volée
            incrementaESalva();

            //Fischia 3 volte
            fischiaFine();


            //Abilita bottone nuovo turno
            btnNuovoTurno.removeAttribute('disabled');

            //return;
        }
        else
        {
            document.getElementById("spanTimer").textContent = contatore;

            document.getElementById("spanTurno").textContent = turno;

            document.getElementById("spanVolee").textContent = voleeCount + " Volée";

            contatore--;
        }

    }, 1000);
}



//CONTROLLA IL COLORE DELLO SCHERMO IN BASE AI SECONDI
function checkColore(sec)
{
    if(sec > 30)
    {
        document.body.style.backgroundColor = "green";
    }
    else if(sec <= 30 && secondi > 0)
    {
        document.body.style.backgroundColor = "orange";
    }
}


//FUNZIONE VUOTA VIENE CHIAMATA SOLO PER TENERE IL TIMER FERMO SU 0 ED ATTENDERE NUOVI INPUT
async function fischiaFine()
{
    var fischio = new Audio('fischio.mp3');

    let numFischi = 0;

    fischio.play();
    
    let intervalloFischi = setInterval(() =>
    {
        if(numFischi >= 2)
        {
            clearInterval(intervalloFischi);
        }
        else
        {
            fischio.play();
            //alert(numFischi);
            numFischi++
        }
    },1200);
}



//CONTROLLA O INCREMENTA IL TURNO SALVA E INCREMENTA LA VOLEE
function incrementaESalva()
{
    //CONTROLLA TURNO PER SELEZIONARE IN SEGUITO AB o CD
    if(turnCount >= 3)
    {
        turnCount = 0;
    }
    else
    {
        turnCount++;
    }

    //SE IL TIMER RAGGIUNGE 0 SALVA LA VOLEE IN MEMORIA
    localStorage.setItem('voleeCount', voleeCount);

    //SE IL TURNO E' PARI INCREMENTA IL NUMERO DELLA VOLEE E SALVALO IN MEMORIA
    if(turnCount % 2 == 0)
    {
        voleeCount++;
        localStorage.setItem('voleeCount', voleeCount);
    }
}


//RIAVVIA IL TIMER USANDO LO STESSO NUMERO DI SECONDI --> DA IMPLEMENTARE
function prossimoTurno()
{   
   countdown(secondi,turnCount,voleeCount);
}


//TERMINA IL TURNO FERMANDO IL TIMER ED ESEGUENDO UN SUONO
function terminaTurno()
{
    //Abilita bottone nuovo turno
    btnNuovoTurno.removeAttribute('disabled');

    //controlla e cambia il turno ed il numero delle volée
    incrementaESalva();

    //Fischia 3 volte
    fischiaFine();

    clearInterval(intervallo);

    document.getElementById("spanTimer").textContent = 0;
    document.body.style.backgroundColor = "red";
    document.getElementById("spanTurno").textContent = turno;
    document.getElementById("spanVolee").textContent = voleeCount + " Volée";
}


function tornaAlMenu()
{
    localStorage.clear();
    
    window.location.href = "./index.html";
}
