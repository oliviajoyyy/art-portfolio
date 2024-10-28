// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models


// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

let scene, camera, renderer;
let cube, torus, torusKnot;

function init() {
    scene = new THREE.Scene();
    
    // create light to see 3D model
    const light = new THREE.DirectionalLight(0xffffff, 7); // args white light, strength of light
    light.position.set(3, 4, 5);
    scene.add(light);

    // add directional light helper
    const helper = new THREE.DirectionalLightHelper(light, 5);
    //scene.add(helper); // comment out to hide helper

    // create light to see 3D model
    const lightLeft = new THREE.DirectionalLight(0x0000ff, 7); // args white light, strength of light
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    // add directional light helper
    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    //scene.add(helperLeft); // comment out to hide helper

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer( {antialias: true, alpha: true }); // add { alpha: true } to make background transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("#three-container").appendChild(renderer.domElement);
    
    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    // const controls = new OrbitControls(camera, renderer.domElement);
    // const loader = new GLTFLoader(); // to load 3d models
    
    /* Create box geometry */
    createBox(0, 0, 'textures/checker.jpg');

    /* Add torus knot geometry */
    createTorusKnot(-10, -10, 'textures/grasslight-big.jpg');

    /* Add torus geometry */
    createTorus(10, -20, 'textures/ice-texture.jpg');

    camera.position.z = 10;
}

// rendering the scene
function animate() {
    requestAnimationFrame(animate);

    // move camera with scroll
    let scrollY = window.scrollY;
    scrollY = window.scrollY / document.body.scrollHeight *100; /* to get the percent scrolled */
    // console.log(scrollY);
    camera.position.y = -scrollY; /* - to move camera down, + to move camera up, * by larger # to move camera faster */

    // animating the cube
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.01;

    // animating the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    // animating the torus knot
    torusKnot.rotation.x += 0.03;
    torusKnot.rotation.y += 0.02;

    renderer.render(scene, camera);
}

 /* Add box geometry */
 function createBox(x, y, t) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const texture = new THREE.TextureLoader().load(t);
    const material = new THREE.MeshStandardMaterial( { map: texture });
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
}

 /* Add torus geometry */
function createTorus(x, y, t) {
    const geometryTorus = new THREE.TorusGeometry(1.3, 1, 4, 100); 
    const textureTorus = new THREE.TextureLoader().load(t);
    const materialTorus = new THREE.MeshBasicMaterial( { map: textureTorus });
    torus = new THREE.Mesh(geometryTorus, materialTorus);
    scene.add(torus);
    torus.position.x = x;
    torus.position.y = y;
}

 /* Add torus knot geometry */
function createTorusKnot(x, y, t) {
    const geometryTorusKnot = new THREE.TorusKnotGeometry(2, 0.5, 50, 4, 9, 3);
    const textureTorusKnot = new THREE.TextureLoader().load(t);
    const materialTorusKnot = new THREE.MeshBasicMaterial( { map: textureTorusKnot });
    torusKnot = new THREE.Mesh(geometryTorusKnot, materialTorusKnot);
    scene.add(torusKnot);
    torusKnot.position.x = x;
    torusKnot.position.y = y;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
