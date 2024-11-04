// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let torus, particlesMesh;

function init() {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'), // entire scene inside the canvas and want to render the canvas
    })

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color('#21282a'), 1);

    // add-ons
    const controls = new OrbitControls(camera, renderer.domElement);

    // torus geometry
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 500, 40, 9, 3); //new THREE.TorusGeometry(.7, .2, 16, 100);
    const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: '#a4ddeb'
    });

    torus = new THREE.Points(geometry, material);
    scene.add(torus);
    torus.position.z = -5;
    // torus.position.x = -10;

    // particles geometry
    const particlesGeometry = new THREE.BufferGeometry;
    const snowTexture = new THREE.TextureLoader().load('textures/snow.png');
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        map: snowTexture,
        transparent: true,
        color: '#bbcff0'
        // blending: THREE.AdditiveBlending
    });
    const particlesCt = 50000;
    const posArray = new Float32Array(particlesCt * 3) // provide xyz coordinates for each particles
    // xyz, xyz, xyz, ...
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

document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;
// particle movement speeds up according to mouse speed
function animateParticles() {
    // particlesMesh.rotation.y -= 0.001;
    calcMouseSpeed();
    mouseY = event.clientY;
    mouseX = event.clientX;
    particlesMesh.rotation.x += (-0.001 - speed * 0.0001); // rotate so particles look like they move upward when mouse moves
    console.log(speed);
}

var prevEvent, currentEvent;
var prevSpeed = 0;
var speed = 0;
// get mouse speed
// referenced from CodePen: https://codepen.io/zFunx/pen/WjVzWo
function calcMouseSpeed() {
    currentEvent = event;
    if (prevEvent && currentEvent) {
        var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
        var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
        var movement = Math.sqrt(movementX * movementX + movementY * movementY);
        speed = 10 * movement;//current speed
        console.log('in if stmt ' + speed)
    }
    prevEvent = currentEvent;
    prevSpeed = speed;
    console.log(speed);
}

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.y += 0.01;
    // particlesMesh.rotation.y += 0.0007;
    //if (speed <= 0) {
    particlesMesh.rotation.x += 0.0007; // particles look like they fall down
    //}

    if (mouseX > 0) {
        // particlesMesh.rotation.x = -mouseY * 0.0008;
        // particlesMesh.rotation.y = mouseX * 0.0008;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();