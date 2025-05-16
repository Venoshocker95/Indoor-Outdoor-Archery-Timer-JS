
function timerIndoor()
{
    pulisciStorage();

    let secondi = Number("120");

    localStorage.setItem('secondi', secondi);

    /*window.location.href = "./semaforo.html";*/
}


function timerOutdoor()
{
    pulisciStorage();

    let secondi = Number("240");

    localStorage.setItem('secondi', secondi);
    
    /*window.location.href = "./semaforo.html";*/
}


function timerPersonale()
{
    pulisciStorage();

    let secondi = document.getElementById("secondiPersonalizzati").value;

    if(secondi !== secondi)
    {
        window.location.href = "./index.html";
    }
    else
    {
        secondi = parseInt(secondi);

        secondi = Number(secondi);

        localStorage.setItem('secondi', secondi);

        /*window.location.href = "./semaforo.html";*/
    }
}


function pulisciStorage()
{
    /*alert("LocalStorage pulito!");*/
    localStorage.clear();
}