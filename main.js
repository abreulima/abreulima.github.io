import './style.css';

import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    DirectionalLight,
    Mesh,
    Vector2,
    Vector3,
    Quaternion,
    MathUtils,
    PointLight,
    AmbientLight,
    Euler,
    Color,
    Matrix4,
    ArrowHelper,
    GridHelper,
    DirectionalLightHelper,
    Raycaster,
} from 'three';

import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'

/*
import {
    cardRotate,
    cardTranslate
} from '/controller.js'
*/

var card;
var forwardVector;
var currentRotation = 0;


const raycaster = new Raycaster();
const pointer = new Vector2();

const loader = new GLTFLoader();
const scene = new Scene();

const camera = new PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
        );

camera.position.set(0, 0, 10);

const renderer = new WebGLRenderer({
    antialias:true,
    //autoSize: true,
    canvas: document.querySelector("#app"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );


// Arrow Helper
{
    const dir = new Vector3(0, 0, 1);
    const ori = new Vector3(0, 1.5, 1);
    const arrowHelper = new ArrowHelper(dir, ori, 2, 0xff0000);
    scene.add(arrowHelper);
}

// Arrow Helper
{

}

loader.load( 'assets/card.glb', function ( gltf ) {

    const dir = new Vector3(0, 0, 1);
    const ori = new Vector3(0, 1.5, 1);
    const arrowHelper = new ArrowHelper(dir, ori, 2, 0x0000ff);
    
    card = gltf.scene;
    card.add(arrowHelper);

    scene.add(card);
    }, undefined, function ( error ) {
    console.error( error );
} );


// Grip Helper
{
    const size = 10;
    const divisions = 10;
    const gridHelper = new GridHelper( size, divisions );
    //scene.add(gridHelper);
}

// Background Color
{
    scene.background = new Color( 0xffffff );
}

// Ambient Light
{
    const light = new AmbientLight( 0xffffff ); // soft white light
    scene.add( light );
}

// Directional Light
{
    const directionalLight = new DirectionalLight( 0xffffff, 0.2 );
    directionalLight.position.set( 10, 1, 1 );
    scene.add( directionalLight );

    // if debug
    if (false) {
            const helper = new DirectionalLightHelper(directionalLight, 5);
            scene.add(helper);
    }
}



function cardRotate(event) {

    if (!card) return;

    const rotations = 12;
    var angleRotate = Math.PI / rotations;

    //if (currentRotation)
    {
        event.preventDefault();        
        card.rotateY(angleRotate * Math.sign(event.deltaY));

        currentRotation += Math.sign(event.deltaY);
    }





    console.log(currentRotation);

    const euler = new Euler();
    const rotation = euler.setFromQuaternion(card.quaternion);
    //console.log(rotation);
    const radians = rotation.y > 0 ? rotation.y : 2 * Math.PI + rotation.y;


    var degrees = MathUtils.radToDeg(radians);
    degrees = Math.round(degrees);

    //console.log(degrees);

}


function cardTranslate(event) {
    event.preventDefault();

    var mouse = new Vector2();
    const centerScreen = new Vector2(window.innerWidth / 2, window.innerHeight / 2 );
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log(mouse.y);
    if (card) card.rotateY(mouse.y * 0.01);

}

function onPointerMove(event)
{
    var intersects;

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( pointer, camera );


    if (card) 
    {
        intersects = raycaster.intersectObjects( card.children );

        if (intersects.length > 0) {
            //console.log("Inside...");
        }
        else {
            //console.log("Outside...");
        }

    }

}


var c = document.querySelector("#app");

document.addEventListener('mousemove', cardTranslate, {passive: false });
c.addEventListener('wheel', function(event) {cardRotate(event);}, { passive: false });
//document.addEventListener( 'pointermove', function(event) {onPointerMove(event);}, {passive: false} );

//document.addEventListener('resize', onWindowResize, false );


function render() {
    renderer.render( scene, camera );
    requestAnimationFrame(render);

};

render();
