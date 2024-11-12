// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let geometries = [];
let geoCount = 40;
let sceneContainer = document.querySelector("#main-scene");

function init() {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // set size to the size of the div
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement); // append to specific element
    renderer.setClearColor(new THREE.Color('#e3e6e0'), 1);

    const light = new THREE.DirectionalLight(0xffffff, 3); // args white light, strength of light
    light.position.set(-3, 4, 5);
    scene.add(light);

    // add directional light helper
    // const helper = new THREE.DirectionalLightHelper(light, 5);
    // scene.add(helper); // comment out to hide helper

    // add-ons
    // const controls = new OrbitControls(camera, renderer.domElement);

    let geoY = 5;
    for (let i=0; i<geoCount; i++) {
        let geoX = 0;
        // alternate position of every three geometries
        if (i % 3 == 0) {
            geoX = 0;
            geoY = 10 - i;
        } else if (i % 3 == 1) {
            geoX = -5;
            geoY = 7 - i;
        } else {
            geoX = 5;
            geoY = 7 - i;
        }
        createGeometry(geometries[i], geoX, geoY);
    }

}

function animate() {
    requestAnimationFrame(animate);

    // move camera with scroll
    let scrollY = window.scrollY;
    scrollY = window.scrollY / document.body.scrollHeight * 100; /* to get the percent scrolled */
    // console.log(scrollY);
    camera.position.y = -scrollY * 0.1; /* - to move camera down, + to move camera up, * by larger # to move camera faster */

    renderer.render(scene, camera);
}

/* Create and add geometry objects */
function createGeometry(obj, x, y) {
    const geometry = new THREE.OctahedronGeometry(0.5, 0);
    const material = new THREE.MeshPhysicalMaterial( {
        color: "#3f7b9d"
    });
    obj = new THREE.Mesh(geometry, material);
    scene.add(obj);
    obj.position.x = x;
    obj.position.y = y;
    obj.rotation.x = Math.random(0, 1);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();