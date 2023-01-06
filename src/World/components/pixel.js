//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : grid.js
// Descrição    : E FOLIO B - Computação Gráfica - ficheiro com função que cria
//                o pixel de forma individual, que é responsavel por apresentar
//                o resultado final
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioA
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: grid.js");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createPixel(size, x, y, color) {
  /* Para que a grelha apareça com os diferentes quadrados */
  const geometry = new THREE.PlaneGeometry(size, size);

  /* Para criar a base do material de cor branca em modo default, 
  mas com as cores desejadas para a creação do tabuleiro  */
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    opacity: 0.60,
    transparent: true
  });

  /* Criar Mesh, que contem a Geometria e o Material para o próprio pixel em si aparecer*/
  const pixel = new THREE.Mesh(geometry, material);

  /* Para atulizar a nova posição de cada pixel, quando este for criado para o tabuleiro,
   segundo o seu tamanho importado de "displayRaster.js" */
  pixel.position.x = x + 0.5;
  pixel.position.y = y + 0.5;
  pixel.position.z = 0;

  return pixel;
}

export { createPixel };