// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let torus, particlesMesh;
let sceneContainer = document.querySelector("#scene-container");

// ------------ Animation for showing name at the top ------------
const border = CSSRulePlugin.getRule('.portfolio .content:before');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const tl = gsap.timeline();

tl.from(border, { delay: 0.5, duration: 4, cssRule: { scaleX: 0 } });
tl.to(h1, { duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: '30px' }, "-=3");
tl.to(p, { duration: 4, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: '30px' }, "-=2");
// ---------------------------------------------------------------


function init() {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // set size to the size of the div
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement); // append to specific element
    renderer.setClearColor(new THREE.Color('#21282a'), 1);

    // add-ons
    // const controls = new OrbitControls(camera, renderer.domElement);

    // torus geometry
    const geometry = new THREE.TorusKnotGeometry(2.5, 1, 375, 200, 27, 1); //new THREE.TorusGeometry(.7, .2, 16, 100); 
    const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: '#a4ddeb'
    });

    torus = new THREE.Points(geometry, material);
    scene.add(torus);
    torus.position.z = -5;

    // particles geometry
    const particlesGeometry = new THREE.BufferGeometry;
    const snowTexture = new THREE.TextureLoader().load('textures/snow.png');
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        map: snowTexture,
        transparent: true,
        color: '#bbcff0'
    });
    const particlesCt = 50000;
    const posArray = new Float32Array(particlesCt * 3) // provide xyz coordinates for each particles
    for (let i = 0; i < particlesCt * 3; i++) {
        // posArray[i] = Math.random() - 0.5; // random position for each particle
        // posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 10); // more particles on x and y
    }
    // assigning random vales to each particles
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.y += 0.01;
    particlesMesh.rotation.x += 0.0007; // particles look like they fall down

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();