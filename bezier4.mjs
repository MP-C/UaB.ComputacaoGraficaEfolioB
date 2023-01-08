//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : bezier4.mjs
// Descrição    : E FOLIO B - Computação Gráfica - para calcular a curva
//                segundo a função dada no enunciado para Bézier quártica
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: bezier4.mjs");
//============================================================================

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

/* Implementação do algoritmo de Bezier4 */
function bezier4({c0,c1,c2,c3,c4,t}){              /* Para respeitar o formato : {c0:Vector3, c1: Vector3, c2:Vector3, c3:Vector3, c4:Vector3, t:float} */
    
    let output = new THREE.Vector3();
    output.x=calcPoli(c0.x,c1.x,c2.x,c3.x,c4.x,t); /* Para preencher a coordenada x da curva no instante t */
    output.y=calcPoli(c0.y,c1.y,c2.y,c3.y,c4.y,t); /* Para preencher a coordenada y da curva no instante t */
    output.z=calcPoli(c0.z,c1.z,c2.z,c3.z,c4.z,t); /* Para preencher a coordenada z da curva no instante t */

    return output;                                 /* Para retornar o ponto no instante t no THREE.Vector3 */
}

/* Função para resolver o polinomio da curva f(t)  */
function calcPoli (c0,c1,c2,c3,c4,t){
    let calcC0 = Math.pow((1-t),4)*c0;                  /* Função para calcular coordenada de C0: ((1-t)^4)*(componente (x,y,z) de c0) */
    let calcC1 = 4*Math.pow((1-t),3)*t*c1;              /* Função para calcular coordenada de C1: (4(1-t)^3)*t*(componente (x,y,z) de c1) */
    let calcC2 = 6*Math.pow((1-t),2)*Math.pow(t,2)*c2;  /* Função para calcular coordenada de C2: (6*(1-t)^2)*(t^2)*(componente (x,y,z) de c2)  */
    let calcC3 = 4*(1-t)*Math.pow(t,3)*c3;              /* Função para calcular coordenada de C3: (4*(1-t)*(t^3)*(componente (x,y,z) de c3)  */
    let calcC4 = Math.pow(t,4)*c4;                      /* Função para calcular coordenada de C4: t^3*(componente (x,y,z) de c4) */

    return calcC0 + calcC1 + calcC2 + calcC3 + calcC4;
}

export {bezier4}
