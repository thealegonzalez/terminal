
import { onCleanup } from 'solid-js'
import './Cpanel.css'
import {state, setState} from './store/store'


function Cpanel() {

onCleanup(() => {
    console.log('unmounted')
  });


  let port;
  let inputRef:HTMLInputElement|undefined;




  return (
    <>

    <div onmouseleave={e => {e.currentTarget.style.filter = 'invert(0)';e.currentTarget.style.borderRadius = '0px'}} onMouseEnter={e => {e.currentTarget.style.filter = 'invert(100)';e.currentTarget.style.borderRadius = '15px'}} style={{"font-weight":700,transition:'0.7s', color:'black',"font-style":"normal", "padding-inline":'15px', height:'175px', width:'17rem', "background-color":'#ffffff', display:'flex', "flex-direction":'column', "justify-content":'space-evenly'}}>
       <div style={{display:'flex', "flex-direction":'row' , "justify-content":'center'}}> <p>Baud rate:</p><input ref={inputRef} onchange={e=>{setState({baudRate: parseInt(e.currentTarget.value)})}} value={state.baudRate} step={1200} style={{outline:'none', width:'33%', "background-color":'transparent', border:'none',"text-align":'center', color:'black'}} type='number'/></div>
    <button onPointerDown={async ()=>{

      if('serial' in navigator){

    try {
    port = await navigator.serial.requestPort();

    await port.open({ baudRate: inputRef?parseInt(inputRef?.value):115200});

      setState({portStatus: true});
      console.log('port set')

  } catch(e){

    console.log('failed ', e)
  
  }
}

    }} style={{"font-weight":100,"justify-self":'center', outline:'none', border:'none',transition: '0.3s',"transform-origin": 'center' }}  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>Connect</button>
    </div>
    </>
  )
}

export default Cpanel
