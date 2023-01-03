//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : lineMP.mjs
// Descrição    : E FOLIO A - Computação Gráfica - para calcular os pontos 
//                da reta
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioA
//                após o dia 23 de Novembro de 2022
console.log("Check oppening file: lineMP.mjs");
//============================================================================


/* Implementação do algoritmo do ponto médio de linhas */
function lineMP(dotA = {x: x, y : y}, dotB = {x : x, y : y}) {  
    console.log("Coordenadas ponto inicial P : ", dotA);
    console.log("Coordenadas ponto final Q : ", dotB );
    
    let outputAllPoints = [];/* Para guardar os pontos da reta que serão, posteriomente, imprimidos */
    let pointP = dotA;  /* Para guardar o ponto de início */
    let pointQ = dotB; /* Para guardar o último ponto */

    /* Condição necessária para garantir o cálculo em todos pontos estão nos quadrantes do gráfico 
    em que se inverte o sinal dos pontos duas vezes: 1) para a fórmula; 2) para colocar o ponto */
    let dX = dotB.x - dotA.x;   /* Valor de delta para XX */
    let dY = dotB.y - dotA.y;   /* Valor de delta para YY */
    /* Para validar os valores necessários para cada ponto da linha */
    console.log("ponto P = ",dotA, "; ponto Q = ",dotB, "; dX = ", dX, "; dY = ", dY);
    
    /* As variáveis pointP, pointQ, servem de controlo para validar condições de calculo */
    if ( Math.abs(dX) > Math.abs(dY)) {    /* Se a condição para o modulo de deltas for válida, então, a reta m=dY/dX tem valor inferior a 1 => valida pontos nos quadrantes (x,y), (-x,y), (-x,-y), (x,-y) */
        if (dotA.x > dotB.x) {
            pointP = dotB;
            pointQ = dotA;
        }
        /* Calculos para obter variáveis de controlo : Delta X, Delta Y, 
        e a diferença entre Deltas X e Y */
        outputAllPoints = controlQuadrant(pointP, pointQ, true);

    } else { /* Se a condição para o modulo de deltas for válida, então, a reta m=dY/dX tem valor superior a 1 => valida quadrantes restantes (y,x), (y,-x), (-y,-x), (-y,x,) */          
        if (dotA.y > dotB.y) {            
            pointP = dotB;
            pointQ = dotA;
        }
        /* Calculos para obter variáveis de controlo : Delta X, Delta Y, 
        e a diferença entre Deltas X e Y */
        outputAllPoints = controlQuadrant(pointP, pointQ);
        
    }
    //console.log("STOP: último ponto obtido (x, y) = (",x * variaX,",",y * variaY,") é superior ao ponto Q selecionado : (", dotB.x,",",  dotB.y, ");");
    console.table(outputAllPoints); /* Para imprimir os pontos todos de forma de tabela */
    return outputAllPoints;
}


/* Para assegurar que os pontos estão nos quadrantes certos, caso contrário, colocar os sinais certos */
function controlQuadrant(dotA, dotB, validPoint = false) { 
    /* Quando a validação de ponto é falsa, define-se se y incrementa ou decrementa (direção do y)
    Quando é verdadeira, estáse a definir se é o valor de x que incrementa ou decrementa (direção do x) */

    let points = [] /* Para guardar os pontos validados */
    let d;         /* Para guardar os pontos validados */
    let start;
    let end;
    let startVariable;

    /* Troca de sinais no caso dos pontos se encontarem em outros quadrantes,
    para que o calculo continue a ser possivel ao longo de quadrantes diferentes */
    let deltaX = dotB.x - dotA.x;   /* Para se controlar o delta de x */
    let deltaY = dotB.y - dotA.y;   /* Para se controlar o delta de y */
    let m = 1;                      /* Variação do declive de deltas XX e YY, que é parametro de decisão */

    if ( validPoint ) {
        if ( deltaY < 0 ) { /* Para aplicar simetria no eixo do y quando dY seja negativo */
            m = -1;         
            deltaY = -deltaY;
        }

        d = 2 * deltaY - deltaX; /* Serve como fator de decisão inicial */
        start = dotA.x; /* Trocar sinais para incrementar y */
        end = dotB.x; 
        startVariable = dotA.y;
        console.log("Ponto a registar : ", startVariable); /* Para inicializar o ponto seguinte na nova posição y */
    } else {
        if (deltaX < 0) {   /* Para aplicar simetria no eixo do x quando dX seja negativo */
            m = -1;       
            deltaX = -deltaX;    
        }
        d = 2 * deltaX - deltaY; /* Serve como fator de decisão inicial */
        start = dotA.y;           /* Trocar sinais para incrementar x */
        end = dotB.y;       
        startVariable = dotA.x;  
        console.log("Ponto a registar : ", startVariable); /* Para inicializar o ponto seguinte na nova posição y */
    }

    /* Segundo a formula matemática do ponto médio */ 
    for (let axis = start; axis <= end; axis++) {  /* É necessário controlar a forma como xx, ou yy se desenvolve, segundo   */
        if ( validPoint ) {
            points.push({ x: axis, y: startVariable }); /* Para guardar pontos para a reta em x */
        } else {
            points.push({ x: startVariable, y: axis }); /* Para guardar pontos para a reta em y */
        }
        if (d > 0) {            
            startVariable  += m;       
            if (validPoint) {
                d  += (2 * (deltaY - deltaX)); /* Consoante os valores obtidos das variações deltaX e deltaY, d será afetatada como se de uma progressão se tratasse */
            } else {
                d  += 2 * (deltaX - deltaY); /* Consoante os valores obtidos das variações deltaX e deltaY, d será afetatada como se de uma progressão se tratasse */
            }
        } else {              
            d  += 2 * (validPoint ? deltaY : deltaX);  /* Consoante os valores obtidos a variável d, terá valor positivo ou negativo, e será afetado na proxima leitura */
        }
    }
    return points;
}

export {lineMP}
