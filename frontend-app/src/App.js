// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: JSON.parse(input) }),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = () => {
    console.log('Filter button clicked!');
    // Render the response based on the selected options here
  };

  return (
    <div>
      <h1>{process.env.REACT_APP_ROLL_NUMBER}</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Filter options:</h2>
          <select multiple onChange={(event) => setSelectedOptions(Array.from(event.target.selectedOptions, option => option.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestAlphabet">Highest Alphabet</option>
          </select>
          <button onClick={handleFilter}>Filter</button>
          <div>
            {selectedOptions.map((option) => {
              if (option === 'alphabets' && response.alphabets) {
                return (
                  <div key={option}>
                    <h3>Alphabets:</h3>
                    <ul>
                      {response.alphabets.map((alphabet) => (
                        <li key={alphabet}>{alphabet}</li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (option === 'numbers' && response.numbers) {
                return (
                  <div key={option}>
                    <h3>Numbers:</h3>
                    <ul>
                      {response.numbers.map((number) => (
                        <li key={number}>{number}</li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (option === 'highestAlphabet' && response.highestAlphabet) {
                return (
                  <div key={option}>
                    <h3>Highest Alphabet:</h3>
                    <ul>
                      <li>{response.highestAlphabet}</li>
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;