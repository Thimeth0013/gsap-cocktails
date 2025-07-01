import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <div className='flex-center h-[100vh]'>
        <h1 className='text-blue-800 text-4xl font-bold'>HELLO WORLD</h1>
    </div>
  )
}

export default App