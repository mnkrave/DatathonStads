import React, { useState } from 'react';
// Importiere das SVG als React-Komponente (funktioniert z. B. mit create-react-app und SVGR)
import { ReactComponent as Germany } from './germany.svg';
import './styles.css';

// Mapping der Bundesländer-IDs auf Name und Hauptstadt
const stateData = {
  "DE-BW": { name: "Baden-Württemberg", capital: "Stuttgart" },
  "DE-BE": { name: "Berlin", capital: "Berlin" },
  "DE-BB": { name: "Brandenburg", capital: "Potsdam" },
  "DE-HB": { name: "Bremen", capital: "Bremen" },
  "DE-HH": { name: "Hamburg", capital: "Hamburg" },
  "DE-MV": { name: "Mecklenburg-Vorpommern", capital: "Schwerin" },
  "DE-NI": { name: "Niedersachsen", capital: "Hannover" },
  "DE-HE": { name: "Hessen", capital: "Wiesbaden" },
  "DE-RP": { name: "Rheinland-Pfalz", capital: "Mainz" },
  "DE-SL": { name: "Saarland", capital: "Saarbrücken" },
  "DE-SN": { name: "Sachsen", capital: "Dresden" },
  "DE-ST": { name: "Sachsen-Anhalt", capital: "Magdeburg" },
  "DE-SH": { name: "Schleswig-Holstein", capital: "Kiel" },
  "DE-NW": { name: "Nordrhein-Westfalen", capital: "Düsseldorf" },
  "DE-TH": { name: "Thüringen", capital: "Erfurt" }
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedState, setSelectedState] = useState(null);

  // Handler für Klicks in der SVG-Karte
  const handleSVGClick = (event) => {
    const stateId = event.target.id;
    console.log("SVG geklickt, target id:", stateId);
    if (stateData[stateId]) {
      setSelectedState(stateData[stateId]);
    } else {
      // Falls z. B. außerhalb eines Pfads geklickt wurde, Auswahl löschen:
      setSelectedState(null);
    }
  };

  return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        {/* Linke Spalte: Dropdown-Menüs (mit h1 "Menü") */}
        <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px', color: '#fff' }}>
          <h1>Menü</h1>
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
                    // Dieser Container sorgt bereits dafür, dass Inhalt
                    // vertikal angeordnet und horizontal zentriert wird:
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
              >
                <h2>Karten Visualierung</h2>
                {/* Neuer "Wrapper", der horizontal zentriert */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Germany
                      onClick={handleSVGClick}
                      // maxWidth und width helfen, die Karte nicht zu groß zu machen:
                      style={{
                        maxWidth: '600px',
                        width: '100%',
                        cursor: 'pointer',
                      }}
                  />
                </div>

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

        {/* Rechte Spalte: Anzeige der Bundesland-Informationen */}
        <div style={{ flex: 1, padding: '10px', overflowY: 'auto', color: '#fff' }}>
          <h2>Bundesland Infos</h2>
          {selectedState ? (
              <div>
                <h3>{selectedState.name}</h3>
                <p>Hauptstadt: {selectedState.capital}</p>
              </div>
          ) : (
              <p>Bitte ein Bundesland auswählen.</p>
          )}
        </div>
      </div>
  );
}

export default App;
