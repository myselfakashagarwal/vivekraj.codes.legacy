import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

//constants 


//contants 
const sizes = { width: window.innerWidth,height: window.innerHeight}
var device;
if (window.device.mobile()) { device = "mobile";} 
else if (window.device.desktop()) { device = "desktop"; } 
else { device = "tablet"; } 

// Canvas
const canvas = document.querySelector('canvas.webgl');canvas.style.maxWidth = window.innerWidth+'px';canvas.style.maxHeight = window.innerHeight+'px'

// Scene
const scene = new THREE.Scene()

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000000)
camera.position.set(0,0,0.51)
camera.rotation.set(0,Math.PI,0)
camera.scale.set(1,1,1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.maxDistance = 6
controls.minPolarAngle = Math.PI / 2; // Minimum angle (straight up)
controls.maxPolarAngle = Math.PI / 2; // Maximum angle (straight down)
controls.minAzimuthAngle = -Math.PI / 2; // Don't let the camera go below the ground

////////////////////////////////////////////////3d stuf`///////////////////////////////////////////////

const gltf_loader=new GLTFLoader()
let model;
gltf_loader.load('./model/scene.gltf',(gltf)=>{ model=gltf.scene;model.scale.set(4,4,4);model.position.set(0,-7,0);scene.add(model);model.rotation.y = Math.PI+0.5;})    
const ambientLight = new THREE.AmbientLight('purple', 1)
scene.add(ambientLight)

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Render and animation
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()

window.addEventListener('mousemove',()=>{
    model.rotation.y = (event.clientX - (window.innerWidth/2))/200
})

//////////////////////////////////////////////// content  ///////////////////////////////////////////////////////////



/*
   homeDiv
*/

const homeDiv = document.getElementById('homeDiv')
const homeHeading = document.getElementById('homeHeading')

homeDiv.style.maxWidth = window.innerWidth+'px'
homeDiv.style.maxHeight = window.innerHeight+'px'

if(device == "desktop")
{
    homeHeading.style.fontSize = '150px' // else the font size will be 80px via css with same padding of 20px
}
