import { createSignal, createEffect, onCleanup } from 'solid-js'
import { state } from './store/store' // <-- Import the store
import './Terminal.css'

var port:any;

function Terminal() {
  const [terminalMsg, setterminalMsg] = createSignal<{msg:string, sender:'k8'|'user'}[]>([])

  let inputRef: HTMLInputElement | undefined; 


  async function send(msg:string){
    const writer = port.writable.getWriter();

const data = new TextEncoder().encode(msg+'\n\r') // hello
await writer.write(data);

writer.releaseLock();
  }


  createEffect(async () => {
    console.log(state.portStatus)
    if (state.portStatus) {
     const ports = await navigator.serial.getPorts();

     port = ports[0];


     const reader = port.readable.getReader();

    var k8output = ""

while (true) {
  const { value, done } = await reader.read();
  if (done) {
    reader.releaseLock();
    break;
  }
  k8output += new TextDecoder().decode(value)
  if(k8output[k8output.length-1] == '\r'){console.log(k8output)
    setterminalMsg([{sender:'k8',msg:k8output},...terminalMsg()])
    k8output = ""
  };
}


    }
  }, [state.portStatus]);

  createEffect(() => {
    console.log("The terminalMsg is now", terminalMsg());
  });

  onCleanup(() => {
    console.log('unmounted')
  });

  return (
       <>

    <div style={{"font-family":'"VT323", monospace',"font-weight":400,"font-style":"normal", "padding-inline":'15px'}} class='terminal text-visible'><span class='text-visible' style={{"padding-left":'5%', "font-size":'1.3rem'}}>Serial Alek</span>
      <div style={{"overflow-y":'scroll',"overflow-x":'visible', "height":'80%',display:'flex', "flex-direction":'column-reverse', "background-color":'transparent'}}> {terminalMsg().map((val)=>{
      return <span tabIndex={1} class='text-visible' style={{"white-space":"pre-wrap","font-size":'1.3rem',padding:0, "line-height":1.3,transition: '0.3s',"transform-origin": 'left' }}  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
><span>{val.sender=='user'?'>>>':null}</span>{val.msg}</span>
    })}</div>
           <form style={{"font-family":'"VT323", monospace',"font-weight":400,"font-style":"normal"}} onSubmit={(e) => {e.preventDefault();
            
            if(inputRef){
              setterminalMsg([{msg:inputRef.value, sender:'user'}, ...terminalMsg()]);
              send(inputRef.value)
              inputRef.value = ''
              
            }
              }
              
              }>
          <div style={{position:'absolute', bottom:'5px', "font-size":'1.3rem',display:'flex', width:'100%', "padding-left":'15px'}}> <span>{' >>>'}</span> <input ref={inputRef} type='text'  style={{"font-size":'1.3rem',"font-family":'"VT323", monospace',"background-color":'transparent', outline:'none', border:'none', width:'100%'}} placeholder='|'/>
          </div>  </form>
    </div>
    </>
  )
}

export default Terminal