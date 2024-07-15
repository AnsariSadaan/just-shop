import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryApi from './utils/backendDomain';
import Context from './context/userContext';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './utils/store/userSlice';
function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include"
    })

    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    }
  useEffect(() => {
    // use details
    fetchUserDetails();
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails //user details fetch
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
