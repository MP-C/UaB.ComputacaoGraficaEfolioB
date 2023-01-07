//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : bezier4Curve.js
// Descrição    : E FOLIO B - Computação Gráfica - para calcular a curva
//                segundo a função dada no enunciado para Bézier quártica
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: bezier4Curve.js");
//============================================================================

import { bezier4 } from '../../../bezier4.mjs'
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

class Bezier4Curve extends THREE.Curve {
    constructor(scale = 1, balls) {
        super();
        this.scale = scale;
        this.balls = balls;
    }

    /* Para obter as posições de cada bola em simultâneo, e entrarem com a função polinómio de calculo criado em bezier4.mjs */
    getPoint(t) {
        /* coordenadas das esferas C que passam com o array onde foram construídas => balls */
        let points = { c0 : this.balls[0].position, c1 : this.balls[1].position, c2 : this.balls[2].position, c3 : this.balls[3].position, c4 : this.balls[4].position, t : t };
        return bezier4(points);
    }
}
export { Bezier4Curve }