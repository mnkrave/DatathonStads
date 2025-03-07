import React, { useState } from 'react';
import { ReactComponent as Germany } from './germany.svg';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Beispiel-Handler für Interaktivität
  const handleSVGClick = (event) => {
    console.log("SVG wurde angeklickt", event);
    // Hier kann später weitere Logik implementiert werden
  };

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
                {/* Verwende die interaktive SVG-Komponente */}
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
        <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
          <h2>Datensatz Attribute</h2>
          <p>
            Der Datensatz enthält wöchentlich aggregierte Daten zur Grippeimpfung und umfasst die folgenden Attribute:
          </p>
          <ul>
            <li><strong>week:</strong> Kalenderwoche der Datensammlung.</li>
            <li><strong>kvregion:</strong> Kassenärztliche Vereinigungsregion.</li>
            <li><strong>region:</strong> Regionale Unterteilung.</li>
            <li><strong>specialization:</strong> Spezialisierung der impfenden Fachgruppe (ZiMern entsprechen der LANR-Nummer –
              <a href="https://de.wikipedia.org/wiki/Lebenslange_Arztnummer#Aufbau" target="_blank" rel="noopener noreferrer">Details</a>
              ).</li>
            <li><strong>gender:</strong> Geschlecht der geimpften Personen.</li>
            <li><strong>age_group:</strong> Altersgruppe der geimpften Personen.</li>
            <li><strong>insurancecode:</strong> AbrechnungsziMer entsprechend EBM bzw. GOÄAbrechnungsziMer.</li>
            <li><strong>insurancetype:</strong> Versicherungstyp (GKV/PKV).</li>
            <li><strong>absolute:</strong> Absolute Anzahl der Impfungen.</li>
            <li><strong>extrapolated:</strong> Hochgerechnete Anzahl der Impfungen (extrapoliert auf Basis der aktiven Ärzte).</li>
            <li><strong>risk_groups:</strong> Spezifische Risikogruppe (sofern vorhanden).</li>
          </ul>
        </div>
      </div>
  );
}

export default App;
