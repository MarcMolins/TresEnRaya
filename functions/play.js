//añadimos el valor de los datos de los jugadores
function write(){
    PLAYER1_INIT.innerHTML = PLAYERS.player1.name[0]
    PLAYER1_NAME.innerHTML = PLAYERS.player1.name
    PLAYER2_INIT.innerHTML = PLAYERS.player2.name[0]
    PLAYER2_NAME.innerHTML = PLAYERS.player2.name
    PLAYER1_WINS.innerHTML = $mesaje + "<b>" + PLAYERS.player1.wins + "</b>";
    PLAYER2_WINS.innerHTML = $mesaje + "<b>" + PLAYERS.player2.wins + "</b>";
}
write();

//función que muestra al ganador
//creamos la estructura
//al finalizar la animacion eliminamos la modal
function show(){
    document.body.style.overflow = 'hidden';
    let $newModal = document.createElement('div');
    document.body.appendChild($newModal);
    $newModal.id = 'win';
    $newModal.classList.add('flexModal');
    $newModal.style.textAlign = 'center';
    $newModal.animate(
        [
            {opacity: '0'},
            {opacity: '1'}
        ],
        {
            duration: 100,
            fill: "forwards"
        }
    );

    let $newModalChild = document.createElement('div');
    $newModal.appendChild($newModalChild);
    $newModalChild.classList.add('wModal');

    let $newH4 = document.createElement('h4');
    let $newH3 = document.createElement('h3');
    $newModalChild.appendChild($newH4);
    $newModalChild.appendChild($newH3);
    $newH4.innerHTML = "¡Victoria!";
    $newH3.classList.add('name');
    if($turn == 2){
        $newH3.innerHTML = PLAYERS.player1.name;
    }else{
        $newH3.innerHTML = PLAYERS.player2.name;
    }

    setTimeout(function(){
        $newModal.animate(
            [
                {opacity: '1'},
                {opacity: '0'}
            ],
            {
                duration: 100,
                fill: "forwards"
            }
        );
        document.body.removeChild($newModal);
        document.body.style.overflow = 'auto';
        
        //reseteamos juego
        Array.from(PLAYBLOCK).forEach(function($element){
            $element.innerHTML = "";
            $element.classList.remove('spaceActive');
            $element.addEventListener('click', play);
    
            //reseteamos la opacidad de la tabla
            TABLE.animate(
                [
                    {opacity: '0.5'},
                    {opacity: '1'}
                ],
                {
                    duration: 500,
                    fill: "forwards"
                }
            );
        })
    },5000)
}

//funcion que comprueba el resultado
//en caso de que una linea o digonal sea identica devolvera true
//en caso contrario devolvera false
function check(){
    for(let $e = 0; $e<PLAYBLOCK.length; $e++){
        if(
            (
                ((PLAYBLOCK[0].innerHTML === PLAYBLOCK[1].innerHTML)&&(PLAYBLOCK[0].innerHTML === PLAYBLOCK[2].innerHTML))&&
                (PLAYBLOCK[0].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[3].innerHTML === PLAYBLOCK[4].innerHTML)&&(PLAYBLOCK[3].innerHTML === PLAYBLOCK[5].innerHTML))&&
                (PLAYBLOCK[3].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[6].innerHTML === PLAYBLOCK[7].innerHTML)&&(PLAYBLOCK[6].innerHTML === PLAYBLOCK[8].innerHTML))&&
                (PLAYBLOCK[6].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[0].innerHTML === PLAYBLOCK[3].innerHTML)&&(PLAYBLOCK[0].innerHTML === PLAYBLOCK[6].innerHTML))&&
                (PLAYBLOCK[0].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[1].innerHTML === PLAYBLOCK[4].innerHTML)&&(PLAYBLOCK[1].innerHTML === PLAYBLOCK[7].innerHTML))&&
                (PLAYBLOCK[1].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[2].innerHTML === PLAYBLOCK[5].innerHTML)&&(PLAYBLOCK[2].innerHTML === PLAYBLOCK[8].innerHTML))&&
                (PLAYBLOCK[2].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[0].innerHTML === PLAYBLOCK[4].innerHTML)&&(PLAYBLOCK[0].innerHTML === PLAYBLOCK[8].innerHTML))&&
                (PLAYBLOCK[0].innerHTML !== "")
            )||
            (
                ((PLAYBLOCK[2].innerHTML === PLAYBLOCK[4].innerHTML)&&(PLAYBLOCK[2].innerHTML === PLAYBLOCK[6].innerHTML))&&
                (PLAYBLOCK[2].innerHTML !== "")
            )
        ){
            return true;
        }else{
            return false;
        }
    }
}

function result(){
    //si check es false no hacemos nada y sigue el juego
    //en caso contrario se mostrará mensaje de ganador
    if(check()==false){
        return;
    }else{
        //Quitamos la funcion de juego en los espacios del tablero
        Array.from(PLAYBLOCK).forEach(function($element){
            $element.removeEventListener('click', play)
        });

        //Si al ganar turno es 2 se le añade un punto al player1
        // *es $turno == 2 porque al completar la acción del jugador 1
        // *el valor pasa de $turno = 1 a $turno = 2
        if($turn == 2){
            PLAYERS.player1.wins += 1;
        }else{
            PLAYERS.player2.wins += 1;
        }

        //bajamos la opacidad de la tabla al tener ganador
        TABLE.animate(
            [
                {opacity: '1'},
                {opacity: '0.5'}
            ],
            {
                duration: 500,
                fill: "forwards"
            }
        );

        //llamamos a la funcion para mostrar al ganador
        show();

        //volvemos a llamar la escritura de datos
        //para actualizar el numero de victorias
        write();
    }
}

//funcion que controla los estilos de la info de los jugadores
function turn(){
    if($turn == 1){
        PLAYER_INFO[0].style.opacity = "1";
        PLAYER_INFO[2].style.opacity = "0.5";
    }else{
        PLAYER_INFO[0].style.opacity = "0.5";
        PLAYER_INFO[2].style.opacity = "1";
    }
}
turn();

function play(){
    //primero revisamos que el espacio no esta ocupado por una forma
    //en caso de que lo esté, dara error (de forma visual, temblor)
    if(this.innerHTML == ""){
        //si $turn es 1, es el tuno de player1
        //al completar su turno, cambia el valor a 2
        if($turn == 1){
            this.innerHTML = '<img src="material/' + PLAYERS.player1.form + '.png">';
            $turn = 2;
        }else{
            this.innerHTML = '<img src="material/' + PLAYERS.player2.form + '.png">';
            $turn = 1;
        }
        this.classList.add('spaceActive');

        //lanzamos la funcion result para comprobar el resultado de cada acción
        setTimeout(result,100);
        turn();
    }else{
        //animacion de error
        this.animate(
            [
                {transform: 'translate(-3px)'},
                {transform: 'translate(3px)'}
            ],
            {
                duration: 150,
                itinerations: 4,
            }
        );
    }
}

//añadimos a cada bloque el evento de juego
Array.from(PLAYBLOCK).forEach(function($element){
    $element.addEventListener('click', play)
})

//reseteamos todas las funciones del juego
RESET.addEventListener('click', function(){
    Array.from(PLAYBLOCK).forEach(function($element){
        $turn = 1;
        $element.innerHTML = "";
        $element.classList.remove('spaceActive');
        $element.addEventListener('click', play);

        //reseteamos la opacidad de la tabla
        TABLE.animate(
            [
                {opacity: '0.5'},
                {opacity: '1'}
            ],
            {
                duration: 500,
                fill: "forwards"
            }
        );
        turn();
    })
})