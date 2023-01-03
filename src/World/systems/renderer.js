//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : renderer.js
// Descrição    : E Fólio-B - Computação Gráfica - documento js que
//                renderiza o módulo gráfico (WebGL) para web
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: renderer.js");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

/* Para que se possa atualizar de forma constante o ficheiro assim que ocorra 
uma modificação dinâmica em qualquer parte do projeto */
function createRenderer() {

  const renderer = new THREE.WebGLRenderer();
  
  /* Para atualizar o pixel (dimensão, espaço, aspeto, ...) no global (index) 
  em que se torna visual o tabuleiro criado */
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  return renderer;
}

export { createRenderer };