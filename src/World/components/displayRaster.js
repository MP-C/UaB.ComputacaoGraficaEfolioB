//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : displayRaster.js
// Descrição    : E FOLIO B - Computação Gráfica - ficheiro com função
//                que cria o tabuleiro responsável por apresentar o resultado
//                final
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: displayRastrer.js");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { createPixel } from './pixel.js';
import { lineMP } from './../../../lineMP.mjs';

/* Variável para pixel */
const size = 1; /* Defenir o tamanho do pixel, idêntico ao ladrilho em cima (quando selecionado) */

/* Variáveis para apresentar o tabuleiro */
const gridSize = 9;                     /* Definir o tamanho do tabuleiro para cada lado a partir do eixo (x,y) = (0,0) */
const colorEven = '#f68967';            /* Defenir a cor quando o resultado da posição do quadrante é par */
const colorOdd = '#8e89b4';             /* Defenir a cor quando o resultado da posição do quadrante é par */
let camera, renderer, scene, controls;  /* Para importar as funcionalidades existentes */
let boards = [];                        /* Para criar o tabuleiro */

/* Variáveis para apresentar pontos no tabuleiro consoante a interação do utilizador */
let mouse = new THREE.Vector2(0, 0);    /* Para identificar a posição do rato no tabuleiro */
let raycaster = new THREE.Raycaster();  /* Funcionalidade exigida para apresentar os pontos do pixel em que o rato se encontra */
let tilePointsRed = [];                 /* Para utilizar os pontos criam os ladrilhos vermelhos do raycaster */
let selectedPointsMP = [];              /* Para utilizar os pontos criam a linha do lineMP */


/* Funções para criar a scene */
/* Para impor os eixos xx, yy e zz, no tabuleiro, com as cores pedidas - E-Fólio A */
function createAxis() {
    let lineSize = size * (gridSize);

    /* Para defenir os eixos xx no tabuleiro com cor azul */
    let xPoints = [];
    xPoints.push(new THREE.Vector3(0, 0, 0));
    xPoints.push(new THREE.Vector3(lineSize, 0, 0)); /* Considerar X = tamanho da linha (= tamanho de metade do tabuleiro), para que a linha se apresente com o mesmo comprimento */

    /* Para criar a linha na scene */    
    let geometry = new THREE.BufferGeometry().setFromPoints(xPoints);
    let material = new THREE.LineBasicMaterial( { color: new THREE.Color('blue') } );
    let line = new THREE.Line(geometry, material);
    scene.add(line);
    
    /* Para defenir os eixos yy no tabuleiro com cor vermelha */
    let yPoints = [];
    yPoints.push(new THREE.Vector3(0, 0, 0));
    yPoints.push(new THREE.Vector3(0, lineSize, 0)); /* Considerar Y = tamanho da linha (= tamanho de metade do tabuleiro), para que a linha se apresente com o mesmo comprimento */

    /* Para criar a linha na scene */
    let geometry2 = new THREE.BufferGeometry().setFromPoints(yPoints);
    let material2 = new THREE.LineBasicMaterial( { color: new THREE.Color('red') } );
    let line2 = new THREE.Line(geometry2, material2);
    scene.add(line2);

    /* Para defenir os eixos zz no tabuleiro com cor verde */
    let zPoints = [];
    zPoints.push(new THREE.Vector3(0, 0, 0));
    zPoints.push(new THREE.Vector3(0, 0, lineSize)); /* Considerar Z = tamanho da linha (= tamanho de metade do tabuleiro), para que a linha se apresente com o mesmo comprimento */

    /* Para criar a linha na scene */
    let geometry3 = new THREE.BufferGeometry().setFromPoints(zPoints);
    let material3 = new THREE.LineBasicMaterial( { color: new THREE.Color('green') } );
    let line3 = new THREE.Line(geometry3, material3);
    scene.add(line3);    
}


/* Para criar o tabuleiro a partir de cada pixel, defenindo a dimensão do tabuleiro, do pixel, a posição nos eixos e com isso, a sua cor */
function createBoard() {
    let board;
    for ( let horizontal = -gridSize-1; horizontal <= gridSize; horizontal++ ) {      /* Para determinar o tamanho do tabuleiro para x, com 10 pixels para esquerda e 10 pixels para direita */
        for ( let vertical = -gridSize-1; vertical <= gridSize; vertical++ ) {        /* Para determinar o tamanho do tabuleiro para Y, com 10 pixels para baixo e 10 pixels para cima */
            if ( ( horizontal % 2 === 0 && vertical % 2 === 0 ) || ( horizontal % 2 !== 0 && vertical % 2 !== 0  ) ) { 
                /* Para garantir para ambos os pixel's, que quando o resultado for par ou impare, este admite uma cor específica */
                board = createPixel(size, horizontal, vertical, colorEven);         /* Adicionar com uma cor especifica quando é par */
            }
            else {
                board = createPixel(size, horizontal, vertical, colorOdd);          /* Adicionar com outra cor especifica quando é impar */
            }
            /* Para adicionar a construção de cada pixel no tabuleiro */
            boards.push(board);
            
            /* Para adicionar o tabuleiro à scene */
            scene.add(board);
        }   
    }
}

/* Para que ao se selecionar um pixel, um ladrilho amarelo surga com o pressionar de tecla x */
function createTile(x, y) {
    let geometry = new THREE.BoxGeometry(size, size, size);
    /* Condição expressa no enunciado quanto à criação do ladrinho para o tamanho, cor e transparência */
    let material = new THREE.MeshBasicMaterial({color: new THREE.Color('yellow'), opacity : 0.5, transparent : true});
    let tile = new THREE.Mesh(geometry, material);
    
    /* Para que a sua posição seja calculada segundo a dimensão do pixel que se encontra na mesma posição 2D, mas ganhar profundidade do ladrilho */
    tile.position.x = size * x;
    tile.position.y = size * y;
    tile.position.z = size / 4; /* Condição da altura pedida que o ladrilho deva ter altura = 1/4 */
    return tile;
}

/* Para desenhar a linha no tabuleiro */
function drawLine( startPoint, endPoint ) {
    let selectVetor=[];

    selectVetor.push( new THREE.Vector3( startPoint.x * size, startPoint.y * size, 1/9 ) ); /* Para selecionar os pontos iniciais no vetor*/
    selectVetor.push( new THREE.Vector3( endPoint.x * size, endPoint.y * size, 1/9 ) ); /* Para selecionar os pontos finais no vetor */

    /* Para criar a linha */
    let geometry = new THREE.BufferGeometry().setFromPoints(selectVetor);
    let material = new THREE.LineBasicMaterial( { color: 'black' } ); /* Para determinar a cor da linha */
    let selectedLine = new THREE.Line( geometry, material );

    /* Para adicionar a linha à scene */
    scene.add( selectedLine );
    selectedPointsMP = selectVetor;
}


/* Criação dos eventos que permitem que o utilizador interaja com a interface */
function createEvents(){
    window.addEventListener( 'resize', onWindowResize );        /* Par redimensionar a janela */
    document.addEventListener( 'mousemove', onMouseMove );      /* Para detetar movimentação do rato */
    document.addEventListener( 'keydown', onDocumentKeyDown );  /* Para detetar seleção de teclas */
}

/* Para redimensionar a janela */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
}

/* Para detetar movimentação do rato */
function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/* Para detetar seleção de teclas */
function onDocumentKeyDown(event) {
    /* Para apagar os pontos selecionados e guardados */
    if(event.key === 'Backspace') {
        /* Para apagar os pontos selecionados colecionados, pois já não são precisos */
        selectedPointsMP=[];

        scene.remove.apply(scene, scene.children); 
        createDisplayRaster(scene, camera, renderer, controls);
        renderer.render(scene, camera);
        controls.update();

        console.log("Confirma-se que se apagou o registo de pontos.");
    } else if (event.key === 'x') {

        let redTile = new THREE.Color('red');
        
        /* Para guardar a posição do rato, no tabuleiro */
        raycaster.setFromCamera(mouse, camera); 

        /* Para cruzar os pontos entre o rato e o tabuleiro, quando selecionada a tecla "x" */
        let selection = raycaster.intersectObjects(boards);
        
        if (selection.length > 0) {
            let selectionColor = selection[0].object.material.color; /* Para selecionar a cor atual e verificar de seguida se o pixel clicado é vermelho */
            
            if( selectionColor!=('red')){ /* Caso o pixel não tenha cor vermelha, então muda de cor */
                selection[0].object.material.color.set(redTile);
                renderer.render(scene, camera);   
                controls.update();
            }

            let x = selection[0].object.position.x ; /* E impõem-se uma nova posição */
            let y = selection[0].object.position.y ;
            tilePointsRed.push({x : x, y : y});

            if (tilePointsRed.length > 1) {
                let startPoint = tilePointsRed[0]; /* A variável startPoint igual ao ponto de início de cordenadas do ladrilho vermelho */
                let endPoint = tilePointsRed[1]; /* A variável endPoint igual ao ponto de final de cordenadas do ladrilho vermelho*/
                console.log("ponto Inicio ladrilho selecionado: ", startPoint, " e ponto Final ladrilho selecionado: ", endPoint);

                /* Para desenhar a linha */
                drawLine(startPoint, endPoint);
                renderer.render(scene, camera);
                controls.update();

                /* Para desenhar os ladrilhos coloridos*/
                let tiles = lineMP(startPoint, endPoint);
                tiles.every(tile => scene.add(createTile(tile.x, tile.y)));
                renderer.render(scene, camera);
                controls.update();

                /* Para apagar os pontos vermelhos colecionados, pois não são mais necessários, dado que já foram expostos em Scene */
                tilePointsRed = [];
            }
        }
    }
}


/* Para criar o tabuleiro no displayRaster segundo os requesitos estipulados */
function createDisplayRaster(_scene, _camera, _renderer, _controls) {
    scene = _scene;
    camera = _camera;
    renderer = _renderer;
    controls = _controls;
    
    createBoard();
    createAxis();
    createEvents();
}

export { createDisplayRaster };