const PLAYERS = {
    player1: {
        name: sessionStorage.getItem('player1Name'),
        wins: 0,
        form: 'cross',
    },
    player2: {
        name: sessionStorage.getItem('player2Name'),
        wins: 0,
        form: 'circle',
    }
}
const MODAL = document.getElementById('modal');
const INPUTNAME1 = document.getElementById('inputPlayer1');
const INPUTNAME2 = document.getElementById('inputPlayer2');
const GETDATA = document.getElementById('submitGetData');

const TABLE = document.getElementById('table');
const PLAYBLOCK = document.getElementsByClassName('space');
const RESET = document.getElementById('resetBtn');

const PLAYER1_INIT = document.getElementById('player1_initial');
const PLAYER2_INIT = document.getElementById('player2_initial');
const PLAYER1_NAME = document.getElementById('player1_name');
const PLAYER2_NAME = document.getElementById('player2_name');
const PLAYER1_WINS = document.getElementById('p1wins');
const PLAYER2_WINS = document.getElementById('p2wins');

const PLAYER_INFO = document.getElementById('players_information').getElementsByTagName('div');

let $turn = 1;
let $mesaje = "Numero de victorias: ";
