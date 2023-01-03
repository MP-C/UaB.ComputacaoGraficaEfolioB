//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : camera.js
// Descrição    : E FOLIO B - Computação Gráfica - documento js que permite 
//                criar camera, que tem por objetivo tornar visivél os objetos
//                importados para o documento World
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioA
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: camera.js");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createCamera() {
  const camera = new  THREE.PerspectiveCamera(
    35,     /* FOV = Field Of View */
    1,      /* Aspect ratio */
    0.1,    /* Determinar a que proximi1ade se encontra o clipping plane próximo */
    1000,   /* Determinar a que distância se encontra o clipping plane distante */
  );
  
  /* Para determinar o ponto focal em que a camara se centra, ao se iniciar na scene, que tal como indicado, deve ser no ponto central dos 4 ladrilhos em torno do ponto (0,0,0) */
  camera.lookAt(0, 0, 0);
  
  /* Para determinar qual a zona afastada a que a câmara se encontra da cena, e poder visualizar toda a área */
  camera.position.set(0, 0, 40); 

  return camera;
}

export { createCamera };
