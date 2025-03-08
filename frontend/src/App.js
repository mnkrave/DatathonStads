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

// Überschriften für die Filter-Dropdowns in der linken Spalte (wie im Backend‑Modell erwartet)
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

// Optionen für jeden Filter (ohne "Keine Auswahl" – diese fügen wir als erste Option ein)
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

// Mapping, um die Schlüssel der linken Filter in die vom Backend‑Modell erwarteten Schlüssel umzuwandeln
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
const [imageSrc, setImageSrc] = useState(null); // ✅ useState für das Bild
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
  const [selectedSortierart, setSelectedSortierart] = useState("aufsteigend");

  // Handler für Klicks in der SVG-Karte (mittlere Spalte)
  const handleSVGClick = (event) => {
    const stateId = event.target.id;
    if (stateData[stateId]) {
      setSelectedState(stateData[stateId]);
    } else {
      setSelectedState(null);
    }
  };

  // Funktion zum Erstellen des JSON-Objekts – so wie es den Backend-Modellen entspricht
  const createJsonData = () => {
    // Transformiere die linken Filter: "Keine Auswahl" wird zu null und Schlüssel werden gemappt

    // Erstelle das Objekt für die Diagrammauswahl (AuswahlDiagramm)
    const auswahlDiagramm = {
        diagrammart: selectedRightMode,
        yAchse: selectedRightMode === "Vergleichsdiagramm" ? selectedYAxis : "",
        vglMit: selectedExtra,
        sortierart: (selectedRightMode === "Vergleichsdiagramm" || selectedRightMode === "Zeitlicher Verlauf")
            ? selectedSortierart
            : null,  // ✅ "-1" durch `null` ersetzt
        sortierenBy: "extrapolated"
    };

    // Loop durch alle linken Filter und wandle "Keine Auswahl" in `null` um
    for (const key in leftFilters) {
        const mappedKey = leftKeyMapping[key];
        auswahlDiagramm[mappedKey] = leftFilters[key] === "Keine Auswahl" ? null : leftFilters[key];
    }

    // Finales JSON-Objekt (bei "Deutschland Map" wird selectedState ignoriert)
    return auswahlDiagramm;
};


  // Methode, um das aktuell erstellte JSON zurückzugeben
  const getCurrentJson = () => {
    return createJsonData();
  };

  // API-Call, um die JSON-Daten an das Backend zu senden
  const saveSelections = async () => {
  const data = createJsonData(); // JSON-Daten für das Diagramm erstellen

  try {
    const response = await fetch("http://localhost:8000/diagram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error("Fehler beim Senden der Daten:", response.statusText);
      return;
    }

    // Prüfen, ob die Antwort ein Bild ist
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.startsWith("image/")) {
      // Bild als Blob empfangen und in `setImageSrc` speichern
      const blob = await response.blob();
      setImageSrc(URL.createObjectURL(blob));
      console.log("Diagramm erfolgreich geladen!");
    } else {
      // Falls die API-Response JSON ist, dann normale Daten ausgeben
      const result = await response.json();
      console.log("Daten erfolgreich an das Backend gesendet!", result);
    }
  } catch (error) {
    console.error("Netzwerkfehler:", error);
  }
};

  // Auto-Speichern bei Änderungen (ohne Debounce)
  useEffect(() => {
    saveSelections();
  }, [leftFilters, selectedRightMode, selectedExtra, selectedYAxis, selectedSortierart, selectedState]);

  let mainContent;
  if (selectedRightMode === "Zeitlicher Verlauf") {
    mainContent = (
        <div style={{ textAlign: "center" }}>
          <h2>Zeitlicher Verlauf</h2>
          <p>Gewählter Zeitraum: {selectedExtra}</p>
          <p>(Weitere Inhalte folgen...)</p>
        </div>
    );
  } else if (selectedRightMode === "Deutschland Map") {
    mainContent = (
        <div style={{ textAlign: "center" }}>
          <h2>Deutschland Map</h2>
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
          <h2>Vergleichsdiagramm</h2>
          <p>Vergleich: {selectedExtra}</p>
          <p>Y-Achse: {selectedYAxis}</p>
          <p>(Weitere Inhalte folgen...)</p>
            {imageSrc && <img src={imageSrc} alt="Generiertes Diagramm" style={{ maxWidth: "100%", height: "auto" }} />}
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
                  color: "#fff"
                }}
            >
              <h1>Filter</h1>
              {dropdownHeadings.map((heading, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <h3 style={{ marginBottom: "5px" }}>{heading}</h3>
                    <select
                        style={{ width: "100%" }}
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
              color: "#fff",
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
              color: "#fff"
            }}
        >
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
                width: "100%",
                marginBottom: "15px",
                fontSize: "16px",
                padding: "8px"
              }}
          >
            {rightModeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
            ))}
          </select>

          {extraOptionsMapping[selectedRightMode] && (
              <select
                  value={selectedExtra}
                  onChange={(e) => setSelectedExtra(e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "16px",
                    padding: "8px"
                  }}
              >
                {extraOptionsMapping[selectedRightMode].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                ))}
              </select>
          )}

          {/* Radio-Buttons für Sortierart – nur anzeigen für Zeitlicher Verlauf und Vergleichsdiagramm */}
          {(selectedRightMode === "Zeitlicher Verlauf" || selectedRightMode === "Vergleichsdiagramm") && (
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ marginBottom: "5px" }}>Sortierart</h3>
                <label>
                  <input
                      type="radio"
                      name="sortierart"
                      value="aufsteigend"
                      checked={selectedSortierart === "aufsteigend"}
                      onChange={(e) => setSelectedSortierart(e.target.value)}
                  />
                  Aufsteigend
                </label>
                <label style={{ marginLeft: "10px" }}>
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

          {selectedRightMode === "Vergleichsdiagramm" && (
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ marginBottom: "5px" }}>Y-Achse</h3>
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
                <label style={{ marginLeft: "10px" }}>
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
              <div style={{ marginTop: "20px" }}>
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
