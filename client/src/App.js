import { Router } from './components/router'


function App() {
  const path = window.location.pathname;
  return <Router path={path} />
}

export default App;
