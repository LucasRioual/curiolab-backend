import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const textureLoader = new THREE.TextureLoader();
const alphaMap = textureLoader.load("/Ressource/alphamap.png");


var Container = document.getElementById('objetContainer');

var ContainerWidth = document.getElementById('objetContainer').offsetWidth;
var ContainerHeight = document.getElementById('objetContainer').offsetHeight;

const count = 500;
const distance = 3;

const scene = new THREE.Scene();




const camera = new THREE.PerspectiveCamera( 60, ContainerWidth / ContainerHeight, 0.01, 1000 );

camera.position.z = 3;



const points = new Float32Array(count *3);
for(let i=0;i< points.length; i++){
    points[i] = THREE.MathUtils.randFloatSpread(distance*2);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(points,3));

const pointsMaterial = new THREE.PointsMaterial({ alphaTest:0.1, color: 0xffffff, size:0.03, alphaMap:alphaMap, transparent: true});


const pointsObject = new THREE.Points(geometry,pointsMaterial);
const group = new THREE.Group();
group.add(pointsObject);

scene.add(group);

const light = new THREE.AmbientLight( 0xFFFFF ); // soft white light
scene.add( light );

const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(0, 0, 2) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

let object;

const loader = new GLTFLoader();

loader.load( 'Ressource/wood.glb', function ( gltf ) {object = gltf.scene; scene.add( gltf.scene ); object.position.y=-0.15})




const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(ContainerWidth,ContainerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
Container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

function animation(){
    group.rotateY(0.0002 * Math.PI);
    group.rotateZ(0.0002 * Math.PI);
    group.rotateX(0.0002 * Math.PI);
    renderer.render( scene, camera );
    controls.update();
    requestAnimationFrame(animation);

}

animation();









