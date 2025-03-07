import React from 'react';

function App() {
  return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        {/* Linke Spalte: 8 Dropdown-Menüs */}
        <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px' }}>
          <h2>Menüs</h2>
          {Array.from({ length: 8 }).map((_, index) => (
              <select key={index} style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
          ))}
        </div>

        {/* Mittlere Spalte: PNG Upload */}
        <div style={{ flex: 2, borderRight: '1px solid #ccc', padding: '10px' }}>
          <h2>PNG Hochladen</h2>
          <input type="file" accept="image/png" />
        </div>

        {/* Rechte Spalte: Platzhalter */}
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>Platzhalter</h2>
          <div style={{ border: '2px dashed #ccc', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Hier kommt später der Inhalt rein.</p>
          </div>
        </div>
      </div>
  );
}

export default App;
