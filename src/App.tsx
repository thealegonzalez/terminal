import { createEffect, onCleanup } from 'solid-js'
import './App.css'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import {PerspectiveCamera, Scene} from 'three';
import Terminal from './Terminal';
import { render } from 'solid-js/web'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Cpanel from './Cpanel';

const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

const scene = new Scene();

var controls:OrbitControls;

const renderer = new CSS3DRenderer();

function animate() {

				requestAnimationFrame( animate );

				renderer.render( scene, camera );

        controls.update()
			}


      function resize(){
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      var dampingTemp = 0;

            function pointermove(e:MouseEvent){
              e;
              clearInterval(dampingTemp);
              dampingTemp = setTimeout(() => {
              }, 333);
            }


function App() {

createEffect(() => {

  window.addEventListener('resize', resize)

  window.addEventListener('mousemove', pointermove)

  const terminal = document.createElement( 'div' );
		terminal.innerHTML = `<div id="terminalDisplay"></div>` 
		const terminalObject = new CSS3DObject( terminal );
    terminalObject.position.y = 0
    terminalObject.position.z = 900
    terminalObject.scale.set(1,1,1)
		scene.add( terminalObject );

    const controlPanel = document.createElement( 'div' );
		controlPanel.innerHTML = `<div id="cPanel"></div>` 
		const controlPanelObject = new CSS3DObject( controlPanel );
    controlPanelObject.position.y = 0
    controlPanelObject.position.x = 700
    controlPanelObject.rotation.y = -Math.PI/-4
    controlPanelObject.position.z = 670
    controlPanelObject.scale.set(1,1,1)
		scene.add( controlPanelObject );


    const terminalBackg = document.createElement( 'div' );
		terminalBackg.innerHTML = `<div style="height: 400px;border-radius: 15px 0 15px 0;width: 40rem;background-color:black;"></div>` 
		const terminalBackgObject = new CSS3DObject( terminalBackg );
    terminalBackgObject.position.y = 0
    terminalBackgObject.position.z = 850
    terminalBackgObject.scale.set(1,1,1)
		scene.add( terminalBackgObject );


    

  
    const songs = [`https://embed.music.apple.com/us/song/tennis-court/1440818652`, `https://embed.music.apple.com/us/song/would-you-rather/1256607817`, `https://embed.music.apple.com/us/song/oblivion/499875050`]

 const embedSong = document.createElement( 'div' );
		embedSong.innerHTML = `<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="transition: transform 0.3s;width:100%;max-width:660px;overflow:hidden;border-radius:10px;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="${songs[Math.floor(Math.random()*songs.length)]}"></iframe>` 
		const embedSongObject= new CSS3DObject( embedSong );
    embedSongObject.scale.set(1,1,1)
    embedSongObject.position.x = -600 
    embedSongObject.position.z = 700 
    embedSongObject.position.y = 0
    embedSongObject.rotation.y = -Math.PI/4
		scene.add( embedSongObject );

   

  const terminalContainer = document.getElementById('terminalContainer')
  if(terminalContainer){




    controls = new OrbitControls( camera, terminalContainer);
    controls.enableDamping = true
    controls.dampingFactor = 0.03
    controls.autoRotate = true
    controls.autoRotateSpeed = 7


  renderer.setSize( window.innerWidth, window.innerHeight );
terminalContainer.appendChild( renderer.domElement );
console.log('rendered')  
  camera.position.z = 1500
  camera.position.y = 200
  animate()
  setTimeout(()=>{
    const terminalDisplay = document.getElementById('terminalDisplay')
    const cPanelElement = document.getElementById('cPanel')
    controls.autoRotateSpeed = -7
  render(() => <Terminal/>, terminalDisplay!)
  render(() => <Cpanel/>, cPanelElement!)


setTimeout(()=>{
    controls.autoRotateSpeed = 0
  }, 900)

  }, 777)
  
}

  
})




onCleanup(() => {
  window.removeEventListener('mousemove', pointermove)
  window.removeEventListener('resize', resize)
    console.log('unmounted')
  });

  





  return (
      <div style={{height: '100vh',width: '100vw', display: 'flex', "justify-content":'center'}}>
       
    <div id="terminalContainer" style={{height:'100vh', width: '100vw', "background-color":'white'}}></div>
  </div>
  )
}

export default App
