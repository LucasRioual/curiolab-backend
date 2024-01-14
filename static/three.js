 import * as THREE from 'three';
 import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';





 var Container = document.getElementById('objetContainer');

 var ContainerWidth = document.getElementById('objetContainer').offsetWidth;
 var ContainerHeight = document.getElementById('objetContainer').offsetHeight;

 const scene = new THREE.Scene();


 const camera = new THREE.PerspectiveCamera( 60, ContainerWidth / ContainerHeight, 0.01, 1000 );

 const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
 renderer.setSize(ContainerWidth,ContainerHeight);

 renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
 Container.appendChild(renderer.domElement);



camera.position.z = 3;
camera.position.y = 0.2;
camera.position.x = 0.05;


const light = new THREE.AmbientLight( 0xFFFFF ); // soft white light
scene.add( light );

const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(0, 0, 2) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

let object;

const loader = new GLTFLoader();

loader.load( 'Ressource/wood.glb', function ( gltf ) {object = gltf.scene; scene.add( gltf.scene ); animate();})





function animate() {
	object.rotation.y += 0.002;
	//object.rotation.y =4;
	renderer.render( scene, camera );
	
	requestAnimationFrame( animate );
}



function onWindowResize() {
	const newContainerWidth = Container.offsetWidth;
	const newContainerHeight = Container.offsetHeight;
  
	camera.aspect = newContainerWidth / newContainerHeight;
	camera.updateProjectionMatrix();
  
	renderer.setSize(newContainerWidth, newContainerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }
  
window.addEventListener('resize', onWindowResize);

