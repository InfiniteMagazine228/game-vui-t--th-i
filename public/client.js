const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10,10,10);
scene.add(light);

const loader = new THREE.GLTFLoader();
let car;

// Load track
loader.load('/assets/track.glb', function(gltf){
  const track = gltf.scene;
  track.scale.set(1,1,1);
  scene.add(track);
});

// Load Porsche
loader.load('/assets/porsche.glb', function(gltf){
  car = gltf.scene;
  car.scale.set(0.5,0.5,0.5);
  car.position.set(0,0,0);
  scene.add(car);
});

camera.position.set(0,2,5);

// PC controls
document.addEventListener('keydown', e=>{
  if(!car) return;
  if(e.key==='ArrowUp') car.position.z -= 0.1;
  if(e.key==='ArrowLeft') car.position.x -= 0.1;
  if(e.key==='ArrowRight') car.position.x += 0.1;
});

// Mobile controls
document.getElementById('up').addEventListener('touchstart', ()=>{ if(car) car.position.z -= 0.1; });
document.getElementById('left').addEventListener('touchstart', ()=>{ if(car) car.position.x -= 0.1; });
document.getElementById('right').addEventListener('touchstart', ()=>{ if(car) car.position.x += 0.1; });

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
