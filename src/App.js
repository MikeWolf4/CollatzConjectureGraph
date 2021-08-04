import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';

function App() {

  const [count, setCount] = useState(1)
  const [time, setTime] = useState(1)
  const [timeOn, setTimeOn] = useState(false)

  React.useEffect(() =>{

    
    let interval = null;
    if (timeOn){
      interval = setInterval(()=>{
        setTime(prevTime => prevTime + 1)
      }, 100)
      
    }else {
      clearInterval(interval)
   
    }

    return () => clearInterval(interval)

  }, [timeOn])


  // 3x+1 array / value
  let threeXOneBox  = []

  let original = count;

  let modOriginal = original
   // 3x+1 array / value

  // graph set up ////////////
  let options = {
    scales: 
    {
      y:{ ticks: {color: "white"}},
      x:{ ticks: {color: "white"}}
    },
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              color: 'white',
              font: {
                  size: 18,
              }
          }
      }
  },
    responsive: true,
    maintainAspectRatio: true,
  };

  ///////////////////
  ///////////////////

  let data = {

    labels: threeXOneBox,
    datasets: [{
      label:"( 3x+1 ) if odd | ( x/2 ) if even",
      data: threeXOneBox,
      backgroundColor: 'blue',
      borderColor: "lightblue", 
      fontColor: "white",
      hoverBackgroundColor: "red",
      hoverBorderColor: "red",
    }],
  }
  // graph set up ////////////


  // setCount ////////////
  function setOriginal(originalInput){


    if(originalInput > 0){
      setCount(originalInput)
    }else{
    setCount(1)
    }
    
  }
  // setCount ////////////

  // 3x+1 sequencer
  function ThreeXRule() {
    while (modOriginal != 1) {
      if (modOriginal % 2 == 0) {
        modOriginal = modOriginal / 2
      }
      else{
        modOriginal = 3 * modOriginal + 1
      }
      threeXOneBox.push(modOriginal + " ")
    }
    return modOriginal
  }
  ThreeXRule();
  // 3x+1 sequencer


  return (
    
    <div className="App">
      <header className="App-header">

      <img src={logo} className="App-logo" alt="logo"/>
      <p> Collatz Conjecture Graph </p>
      
        <Line height={3} width={12} data={data} options={options}/>
        
        <p>
          <div>Value: {original}</div> 
          <div>Length: {threeXOneBox.length}</div>
        </p>
        <p>
          <label>
            <input placeholder="Positive Integer" onChange={e => setOriginal(e.target.value)} type="text" name="name" />
          </label>
        </p>
        <div id="timerButton">
        <p>{time}</p>
        <button onClick={() => setTimeOn(true)}>Start</button>
        <button onClick={() => setTimeOn(false)}>Stop</button>
        <button onClick={() => setTimeOn(true)}>Resume</button>
        <button onClick={() => setTime(0)}>Reset</button>
        </div>
      </header>
    </div>
  );
  

}



















export default App;
