import React from "react";

import { getSubjects } from "./Server/Data";

function App() {
  const subjects = getSubjects();
  return (
    <div className="App">
      <h1>THE University Picker</h1>
      {subjects.map((sub) => (
        <p>{sub}</p>
      ))}
    </div>
  );
}

export default App;
