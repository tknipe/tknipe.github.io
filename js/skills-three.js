var scene2 = new THREE.Scene();
var camera2, controls2;

init2();
animate2();

function init2(){
  camera2 = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 1, 1000);
  camera2.position.z = 500;
  
  controls2 = new THREE.TrackballControls(camera2);
  controls2.addEventListener('change', render2);
}

var canvas2 = document.getElementById("canvasTwo");
var renderer2 = new THREE.WebGLRenderer({canvas2: canvas2, antialias: true});
renderer2.setClearColor(0x0000ff);

var geometry2 = new THREE.CubeGeometry(35, 35, 35);
var material2 = new THREE.MeshPhongMaterial( { color: 0x0000ef, flatShading: true, emissive: 0x2288cf, emissiveIntensity: 0.2 } );
for ( var i = 0; i < 1000; i ++ ) {
  var mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.x = ( Math.random() - 0.5 ) * 2000;
  mesh2.position.y = ( Math.random() - 0.5 ) * 2000;
  mesh2.position.z = ( Math.random() - 0.5 ) * 2000;
  mesh2.updateMatrix();
  mesh2.matrixAutoUpdate = false;
  scene2.add( mesh2 );
}


var light2 = new THREE.DirectionalLight( 0xffffff );
				light2.position.set( 1, 1, 1 );
				scene2.add( light );
				var light2 = new THREE.DirectionalLight( 0x002288 );
				light2.position.set( -1, -1, -1 );
				scene2.add( light );
				var light2 = new THREE.AmbientLight( 0x222222 );
        scene2.add( light2 );


camera2.position.z = 1;

function resize() {
  var width2 = canvas2.clientWidth;
  var height2 = canvas2.clientHeight;
  if (width2 != canvas2.width || height2 != canvas2.height) {
    renderer2.setSize(width2, height2, false);
    camera2.aspect = width2 / height2;
    camera2.updateProjectionMatrix();    
  }
}

function animate2(){
  requestAnimationFrame(animate2);
  controls2.update();
}

function render2() {
  resize2();
  renderer2.render(scene2, camera2);
}
render2();
