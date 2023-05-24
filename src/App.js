import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [currentKey, setCurrentKey] = useState('');
  const [nextKey, setNextKey] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);

  const handleKeyPress = (event) => {
    const { key } = event;


    if (!startTime) {
      setStartTime(new Date());
    }

    if (key === nextKey) {
      setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);
      setCurrentKey(nextKey);
      setNextKey(generateNextKey());
    } else {
      setAccuracy((prevAccuracy) => ((keysPressed + 1) / (prevAccuracy / 100 + keysPressed + 1)) * 100);
    }
  };

  const generateNextKey = () => {
    const keys = 'asdfjkl;';
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  useEffect(() => {
    setNextKey(generateNextKey());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (startTime) {
      const currentTime = new Date();
      const timeElapsed = (currentTime - startTime) / 1000;

      if (timeElapsed >= 300) {
        setStartTime(null);
      }
    }
  }, [keysPressed]);

  return (
    <div className='main-div'>
<div className="container">
      <h1>Touch Typing Practice</h1>
      <div className="key-info">
        <p>Current Key:</p>
        <p className='data1'>{currentKey}</p>
      </div>
      <div className="key-info">
        <p>Next Key:</p>
        <p  className='data1'>{nextKey}</p>
      </div>
      <input type="text" autoFocus onKeyDown={handleKeyPress} placeholder='Type or Practice here' />
      <div className="stats">
        <p>Keys Pressed: {keysPressed}</p>
        <p className='accuracy'>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
    </div>

    </div>
    
  );
};

export default App;