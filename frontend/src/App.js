import React, { useState, useEffect } from 'react';
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

// Überschriften für die Filter-Dropdowns in der linken Spalte
const dropdownHeadings = [
  "Regionen",
  "Bundesländer",
  "Geschlecht",
  "Versicherungsart",
  "Abrechnungsziffer",
  "Woche",
  "KV-Region",
  "Altersgruppe",
  "Fachrichtung",
  "Absolute Anzahl",
  "Extrapolierte Impfungen",
  "Risikogruppen"
];

// Optionen für jeden Filter (ohne "Keine Auswahl", da diese oben hinzugefügt wird)
const filterOptions = {
  "Regionen": ["Nord", "Ost", "Süd", "West", "Zentral"],
  "Bundesländer": [
    "Baden-Württemberg",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Hessen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Nordrhein-Westfalen",
    "Thüringen"
  ],
  "Geschlecht": ["Männlich", "Weiblich", "Divers", "Keine Angabe"],
  "Versicherungsart": ["GKV", "PKV", "Sonstige"],
  "Abrechnungsziffer": ["EBM", "GOÄ", "Sonstiges"],
  "Woche": ["KW1", "KW2", "KW3"],
  "KV-Region": ["Region A", "Region B", "Region C"],
  "Altersgruppe": ["0-18", "19-35", "36-60", "60+"],
  "Fachrichtung": ["Allgemeinmedizin", "Innere Medizin", "Pädiatrie", "Gynäkologie", "Chirurgie"],
  "Absolute Anzahl": ["Niedrig", "Mittel", "Hoch"],
  "Extrapolierte Impfungen": ["Niedrig", "Mittel", "Hoch"],
  "Risikogruppen": ["Keine", "Senioren", "Kinder", "Chronische Erkrankungen"]
};

// Optionen für das Haupt-Dropdown in der rechten Spalte
const rightModeOptions = [
  "Zeitlicher Verlauf",
  "Deutschland Map",
  "Vergleichsdiagramm"
];

// Extra Dropdown-Optionen (erscheinen unter dem Haupt-Dropdown in der rechten Spalte)
// für "Zeitlicher Verlauf" und "Vergleichsdiagramm"
const extraOptionsMapping = {
  "Zeitlicher Verlauf": ["Zeitraum 1", "Zeitraum 2", "Zeitraum 3"],
  "Vergleichsdiagramm": ["Regionen", "Bundesländer"]
};

function App() {
  // Initialisiere alle linken Filter auf "Keine Auswahl"
  const initialLeftFilters = dropdownHeadings.reduce((acc, heading) => {
    acc[heading] = "Keine Auswahl";
    return acc;
  }, {});

  const [leftFilters, setLeftFilters] = useState(initialLeftFilters);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRightMode, setSelectedRightMode] = useState("Deutschland Map");
  const [selectedExtra, setSelectedExtra] = useState(
      extraOptionsMapping["Deutschland Map"]
          ? extraOptionsMapping["Deutschland Map"][0]
          : ""
  );
  const [selectedYAxis, setSelectedYAxis] = useState("Impfquote");

  // Handler für Klicks in der SVG-Karte (mittlere Spalte)
  const handleSVGClick = (event) => {
    const stateId = event.target.id;
    if (stateData[stateId]) {
      setSelectedState(stateData[stateId]);
    } else {
      setSelectedState(null);
    }
  };

  // API-Call, um alle ausgewählten Filter an das Backend zu senden
  const saveSelections = async () => {
    // Transformiere die linken Filter: "Keine Auswahl" wird zu -1
    const processedLeftFilters = {};
    for (const key in leftFilters) {
      processedLeftFilters[key] = leftFilters[key] === "Keine Auswahl" ? -1 : leftFilters[key];
    }

    const data = {
      leftFilters: processedLeftFilters,
      rightSelection: {
        mode: selectedRightMode,
        extra: selectedExtra,
        yAxis: selectedRightMode === "Vergleichsdiagramm" ? selectedYAxis : undefined,
      },
      selectedState,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.error('Fehler beim Senden der Daten:', response.statusText);
      } else {
        console.log('Daten erfolgreich an das Backend gesendet!');
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  };

  // Auto-Speichern bei Änderungen (mit debounce möglich, hier einfach direkt)
  useEffect(() => {
    saveSelections();
  }, [leftFilters, selectedRightMode, selectedExtra, selectedYAxis, selectedState]);

  let mainContent;
  if (selectedRightMode === "Zeitlicher Verlauf") {
    mainContent = (
        <div style={{ textAlign: 'center' }}>
          <h2>Zeitlicher Verlauf</h2>
          <p>Gewählter Zeitraum: {selectedExtra}</p>
          <p>(Weitere Inhalte folgen...)</p>
        </div>
    );
  } else if (selectedRightMode === "Deutschland Map") {
    mainContent = (
        <div style={{ textAlign: 'center' }}>
          <h2>Deutschland Map</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Germany
                onClick={handleSVGClick}
                style={{
                  maxWidth: '600px',
                  width: '100%',
                  cursor: 'pointer',
                }}
            />
          </div>
        </div>
    );
  } else if (selectedRightMode === "Vergleichsdiagramm") {
    mainContent = (
        <div style={{ textAlign: 'center' }}>
          <h2>Vergleichsdiagramm</h2>
          <p>Vergleich: {selectedExtra}</p>
          <p>Y-Achse: {selectedYAxis}</p>
          <p>(Weitere Inhalte folgen...)</p>
        </div>
    );
  }

  return (
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        {/* Linke Spalte: Filter-Dropdowns */}
        <div style={{
          flex: 1,
          borderRight: '1px solid #ccc',
          padding: '10px',
          color: '#fff'
        }}>
          <h1>Filter</h1>
          {dropdownHeadings.map((heading, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <h3 style={{ marginBottom: '5px' }}>{heading}</h3>
                <select
                    style={{ width: '100%' }}
                    value={leftFilters[heading]}
                    onChange={(e) =>
                        setLeftFilters({
                          ...leftFilters,
                          [heading]: e.target.value,
                        })
                    }
                >
                  <option value="Keine Auswahl">Keine Auswahl</option>
                  {filterOptions[heading].map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                  ))}
                </select>
              </div>
          ))}
          {/* Da wir den API-Call automatisch auslösen, brauchen wir keinen "Anwenden"-Button mehr */}
        </div>

        {/* Mittlere Spalte: Hauptinhalt */}
        <div style={{
          flex: 2,
          padding: '10px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {mainContent}
        </div>

        {/* Rechte Spalte: Auswahl der Anzeige-Optionen */}
        <div style={{
          flex: 1,
          borderLeft: '1px solid #ccc',
          padding: '10px',
          color: '#fff'
        }}>
          <h2>Inhalt auswählen</h2>
          <select
              value={selectedRightMode}
              onChange={(e) => {
                const newMode = e.target.value;
                setSelectedRightMode(newMode);
                if (extraOptionsMapping[newMode]) {
                  setSelectedExtra(extraOptionsMapping[newMode][0]);
                } else {
                  setSelectedExtra("");
                }
              }}
              style={{
                width: '100%',
                marginBottom: '15px',
                fontSize: '16px',
                padding: '8px'
              }}
          >
            {rightModeOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
          </select>

          {extraOptionsMapping[selectedRightMode] && (
              <select
                  value={selectedExtra}
                  onChange={(e) => setSelectedExtra(e.target.value)}
                  style={{
                    width: '100%',
                    marginBottom: '15px',
                    fontSize: '16px',
                    padding: '8px'
                  }}
              >
                {extraOptionsMapping[selectedRightMode].map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
              </select>
          )}

          {selectedRightMode === "Vergleichsdiagramm" && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ marginBottom: '5px' }}>Y-Achse</h3>
                <label>
                  <input
                      type="radio"
                      name="yAxis"
                      value="Impfquote"
                      checked={selectedYAxis === "Impfquote"}
                      onChange={(e) => setSelectedYAxis(e.target.value)}
                  />
                  Impfquote
                </label>
                <label style={{ marginLeft: '10px' }}>
                  <input
                      type="radio"
                      name="yAxis"
                      value="Impfzahl"
                      checked={selectedYAxis === "Impfzahl"}
                      onChange={(e) => setSelectedYAxis(e.target.value)}
                  />
                  Impfzahl
                </label>
              </div>
          )}

          {selectedRightMode === "Deutschland Map" && (
              <div style={{ marginTop: '20px' }}>
                {selectedState ? (
                    <div>
                      <h3>{selectedState.name}</h3>
                      <p>Hauptstadt: {selectedState.capital}</p>
                    </div>
                ) : (
                    <p>Bitte ein Bundesland auswählen.</p>
                )}
              </div>
          )}

          <p>
            Wähle aus, welcher Inhalt in der mittleren Spalte angezeigt werden soll.
          </p>
          {/* Zusätzlich gibt es hier einen "Speichern"-Button, der den API-Call manuell auslöst */}
          <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#00509e',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px'
              }}
              onClick={saveSelections}
          >
            Speichern
          </button>
        </div>
      </div>
  );
}

export default App;
