//==========================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : testeLineMP.mjs
// Descrição    : E FOLIO A - Computação Gráfica - para testar e criar 
//                diferentes pontos usados pela função lineMP, para testes
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioA
//                após o dia 23 de Novembro de 2022
console.log("Check oppening file: testLineMP.mjs");
//==========================================================================

/* Para que a função seja utilizada e o resultado vísivel em "DevTools" é necesário colar a seguinte linha em index.html, e retirar modo comentário */
// <!--<script type="module" src="./src/js/testeLineMP.mjs"></script>-->


import lineMP from "../../lineMP.mjs";

let P={ x: 0, y: 0 }; let Q={ x: 3, y: 1 };
P.x=Math.floor(Math.random() * 10);
P.y=Math.floor(Math.random() * 10);
Q.x=Math.floor(Math.random() * 10);
Q.y=Math.floor(Math.random() * 10);

/* Mesmo que o ponto original venha do ficheiro inicial ou de deteção da scene, estes x, e y serão novamente radomizados */
console.log("Ponto P = {"+P.x+","+P.y+"}; Ponto Q ={"+Q.x+","+Q.y+"}");

let R = lineMP(P,Q);
console.log(R);
