import React, { useState, useEffect } from 'react';
import CatCard from './components/CatCard.jsx';
import BanList from './components/BanList.jsx';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchRandomCat = async () => {
    console.log("API_KEY:", API_KEY);

    let result = null;

    for (let i = 0; i < 10; i++) {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
        headers: { 'x-api-key': API_KEY }
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!data[0]?.breeds?.length) continue;

      const breed = data[0].breeds[0].name;

      if (!banList.includes(breed)) {
        result = data[0];
        break;
      }
    }

    setCat(result); // could be null if no valid cat found
  };

  const handleBan = (value) => {
    setBanList(prev => [...new Set([...prev, value])]);
  };

  const removeFromBan = (value) => {
    setBanList(prev => prev.filter(item => item !== value));
  };

  useEffect(() => {
    console.log("Current cat:", cat);
  }, [cat]);

  return (
    <div className="app">
      <h1>Discover a Cat</h1>
      <button onClick={fetchRandomCat}>Discover</button>

      {/* Debug print */}
      <pre>{JSON.stringify(cat, null, 2)}</pre>

      {cat && cat.breeds && cat.breeds.length > 0 && (
        <CatCard
          image={cat.url}
          breed={cat.breeds[0].name}
          origin={cat.breeds[0].origin}
          temperament={cat.breeds[0].temperament}
          onBan={handleBan}
        />
      )}

      <BanList banList={banList} onRemove={removeFromBan} />
    </div>
  );
}

export default App;
