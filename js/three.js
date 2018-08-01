var scene = new THREE.Scene();
var camera, controls;

init();
animate();

function init(){
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 500;
  
  controls = new THREE.TrackballControls(camera);
  controls.addEventListener('change', render);
}

var canvas = document.getElementById("canvasOne");
var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setClearColor(0x0000ff);

var geometry = new THREE.CubeGeometry(35, 35, 35);
var material = new THREE.MeshPhongMaterial( { color: 0x0000ef, flatShading: true, emissive: 0x2288cf, emissiveIntensity: 0.2 } );
for ( var i = 0; i < 1000; i ++ ) {
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = ( Math.random() - 0.5 ) * 2000;
  mesh.position.y = ( Math.random() - 0.5 ) * 2000;
  mesh.position.z = ( Math.random() - 0.5 ) * 2000;
  mesh.updateMatrix();
  mesh.matrixAutoUpdate = false;
  scene.add( mesh );
}


var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );
				var light = new THREE.DirectionalLight( 0x002288 );
				light.position.set( -1, -1, -1 );
				scene.add( light );
				var light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );


camera.position.z = 1;

function resize() {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();    
  }
}

function animate(){
  requestAnimationFrame(animate);
  controls.update();
}

function render() {
  resize();
  renderer.render(scene, camera);
}
render();
