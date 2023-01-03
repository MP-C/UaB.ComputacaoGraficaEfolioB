//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : main.js
// Descrição    : E FOLIO B- Computação Gráfica - ficheiro que reune todas as
//                funcionalidades existentes na função World necessárias, para 
//                apresnetar o resultado final das condições gráficas do World
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: main.js");
//============================================================================

import { World } from './World/World.js'

function main() {
  /* Para selecionar a tag onde esta parte será apresentada */
  const container = document.querySelector('#scene-container');

  /* Permite criar chamar a função World criada noutro ficheiro */
  const world = new World(container);
  
  /* Para que a variável sofra "actualização" constante em cada nova alteração de forma imediata */
  world.render();
}

main();

