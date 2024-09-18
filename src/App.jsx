import './App.css'
import React ,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth';
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom';


function App() {
  const [loading,setLoading] = useState(true)
  const dispach = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispach(login({userData}))
      }else{
        dispach(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block">
              <Header/>
              <main>
                <Outlet/>
              </main>
              <Footer/>
          </div>
      </div>
  ) : ( 
    <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
  )
}

export default App
