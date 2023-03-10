//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : camera.js
// Descrição    : E FOLIO B - Computação Gráfica - documento js que permite 
//                criar os 5 objetos esfera, cada um com as suas propriedades
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioA
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: balls.js");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

// Para que seja possivel controlar a bola selecionada tal como pedido no enunciado
let selectBall = {
    selected: false,        // Para controlar a possibilidade de haver outra bola selecionada
    ballNum: 0              // Para atribuir o número da bola que é selecionada: 0:{C0}, 1:{C1}, 2:{C2}, 3:{C3} e 4:{C4};
};

let xRandomCoord = Math.round(Math.random()*10);
let yRandomCoord = Math.round(Math.random()*10);

console.log("Pontos gerados aleatóriamente para x",xRandomCoord, "e y:",yRandomCoord);
/* Para representar as 5 bolas com as configurações em modo objeto */
let C0 = {      /* Constiuir as condições para a bola amarela */
    color: "yellow",
    position: new THREE.Vector3(0, 0, 0)
};

let C1 = {      /* Constiuir as condições para a bola laranja */
    color: "orange",
    position: new THREE.Vector3((yRandomCoord==0?2:yRandomCoord), (xRandomCoord==0?2:xRandomCoord), 0)
};

let C2 = {      /* Constiuir as condições para a bola vermelha */
    color: "red",
    position: new THREE.Vector3(xRandomCoord-yRandomCoord, -yRandomCoord+1, 0)
};

let C3 = {      /* Constiuir as condições para a bola verde */
    color: "green",
    position: new THREE.Vector3(-(xRandomCoord==0?2:-xRandomCoord), -(yRandomCoord==0?2:yRandomCoord), 0)
}

let C4 = {      /* Constiuir as condições para a bola azul */
    color: "blue",
    position: new THREE.Vector3(-xRandomCoord+yRandomCoord, yRandomCoord-1, 0)
};

export { selectBall, C0, C1, C2, C3, C4 };