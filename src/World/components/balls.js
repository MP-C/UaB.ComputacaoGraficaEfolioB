import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

// Para que seja possivel controlar a bola selecionada tal como pedido no enunciado
let selectBall = {
    selected: false,    // Para controlar a possibilidade de haver outra bola selecionada
    ball: 0             // Para atribuir o número da bola que é selecionada: 0:{C0}, 1:{C1}, 2:{C2}, 3:{C3} e 4:{C4};
};

// Para representar as 5 bolas com as configurações em modo objeto
let C0 = {
    color: "yellow",
    name:1,
    position: new THREE.Vector3(0, 0, 0),
    startPosition: new THREE.Vector3(-5, -5, 0)
};

let C1 = {
    color: "orange",
    name:2,
    position: new THREE.Vector3(-5, -5, 0),
    startPosition: new THREE.Vector3(-5, -5, 0)
};

let C2 = {
    color: "red",
    name:3,
    position: new THREE.Vector3(-5, 5, 0),
    startPosition: new THREE.Vector3(-5, 5, 0)
};

let C3 = {
    color: "green",
    name:4,
    position: new THREE.Vector3(5, 5, 0),
    startPosition: new THREE.Vector3(5, 5, 0)
}

let C4 = {
    color: "blue",
    name:5,
    position: new THREE.Vector3(5, -5, 0),
    startPosition: new THREE.Vector3(5, -5, 0)
};

export { selectBall, C0, C1, C2, C3, C4 };