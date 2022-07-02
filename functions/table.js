//en este archivo se pinta la mesa de juego
//el parametro $number establece el numero de filas y columnas
function createTable($number){
    //creamos las filas
    for(let u = 0; u<$number; u++){
        let $newRow = document.createElement('ul');
        TABLE.appendChild($newRow);
        $newRow.classList.add('row');

        //creamos las columnas
        for(let i = 0; i<$number; i++){
            let $newColumn = document.createElement('li');
            $newRow.appendChild($newColumn);

            //creamos los divs dentro de cada li
            let $newSpace =  document.createElement('div');
            $newColumn.appendChild($newSpace);
            $newSpace.classList.add('space')
        }
    }
}
createTable(3);