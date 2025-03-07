import React, { useState } from 'react';
import KarteDeutschland from './Karte_Deutschland.svg.png';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        {/* Linke Spalte: 8 Dropdown-Menüs */}
        <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px' }}>
          <h2>Menüs</h2>
          {Array.from({ length: 8 }).map((_, index) => (
              <select
                  key={index}
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    width: '100%',
                  }}
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
          ))}
        </div>

        {/* Mittlere Spalte: Tabs */}
        <div style={{ flex: 2, borderRight: '1px solid #ccc', padding: '10px' }}>
          {/* Tab Header */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <button
                onClick={() => setActiveTab(0)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: activeTab === 0 ? '#ccc' : '#f0f0f0',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
            >
              Karten Visualierung
            </button>
            <button
                onClick={() => setActiveTab(1)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: activeTab === 1 ? '#ccc' : '#f0f0f0',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
            >
              Tab 2
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 0 && (
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
              >
                <h2>Karten Visualierung</h2>
                  <img src="http://127.0.0.1:8000/image" alt="Smile" />
                <div style={{ marginTop: '20px', width: '50%', overflow: 'hidden' }}>
                  <div
                      style={{
                        transform: 'scale(1.5)',
                        transformOrigin: 'left',
                        width: 'calc(100% / 1.5)',
                      }}
                  >
                    <input
                        type="range"
                        min="2000"
                        max="2030"
                        step="1"
                        style={{
                          width: '100%',
                          height: '40px',
                        }}
                    />
                  </div>
                </div>
              </div>
          )}

          {activeTab === 1 && (
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
              >
                {/* Platzhalter für den zweiten Tab */}
                <h2>Tab 2</h2>
                <p>Hier erscheint später weiterer Inhalt.</p>
              </div>
          )}
        </div>

        {/* Rechte Spalte: Platzhalter */}
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>Platzhalter</h2>
          <div
              style={{
                border: '2px dashed #ccc',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
          >
            <p>Hier kommt später der Inhalt rein.</p>
          </div>
        </div>
      </div>
  );
}

export default App;
