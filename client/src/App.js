import { Router, Nav } from './components'
import { Page } from 'tailstrap'
function App() {
  const path = window.location.pathname;
  return (


    <Page variant='start-center' className='dark:bg-gray-600'>
      <Nav />
      <Router path={path} />
    </Page>
  )
}

export default App;
