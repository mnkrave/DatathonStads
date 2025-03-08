import React, { useState, useEffect } from 'react';
import { ReactComponent as Germany } from './germany.svg';
import frauenImg from './frauen.png';
import mannImg from './mann.png';
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

// Beispiel-Daten für Hessen in gewünschter Reihenfolge
const hessenData = [
  { kategorie: "Gesamt absolute Impfungen", wert: 28594 },
  { kategorie: "Gesamt extrapolierte Impfungen", wert: 1166412 },
  { kategorie: "GKV Versicherte", wert: 25539 },
  { kategorie: "PKV Versicherte", wert: 3055 },
  { kategorie: "Männer geimpft", wert: 12932 },
  { kategorie: "Frauen geimpft", wert: 15654 },
  { kategorie: "Risikogruppe Hypertonie", wert: 2873 },
  { kategorie: "Risikogruppe Diabetes T2", wert: 1182 },
  { kategorie: "Risikogruppe Asthma", wert: 514 },
  { kategorie: "Risikogruppe Chronische Herzkreislauf", wert: 671 },
  { kategorie: "Risikogruppe COPD", wert: 415 },
  { kategorie: "Risikogruppe Chronische Leberkrankheit", wert: 334 },
  { kategorie: "Risikogruppe Diabetes T1", wert: 46 },
  { kategorie: "Altersgruppe 0-29 absolute", wert: 607 },
  { kategorie: "Altersgruppe 30-59 absolute", wert: 4957 },
  { kategorie: "Altersgruppe 60- absolute", wert: 23030 },
];

// Überschriften für die Filter-Dropdowns
const dropdownHeadings = [
  "Regionen",
  "Bundesländer",
  "Geschlecht",
  "Versicherungsart",
  "Abrechnungsziffer",
  "Altersgruppe",
  "Fachrichtung",
  "Absolute Anzahl",
  "Extrapolierte Impfungen",
  "Risikogruppen"
];

// Optionen für jeden Filter
const filterOptions = {
  "Regionen": ["Region Nord", "Region Ost", "Region Süd", "Region West", "Region Zentral"],
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
  "Altersgruppe": ["0-18", "19-35", "30-59", "60+"],
  "Fachrichtung": ["Allgemeinmedizin", "Innere Medizin", "Pädiatrie", "Gynäkologie", "Chirurgie"],
  "Absolute Anzahl": ["Niedrig", "Mittel", "Hoch"],
  "Extrapolierte Impfungen": ["Jahr"],
  "Risikogruppen": ["Keine", "Senioren", "Kinder", "Chronische Erkrankungen"]
};

// Haupt-Dropdown in der rechten Spalte
const rightModeOptions = [
  "Zeitlicher Verlauf",
  "Deutschland Map",
  "Vergleichsdiagramm"
];

// Zusätzliche Dropdown-Optionen in der rechten Spalte
const extraOptionsMapping = {
  "Zeitlicher Verlauf": ["Zeitraum 1", "Zeitraum 2", "Zeitraum 3"],
  "Vergleichsdiagramm": ["Regionen", "Bundesländer"]
};

// Mapping für die Filter-Schlüssel
const leftKeyMapping = {
  "Regionen": "Region",
  "Bundesländer": "Bundeslaender",
  "Geschlecht": "Geschlecht",
  "Versicherungsart": "Versicherungsart",
  "Abrechnungsziffer": "Abrechnungsziffer",
  "Altersgruppe": "Altersgruppe",
  "Fachrichtung": "Fachrichtung",
  "Absolute Anzahl": "Absolute_Anzahl",
  "Extrapolierte Impfungen": "Extrapolierte_Impfungen",
  "Risikogruppen": "Risikogruppen"
};

function App() {
  // Initiale Filter-Werte, wie in deinem Screenshot 2
  const initialLeftFilters = {
    "Regionen": "Region Süd",
    "Bundesländer": "Baden-Württemberg",
    "Geschlecht": "Weiblich",               // <--- Standard auf Weiblich
    "Versicherungsart": "GKV",
    "Abrechnungsziffer": "Keine Auswahl",
    "Altersgruppe": "60+",
    "Fachrichtung": "Allgemeinmedizin",
    "Absolute Anzahl": "Keine Auswahl",
    "Extrapolierte Impfungen": "Keine Auswahl",
    "Risikogruppen": "Chronische Erkrankungen"
  };

  const [leftFilters, setLeftFilters] = useState(initialLeftFilters);
  const [selectedState, setSelectedState] = useState(null);

  // Standardmäßig "Zeitlicher Verlauf" als Ansicht
  const [selectedRightMode, setSelectedRightMode] = useState("Zeitlicher Verlauf");

  // Für zusätzliche Auswahl im rechten Bereich (z.B. Zeiträume)
  const [selectedExtra, setSelectedExtra] = useState("");

  // Für Vergleichsdiagramm
  const [selectedYAxis, setSelectedYAxis] = useState("Impfquote");
  const [selectedSortierart, setSelectedSortierart] = useState("aufsteigend");

  // Klick auf Bundesland in der SVG
  const handleSVGClick = (event) => {
    const stateId = event.target.id;
    if (stateData[stateId]) {
      setSelectedState(stateData[stateId]);
    } else {
      setSelectedState(null);
    }
  };

  // Erstellen des JSON fürs Backend
  const createJsonData = () => {
    // Filter transformieren
    const processedLeftFilters = {};
    for (const key in leftFilters) {
      const mappedKey = leftKeyMapping[key];
      processedLeftFilters[mappedKey] =
          leftFilters[key] === "Keine Auswahl" ? "-1" : leftFilters[key];
    }

    // Diagramm-Auswahl
    const auswahlDiagramm = {
      diagrammart: selectedRightMode,
      yAchse: selectedRightMode === "Vergleichsdiagramm" ? selectedYAxis : "",
      vglMit: selectedExtra,
      sortierart:
          selectedRightMode === "Vergleichsdiagramm" ? selectedSortierart : ""
    };

    // Zusammenfügen
    return {
      filterRequest: processedLeftFilters,
      auswahlDiagramm
    };
  };

  // Senden an Backend
  const saveSelections = async () => {
    const data = createJsonData();
    try {
      const response = await fetch("http://127.0.0.1:8000/diagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        console.error("Fehler beim Senden der Daten:", response.statusText);
      } else {
        console.log("Daten erfolgreich an das Backend gesendet!");
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
    }
  };

  // Automatisch speichern bei jedem Update
  useEffect(() => {
    saveSelections();
  }, [
    leftFilters,
    selectedRightMode,
    selectedExtra,
    selectedYAxis,
    selectedSortierart,
    selectedState
  ]);

  // Hauptbereich (mittlere Spalte)
  let mainContent;

  if (selectedRightMode === "Zeitlicher Verlauf") {
    // **Hier wird je nach Geschlecht das passende Bild angezeigt**
    if (leftFilters["Geschlecht"] === "Weiblich") {
      mainContent = (
          <div style={{ textAlign: "center" }}>
            <img
                src={frauenImg}
                alt="Frauen"
                style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
      );
    } else if (leftFilters["Geschlecht"] === "Männlich") {
      mainContent = (
          <div style={{ textAlign: "center" }}>
            <img
                src={mannImg}
                alt="Männer"
                style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
      );
    } else {
      // Falls du nichts anzeigen willst, wenn ein anderes Geschlecht gewählt ist:
      mainContent = (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "blue" }}>
              Kein passendes Bild für die aktuelle Auswahl
            </p>
          </div>
      );
    }
  } else if (selectedRightMode === "Deutschland Map") {
    mainContent = (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "blue" }}>Deutschland Map</h2>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Germany
                onClick={handleSVGClick}
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  cursor: "pointer"
                }}
            />
          </div>
        </div>
    );
  } else if (selectedRightMode === "Vergleichsdiagramm") {
    mainContent = (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "blue" }}>Vergleichsdiagramm</h2>
          <p style={{ color: "blue" }}>Vergleich: {selectedExtra}</p>
          <p style={{ color: "blue" }}>Y-Achse: {selectedYAxis}</p>
          <p style={{ color: "blue" }}>(Weitere Inhalte folgen...)</p>
        </div>
    );
  }

  return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        {/* Linke Spalte: Filter-Dropdowns – nur anzeigen, wenn der rechte Modus NICHT "Deutschland Map" ist */}
        {selectedRightMode !== "Deutschland Map" && (
            <div
                style={{
                  flex: 1,
                  borderRight: "1px solid #ccc",
                  padding: "10px",
                  color: "blue"
                }}
            >
              <h1 style={{ color: "blue" }}>Filter</h1>
              {dropdownHeadings.map((heading, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <h3 style={{ marginBottom: "5px", color: "blue" }}>{heading}</h3>
                    <select
                        style={{ width: "100%", color: "blue" }}
                        value={leftFilters[heading]}
                        onChange={(e) =>
                            setLeftFilters({
                              ...leftFilters,
                              [heading]: e.target.value
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
            </div>
        )}

        {/* Mittlere Spalte: Hauptinhalt */}
        <div
            style={{
              flex: selectedRightMode !== "Deutschland Map" ? 2 : 3,
              padding: "10px",
              color: "blue",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
        >
          {mainContent}
        </div>

        {/* Rechte Spalte: Auswahl der Anzeige-Optionen */}
        <div
            style={{
              flex: 1,
              borderLeft: "1px solid #ccc",
              padding: "10px",
              color: "blue"
            }}
        >
          <h2 style={{ color: "blue" }}>Inhalt auswählen</h2>
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
                width: "100%",
                marginBottom: "15px",
                fontSize: "16px",
                padding: "8px",
                color: "blue"
              }}
          >
            {rightModeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
            ))}
          </select>

          {/* Extra-Dropdown nur für Vergleichsdiagramm */}
          {selectedRightMode === "Vergleichsdiagramm" &&
              extraOptionsMapping[selectedRightMode] && (
                  <select
                      value={selectedExtra}
                      onChange={(e) => setSelectedExtra(e.target.value)}
                      style={{
                        width: "100%",
                        marginBottom: "15px",
                        fontSize: "16px",
                        padding: "8px",
                        color: "blue"
                      }}
                  >
                    {extraOptionsMapping[selectedRightMode].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                    ))}
                  </select>
              )}

          {/* Sortierart nur für Vergleichsdiagramm */}
          {selectedRightMode === "Vergleichsdiagramm" && (
              <div style={{ marginBottom: "15px", color: "blue" }}>
                <h3 style={{ marginBottom: "5px", color: "blue" }}>Sortierart</h3>
                <label style={{ color: "blue" }}>
                  <input
                      type="radio"
                      name="sortierart"
                      value="aufsteigend"
                      checked={selectedSortierart === "aufsteigend"}
                      onChange={(e) => setSelectedSortierart(e.target.value)}
                  />
                  Aufsteigend
                </label>
                <label style={{ marginLeft: "10px", color: "blue" }}>
                  <input
                      type="radio"
                      name="sortierart"
                      value="absteigend"
                      checked={selectedSortierart === "absteigend"}
                      onChange={(e) => setSelectedSortierart(e.target.value)}
                  />
                  Absteigend
                </label>
              </div>
          )}

          {selectedRightMode === "Deutschland Map" && (
              <div style={{ marginTop: "20px" }}>
                {selectedState ? (
                    <>
                      <h3 style={{ color: "blue" }}>{selectedState.name}</h3>
                      <p style={{ color: "blue" }}>Hauptstadt: {selectedState.capital}</p>
                      {selectedState.name === "Hessen" && (
                          <table
                              style={{
                                marginTop: "10px",
                                borderCollapse: "collapse",
                                width: "100%",
                                color: "blue"
                              }}
                          >
                            <thead>
                            <tr>
                              <th
                                  style={{
                                    borderBottom: "1px solid #ccc",
                                    textAlign: "left",
                                    paddingBottom: "5px"
                                  }}
                              >
                                Kategorie
                              </th>
                              <th
                                  style={{
                                    borderBottom: "1px solid #ccc",
                                    textAlign: "left",
                                    paddingBottom: "5px"
                                  }}
                              >
                                Wert
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            {hessenData.map((item) => (
                                <tr key={item.kategorie}>
                                  <td style={{ padding: "4px 0" }}>{item.kategorie}</td>
                                  <td style={{ padding: "4px 0" }}>{item.wert}</td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                      )}
                    </>
                ) : null}
              </div>
          )}

          {/* Speichern-Button nur anzeigen, wenn NICHT Deutschland Map */}
          {selectedRightMode !== "Deutschland Map" && (
              <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#00509e",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px"
                  }}
                  onClick={saveSelections}
              >
                Speichern
              </button>
          )}
        </div>
      </div>
  );
}

export default App;
