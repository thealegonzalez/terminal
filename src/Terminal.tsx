
import { createSignal, createEffect, onCleanup } from 'solid-js'
import './Terminal.css'

function Terminal() {
  const [count, setCount] = createSignal<string[]>([])

  let inputRef: HTMLInputElement | undefined; 

  createEffect(() => {
  console.log("The count is now", count());
});


onCleanup(() => {
    console.log('unmounted')
  });




  return (
    <>

    <div style={{"font-family":'"VT323", monospace',"font-weight":400,"font-style":"normal", "padding-inline":'15px'}} class='terminal text-visible'><span class='text-visible' style={{"padding-left":'5%', "font-size":'1.3rem'}}>Serial Alek</span>
      <div style={{"overflow-y":'scroll',"overflow-x":'hidden', "height":'80%',display:'flex', "flex-direction":'column-reverse', "background-color":'transparent'}}> {count().map((val)=>{
      return <span tabIndex={1} class='text-visible' style={{"font-size":'1.3rem',padding:0, "line-height":1.3,transition: '0.3s',"transform-origin": 'left' }}  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
><span>{'>>>'}</span>{val}</span>
    })}</div>
           <form style={{"font-family":'"VT323", monospace',"font-weight":400,"font-style":"normal"}} onSubmit={(e) => {e.preventDefault();if(inputRef){setCount([inputRef.value, ...count()]);inputRef.value = ''}}}>
          <div style={{position:'absolute', bottom:'5px', "font-size":'1.3rem',display:'flex', width:'100%', "padding-left":'15px'}}> <span>{' >>>'}</span> <input ref={inputRef} type='text'  style={{"font-size":'1.3rem',"font-family":'"VT323", monospace',"background-color":'transparent', outline:'none', border:'none', width:'100%'}} placeholder='|'/>
          </div>  </form>
    </div>
    </>
  )
}

export default Terminal
