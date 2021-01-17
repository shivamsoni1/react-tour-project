import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setloading]=useState(true);
  const [tours,settours]= useState([]);
  const removetour = (id)=>{
    const newTours =tours.filter((tour)=> tour.id!=id);
    settours(newTours);
  }
  const fetchtours = async() =>{
    setloading(true);
    try{
      
      const response =await fetch(url);
      const tor = await response.json();
      setloading(false);
      settours(tor);
      
      
    }
    catch (error){
      setloading(false);
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchtours();
  },[]);
  if(loading){
    return <main>
      <Loading />
    </main>
  }
  console.log(tours);
  if(tours.length==0){
    return(
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={()=> fetchtours()}>refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      
      <Tours tours={tours} removetour={removetour} />
    </main>
  )
}

export default App
