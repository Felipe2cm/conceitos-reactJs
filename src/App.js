import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  async function handleAddRepository() {
    // TODO    

    const response = await api.post('repositories', {
      title: `Desafio ReactJS`,
      url: "http://google.com.br",
      techs: ["Node JS", "React JS"]
    });    

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {        
    
    await api.delete('repositories/' + id);

    setRepository(repositories.filter(r => r.id !== id));
  }
  
  const [ repositories, setRepository ] = useState([]);  
  
  useEffect(() => {
    api.get('repositories').then(data => {      
      setRepository(data.data);
    })
    
  }, [])
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r =>
          <li key={r.id}>
          <label>{r.title}</label>          

          <button onClick={() => handleRemoveRepository(r.id)}>
            Remover
          </button>

          </li>)}                                
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
