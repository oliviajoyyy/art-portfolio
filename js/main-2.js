// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let cube, torus, torusKnot, particlesMesh;
let geometries = [];
let geoCount = 10;
let sceneContainer = document.querySelector("#main-scene");

// ------------ Animation for showing name at the top ------------
// const border = CSSRulePlugin.getRule('.content:before');
// const h1 = document.querySelector('h1');
// const p = document.querySelector('p');
// const tl = gsap.timeline();

// tl.from(border, { delay: 0.5, duration: 4, cssRule: { scaleX: 0 } });
// tl.to(h1, { duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: '30px' }, "-=3");
// tl.to(p, { duration: 4, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: '30px' }, "-=2");
// ---------------------------------------------------------------


function init() {
    scene = new THREE.Scene();

    // camera
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    // renderer
    // renderer = new THREE.WebGLRenderer({
    //     canvas: document.querySelector('#bg'), // entire scene inside the canvas and want to render the canvas
    // })

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // set size to the size of the div
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement); // append to specific element
    renderer.setClearColor(new THREE.Color('#e3e6e0'), 1);

    // add-ons
    // const controls = new OrbitControls(camera, renderer.domElement);

    let geoY = 5;
    for (let i=0; i<geoCount; i++) {
        geoY = -(i*5) + 5;
        createGeometry(geometries[i], 0, geoY);
    }

    /* Create box geometry */
    // createBox(0, 5, 'textures/checker.jpg');
    // /* Add torus knot geometry */
    // createTorusKnot(-10, -10, 'textures/grasslight-big.jpg');
    // /* Add torus geometry */
    // createTorus(10, -20, 'textures/ice-texture.jpg');

    // // torus geometry
    // const geometry = new THREE.TorusKnotGeometry(2, 0.5, 500, 40, 9, 3); //new THREE.TorusGeometry(.7, .2, 16, 100);
    // const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    // const material = new THREE.PointsMaterial({
    //     size: 0.005,
    //     color: '#a4ddeb'
    // });

    // torus = new THREE.Points(geometry, material);
    // scene.add(torus);
    // torus.position.z = -5;
    // // torus.position.x = -10;

    // // particles geometry
    // const particlesGeometry = new THREE.BufferGeometry;
    // const snowTexture = new THREE.TextureLoader().load('textures/snow.png');
    // const particlesMaterial = new THREE.PointsMaterial({
    //     size: 0.005,
    //     map: snowTexture,
    //     transparent: true,
    //     color: '#bbcff0'
    //     // blending: THREE.AdditiveBlending
    // });
    // const particlesCt = 50000;
    // const posArray = new Float32Array(particlesCt * 3) // provide xyz coordinates for each particles
    // // xyz, xyz, xyz, ...
    // for (let i = 0; i < particlesCt * 3; i++) {
    //     // posArray[i] = Math.random() - 0.5; // random position for each particle
    //     // posArray[i] = (Math.random() - 0.5) * 100;
    //     posArray[i] = (Math.random() - 0.5) * (Math.random() * 10); // more particles on x and y
    // }
    // // assigning random vales to each particles
    // particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    // particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    // scene.add(particlesMesh);
}

//document.addEventListener('mousemove', animateParticles);

// let mouseX = 0;
// let mouseY = 0;
// // particle movement speeds up according to mouse speed
// function animateParticles() {
//     // particlesMesh.rotation.y -= 0.001;
//     calcMouseSpeed();
//     mouseY = event.clientY;
//     mouseX = event.clientX;
//     particlesMesh.rotation.x += (-0.001 - speed * 0.0001); // rotate so particles look like they move upward when mouse moves
//     console.log(speed);
// }

// var prevEvent, currentEvent;
// var prevSpeed = 0;
// var speed = 0;
// // get mouse speed
// // referenced from CodePen: https://codepen.io/zFunx/pen/WjVzWo
// function calcMouseSpeed() {
//     currentEvent = event;
//     if (prevEvent && currentEvent) {
//         var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
//         var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
//         var movement = Math.sqrt(movementX * movementX + movementY * movementY);
//         speed = 10 * movement;//current speed
//         console.log('in if stmt ' + speed)
//     }
//     prevEvent = currentEvent;
//     prevSpeed = speed;
//     console.log(speed);
// }

function animate() {
    requestAnimationFrame(animate);

    // move camera with scroll
    let scrollY = window.scrollY;
    scrollY = window.scrollY / document.body.scrollHeight * 100; /* to get the percent scrolled */
    // console.log(scrollY);
    camera.position.y = -scrollY * 0.3; /* - to move camera down, + to move camera up, * by larger # to move camera faster */
    // animating the cube
    // cube.rotation.x += 0.005;
    // cube.rotation.y += 0.001;
    // // animating the torus
    // torus.rotation.x += 0.001;
    // torus.rotation.y += 0.002;
    // // animating the torus knot
    // torusKnot.rotation.x += 0.003;
    // torusKnot.rotation.y += 0.002;

    // torus.rotation.y += 0.01;
    // // particlesMesh.rotation.y += 0.0007;
    // //if (speed <= 0) {
    // particlesMesh.rotation.x += 0.0007; // particles look like they fall down
    // //}

    // if (mouseX > 0) {
    //     // particlesMesh.rotation.x = -mouseY * 0.0008;
    //     // particlesMesh.rotation.y = mouseX * 0.0008;
    // }

    renderer.render(scene, camera);
}

function createGeometry(obj, x, y) {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.LineBasicMaterial( {
        color: "#21282a",
        linewidth: 2,
    });
    obj = new THREE.Line(geometry, material);
    scene.add(obj);
    obj.position.x = x;
    obj.position.y = y;
    obj.rotation.x = Math.random(0, 1);
}

/* Add box geometry */
function createBox(x, y, t) {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const texture = new THREE.TextureLoader().load(t);
    // const material = new THREE.MeshStandardMaterial( { map: texture });
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    const material = new THREE.LineBasicMaterial( {
        color: "#21282a",
        linewidth: 2,
    });
    cube = new THREE.Line(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
}
 /* Add torus geometry */
function createTorus(x, y, t) {
    const geometryTorus = new THREE.TorusGeometry(1.3, 1, 4, 100); 
    const textureTorus = new THREE.TextureLoader().load(t);
    // const materialTorus = new THREE.MeshBasicMaterial( { map: textureTorus });
    // const materialTorus = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    const material = new THREE.LineBasicMaterial( {
        color: "#21282a",
        linewidth: 1,
    });
    torus = new THREE.Line(geometryTorus, material);
    scene.add(torus);
    torus.position.x = x;
    torus.position.y = y;
}
 /* Add torus knot geometry */
function createTorusKnot(x, y, t) {
    const geometryTorusKnot = new THREE.TorusKnotGeometry(2, 0.5, 50, 4, 9, 3);
    const textureTorusKnot = new THREE.TextureLoader().load(t);
    // const materialTorusKnot = new THREE.MeshBasicMaterial( { map: textureTorusKnot });
    // const materialTorusKnot = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    const material = new THREE.LineBasicMaterial( {
        color: "#21282a",
        linewidth: 1,
    });
    torusKnot = new THREE.Line(geometryTorusKnot, material);
    scene.add(torusKnot);
    torusKnot.position.x = x;
    torusKnot.position.y = y;
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();