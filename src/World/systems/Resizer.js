//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : Resizer.js
// Descrição    : E Fólio-B - Computação Gráfica - class Resizer.js que projeta
//                a imagem criada para o ecran, que usa a função camâra
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: Resizer.js");
//============================================================================


class Resizer {
  constructor(container, camera, renderer) {
    /* Determina a frequencia com o que aspeto da "Câmara" corresponde às proporções 
    do conteiner, na janela correspondente */
		camera.aspect = container.clientWidth / container.clientHeight;

    /* Actualiza a zona do espaço da função World, quer realmente se torna visível no ecran */
    camera.updateProjectionMatrix();

		/* Para que a imagem devolvida que se tem de corresponder, tenha o mesmo tamanho
    que o container onde este se encontra presente */
    renderer.setSize(container.clientWidth, container.clientHeight);

		/* Para determinar a frequência de actuzalização do pixel das imagens a apresentar
    independentemente do tipo de dispositivo */
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };