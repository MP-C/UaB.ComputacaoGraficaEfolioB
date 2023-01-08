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
import { selectBall, C0, C1, C2, C3, C4 } from './balls.js';
import { Bezier4Curve } from './bezier4Curve.js'

/* Variável para pixel */
const size = 1; /* Defenir o tamanho do pixel, idêntico ao ladrilho em cima (quando selecionado) */

/* Variáveis para apresentar o tabuleiro */
const gridSize = 9;                     /* Para definir o tamanho do tabuleiro para cada lado a partir do eixo (x,y) = (0,0), que também é usado para o tamanho das linhas verticais */
const colorEven = '#f68967';            /* Para defenir a cor quando o resultado da posição do quadrante é par */
const colorOdd = '#8e89b4';             /* Para defenir a cor quando o resultado da posição do quadrante é impar */
let camera, renderer, scene, controls;  /* Para importar as funcionalidades existentes */
let boards = [];                        /* Para criar o tabuleiro */

/* Variáveis para apresentar as bolas e pontos no tabuleiro consoante a interação do utilizador */
let balls = []; /* Para guardar as bolas selecionadas */
let mouse = new THREE.Vector2(0, 0);    /* Para identificar a posição do rato no tabuleiro */
let raycaster = new THREE.Raycaster();  /* Funcionalidade exigida para apresentar as coordenadas (x,y,z) em que a bola se encontra sobre o tabuleiro */

/* Funções que permitem integrar na scene todos os materiais, objetos, posições e interações */
/* Para impor os eixos xx, yy e zz, no tabuleiro, com as cores */
function createAxis() {
    let lineSize = size * (gridSize + 1); /* Para que cada eixo fique com tamanho completo de metade do tabuleiro */

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
    for ( let horizontal = -gridSize - 1; horizontal <= gridSize; horizontal++ ) {      /* Para determinar o tamanho do tabuleiro para x, com 10 pixels para esquerda e 10 pixels para direita */
        for ( let vertical = -gridSize - 1; vertical <= gridSize; vertical++ ) {        /* Para determinar o tamanho do tabuleiro para Y, com 10 pixels para baixo e 10 pixels para cima */
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


/* Função que cria uma bola à vez*/ 
function createSphere (ballC){
    const geometry = new THREE.SphereGeometry( 0.5, 25, 25 );               /* Para criar uma esfera de raio 0.5, e com detalhe de 25 segmentos horizontais e 25 verticais */
    const material = new THREE.MeshBasicMaterial( { color: ballC.color,         /* Para que o material fique com a cor pedida quando a bola é selecionada */
                                                    opacity: 0.5,           /* Para ser semi-opaca */
                                                    transparent: true } );  /* para ficar transparente */
    const sphere = new THREE.Mesh( geometry, material );                    /* Para criar o material da esfera e a tornar visível */
    /* Para colocar a bola posição randomizada */
    sphere.position.x = ballC.position.x;                                         
    sphere.position.y = ballC.position.y;
    sphere.position.z = ballC.position.z;

    let sphereDetails = sphere.userData;                   /* Para controlo com a Userdata */
    sphereDetails.startPosition = new THREE.Vector3();     /* Para determinar a posição inicial */
    sphereDetails.lastPosition = new THREE.Vector3();      /* e a última posição gravada */
    sphereDetails.startPosition = ballC.startPosition;     /* Para determinar a inicialização da posição inicial */
    sphereDetails.lastPosition = ballC.startPosition;      /* inicialização da ultima posição (inicial) */

    return sphere;                                         /* Devolve a esfera para a função seguinte */
}

/* Função que cria as bolas todas, e faz com que estas sejam inseridas no tabuleiro numa posição inicial
aletóriaa, com as cores respetivas, a partir do array correspondente */
function createBalls() {
    balls.push(createSphere(C0));  /* Para criar a bola amarela */
    balls.push(createSphere(C1));  /* Para criar a bola laranja */
    balls.push(createSphere(C2));  /* Para criar a bola vermelha */
    balls.push(createSphere(C3));  /* Para criar a bola verde */
    balls.push(createSphere(C4));  /* Para criar a bola azul */

    balls.every (sphere => scene.add(sphere));    /* Para inserir as bolas na scene */
}

/* Função que recebe um número e seleciona a bola que corresponde a esse numero */ 
function ballSelected(i) {
    let index = i-1;
    selectBall.selected = true;                  /* A bola é selecionada */
    selectBall.ballNum = index;                  /* O número da bola seleccionada é guardado na variavel */
    balls[index].material.transparent = false;   /* Para tornar a bola opaca */
    
    /* Função que cria um DIV com a informação das coordenadas da bola selecionada, posição definida no .css */
    let C = balls[selectBall.ballNum];           /* C = número da bola selecionada */
    scene.add(C);
    
    /* Para ativar a DIV html, com as coordenadas da bola e mostrar em tempo real */
    if (C.line !== undefined) {
        scene.remove(C.line);
        C.line == undefined;
    }
    let coordDiv = document.createElement('div');   /* definição de coordDiv como um div */
    document.body.appendChild(coordDiv);            /* criação do nó coorDiv no body */
    /* Colocação do conteudo no div criado, caracteristicas definidas no .css, representadas as coordenadas da bola (com duas casas decimais) em tempo real e qual a bola selecionada */
    coordDiv.innerHTML = 
        '<span id="ballPosition"> Coordenadas (x,y,z) da Bola ' + (index+1)+'=> C' 
        + selectBall.ballNum + '<br>'+' (' + C.position.x.toFixed(2) + ' , ' 
        + C.position.y.toFixed(2) + ' , ' + C.position.z.toFixed(2) + ')</span>';
}

/* Função responsavel por anular as coordenadas mais recentes da bola selecionada, retirar a seleção atribuida,
e, apaga do ecra as coordenadas relativas às posições das bolas após estas serem movimentadas pelo utilizador */
function ballDeselected() {
    raycaster.setFromCamera(mouse, camera);                 /* inicializa o raycaster com as posições do rato em relação à camara */
    selectBall.selected = false;                            /* retira a seleção da bola */
    balls[selectBall.ballNum].material.transparent = true;  /* e volta a por a bola transparente */

    if (balls[selectBall.ballNum].position.z !== 0) {
        let zLineToBall = [];
        zLineToBall.push(new THREE.Vector3(balls[selectBall.ballNum].position.x, balls[selectBall.ballNum].position.y, 0));
        zLineToBall.push(balls[selectBall.ballNum].position);
    
        /* Para criar a linha na scene, que vai entre o tabuleiro e a nova posição da bola, quando esta está fora do plano z=0 */
        let geometry3 = new THREE.BufferGeometry().setFromPoints(zLineToBall);                  /* Dá forma à linha */
        let material3 = new THREE.LineBasicMaterial( { color: new THREE.Color('white') } );     /* Para atribuir cor a essa mesma linha */
        let line3 = new THREE.Line(geometry3, material3);                                       /* e esta, ser adicionada ao tabuleiro */
        scene.add(line3);    
        balls[selectBall.ballNum].line = line3;                                                 /* Permite que cada bola tenha a sua linha, de forma independente umas das outras */
    }

    /* Remove o nó que contém a informação das coordenadas */
    if (document.getElementById('ballPosition')) {                         /* Se a posição da bola está visivel para o utilizador */
        let coordDiv = document.getElementById('ballPosition');            /* então, identifica a <div> respetiva e remove-a do ficheiro index.html */
        coordDiv.parentNode.removeChild(coordDiv);
    }
}

/* Atualiza as coordenadas da bola selecionada no ecrã (para atualizar com o movimento do rato, ou quando se pressiona w ou s) */
function updateCoordenates() {
    const C = balls[selectBall.ballNum];                    /* inicializa C com a bola selecionada */
    if (document.getElementById('ballPosition')) {          /* Se existir o div coord insere as coordenadas no seu innerHTML com os valores arredondados a duas casas decimais, em que x,y é o ponto de interceção do rato com o tabuleiro e z a coordenada z atual da bola  */
        document.getElementById('ballPosition').innerHTML =
            'Novas coordenadas (x,y,z) da bola C' 
            + selectBall.ballNum + '<br>'+' (' + C.position.x.toFixed(2) 
            + ' , ' + C.position.y.toFixed(2) + ' , ' + C.position.z.toFixed(2) + ')';
    }
}

/* Para desenhar a a curve Bezier no tabuleiro segundo a posição das bolas */
function createBezierCurve() {
    let bezier4Curve = new Bezier4Curve(1, balls);
        let geometry = new THREE.TubeGeometry( bezier4Curve, 80, 0.35, 30, false);
        let material = new THREE.MeshBasicMaterial( { color: new THREE.Color('#32CD32'), wireframe : true} );

        let bezier4Tube = new THREE.Mesh(geometry, material);
        bezier4Tube.receiveShadow = true;                    
        bezier4Tube.castShadow = true;        
        
        scene.add(bezier4Tube);         /* Para adicionar a curva à scene */
        updadeSceneOrbits();            /* Para actualizar scene e orbit controls */
}

/* Função para atualizar a scene e o orbit controls de modo continuo sempre que necessário. Função chamada na zona respetiva */
function updadeSceneOrbits(){
    renderer.render(scene, camera);     /* Para atualizar a scene em continuo */
    controls.update();                  /* Para atualizar o orbit controls */
}

/*======================EVENTS======================*/
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
    if (selectBall.selected) {                              /* Se bola selecionada, então: */
        updateCoordenates();                                /* as coordenadas são atualizadas no ecran, consoante a posição e o movimento do rato no tabuleiro */
        /* Para colocar na variavel C a bola selecionada */
        raycaster.setFromCamera(mouse, camera);             /* e para que, ao se inicializar o raycaster com novas posições do rato em relação à camara, as posições */

        let intersects = raycaster.intersectObjects(boards);
        if (intersects.length) {
            let coordinates = intersects[0].point;
            
            let C = balls[selectBall.ballNum];      
            C.position.x = coordinates.x;           /* da coordenada XX da bola e as do ponto de interseção */
            C.position.y = coordinates.y;           /* com as coordenadas YY e as do ponto de interseção, sejam atualizadas */
            updadeSceneOrbits();                    /* Para actualizar scene e orbit controls */
        }
    }
}



/* Para detetar seleção de teclas */
function onDocumentKeyDown(event) {
    /* Para apagar os pontos selecionados e guardados */
    if(event.key === 'Backspace') {
        balls=[];                                               /* Para reinicializar os pontos em que as bolas aparecem */
        scene.remove.apply(scene, scene.children); 
        createDisplayRaster(scene, camera, renderer, controls); 
        renderer.render(scene, camera);                         /* Para atualizar o tabuleiro */
        controls.update();                                      /* Para atualizar o orbit controls */
        console.log("Confirma-se que se apagou o registo de pontos, e se reinicializou nova posição");
        
    } else if (selectBall.selected == false && (event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' )) {
        console.log("A bola",event.key,"foi selecionada."); /* Para dar visibilidade na consola do que está a decorrer como leitura do programa */
        /* Para utilizar selecionar a bola, mudar a posição da bola selecionada, ativar opacidade, utilizar o numero indicado, e apresentar coordenadas */
        ballSelected(event.key);

    } else if (selectBall.selected == true) {   /* Para que, quando estiver uma das bolas seleccionadas, então: */
        if (event.code == 'Space') {            /* - Se for pressionada a tecla 'space' */
            console.log("Space pressionado");   /* Para efeitos de experiência do utilizador */
            ballDeselected();                   /* Libertam-se as coordenadas */

            updadeSceneOrbits();                /* Para actualizar scene e orbit controls */
        }
        if (event.key == 'w') {                 /* - Se for pressionada a tecla 'w', então */
            balls[selectBall.ballNum].position.z = balls[selectBall.ballNum].position.z + 0.1; /*  soma-se 0.1 unidades à coordenada ZZ */
            console.log("W pressionado, a bola sobe");
            updateCoordenates();                /* E, as coordenadas serem atualizadas diretamente no monitor, de forma dinâmica */
            updadeSceneOrbits();                /* Para actualizar scene e orbit controls */
        }
        if (event.key == 's') {                 /* - Se for pressionada a tecla 's', então */
            balls[selectBall.ballNum].position.z = balls[selectBall.ballNum].position.z - 0.1; /*  retira-se 0.1 unidades à coordenada ZZ */
            console.log("S pressionado, a bola desce");
            updateCoordenates();                /* E, as coordenadas serem atualizadas diretamente no monitor, de forma dinâmica */
            updadeSceneOrbits();                /* Para actualizar scene e orbit controls */
        }
    
    } else if (event.key === 'x') {             /* Para que quando se clicar na tecla "x" */
        createBezierCurve();                    /* se faça aparecer no tabuleiro a curva Bezier */
    }
}


/* Para criar o tabuleiro no displayRaster segundo os requesitos estipulados */
function createDisplayRaster(_scene, _camera, _renderer, _controls) {
    scene = _scene;
    camera = _camera;
    renderer = _renderer;
    controls = _controls;
    
    createBalls();
    createBoard();
    createAxis();
    createEvents();
}

export { createDisplayRaster };