
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import DefaultLayout from './layouts/DefaultLayout'
import { GlobalProvider } from './contexts/GlobalContext'

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout/>}>
              <Route path='/' element={<TaskList/>}/>
              <Route path='/add-task' element={<AddTask/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
