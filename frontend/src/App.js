import React, { useState } from 'react';
// Importiere das SVG als React-Komponente (funktioniert mit create-react-app und SVGR)
import { ReactComponent as Germany } from './germany.svg';
// CSS importieren
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Beispiel-Handler, falls du Klicks verarbeiten möchtest
  const handleSVGClick = (event) => {
    console.log("SVG wurde angeklickt", event);
    // Hier kannst du später Logik ergänzen,
    // z.B. anhand von event.target.id ermitteln, welches Bundesland geklickt wurde.
  };

  return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        {/* Linke Spalte: Dropdown-Menüs */}
        <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px', color: '#fff' }}>
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
        <div style={{ flex: 2, borderRight: '1px solid #ccc', padding: '10px', color: '#fff' }}>
          {/* Tab Header */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <button
                onClick={() => setActiveTab(0)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: activeTab === 0 ? '#ccc' : '#f0f0f0',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
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
                  cursor: 'pointer',
                }}
            >
              Diagramme
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 0 && (
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
              >
                <h2>Karten Visualierung</h2>
                {/* Hier wird die interaktive SVG-Karte eingebunden */}
                <Germany
                    onClick={handleSVGClick}
                    style={{ width: '80%', cursor: 'pointer' }}
                />
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
                    height: '100%',
                  }}
              >
                <h2>Zeitsrahl Diagramme</h2>
                <p>Hier erscheint später weiterer Inhalt.</p>
              </div>
          )}
        </div>

        {/* Rechte Spalte: Datensatz Attribute */}
        <div style={{ flex: 1, padding: '10px', overflowY: 'auto', color: '#fff' }}>

        </div>
      </div>
  );
}

export default App;
