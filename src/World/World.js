//============================================================================
// Nome         : Mário Pedro Carvalho
// Número aluno : 2000563
// Curso        : Licenciatura em Engenharia Informática
// Ficheiro     : World.js
// Descrição    : E Fólio-B - Computação Gráfica - ficheiro que reune todas as
//                funçôes necessárias para que se torne possível tratar cada
//                parte e cada função, de forma individualizada, e mais tarde
//                importada sem afetar um projeto global. Responsável por 
//                apresentar o resultado final
// Codigo       : Este código ficará publicamente disponivel no repositório
//                GitHub https://github.com/MP-C/UaB.ComputacaoGraficaEfolioB
//                após o dia 9 de Janeiro de 2023
console.log("Check oppening file: World.js");
//============================================================================

/* Ficheiros importandos de ./components */
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDisplayRaster } from './components/displayRaster.js'; /* Para criar tabuleiro */

/* Ficheiros importandos de ./systems */
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

/* Ficheiros importandos em CDN segundo requisitos de avaliação */
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';

/* Variáveis que são específicas os modulos específicos, para que não sejam acedidos 
fora do módulo correspondente */
let camera;
let scene;
let renderer;
let controls;

/* Para construir um conteúdo único para os objeto criado */
class World {
  constructor(container) {
    /* Para reinicializar todas as partes do objetos criados anteriormente dentro do ficheiro World */
    renderer = createRenderer();
    scene = createScene();
    camera = createCamera();
    controls = new OrbitControls(camera, renderer.domElement);
    
    /* Para criar o tabuleiro e este se tornar visivel */
    let displayRaster = new createDisplayRaster(scene, camera, renderer, controls);
    
    /* Para atualizar o container do index.html em main.js a partir da nova função criada em world */
    container.append(renderer.domElement);
    
    /* Para redemensionar cada função a cada momento que ocora alteração do global */
    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    controls.addEventListener("change", () => renderer.render(scene, camera));
    renderer.render(scene, camera);
  }

}

export { World };
