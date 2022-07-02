//la modal se abre en caso de que no este almacenado en el sessionStorage
//los datos de ambos jugadores. En caso de que dejen los inputs vacios
//se generarán los datos con los valores Player1 i/o Player2
if (
    (!sessionStorage.getItem('player1Name')) ||
    (!sessionStorage.getItem('player2Name')) ||
    
    ((!sessionStorage.getItem('player1Name')) &&
    (!sessionStorage.getItem('player2Name')))
) {
    //funcion que genera los datos de los jugadores
    function setData() {
        this.preventDefault;
    
        if(INPUTNAME1.value !== ""){
            sessionStorage.setItem('player1Name',INPUTNAME1.value);
        }else{
            sessionStorage.setItem('player1Name','Player1');
        }
    
        if(INPUTNAME2.value !== ""){
            sessionStorage.setItem('player2Name',INPUTNAME2.value);
        }else{
            sessionStorage.setItem('player2Name','Player2');
        }
        document.body.removeChild(MODAL);
        location.reload();
    }
    GETDATA.addEventListener('click',setData);
}else{
    document.body.removeChild(MODAL);
}

