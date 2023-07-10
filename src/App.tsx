import React, { useMemo, useState } from "react";
import { getSubjectRankedInstitutions, getSubjects } from "./Server/Data";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { ResultCard } from "./Components/ResultCard";
import { ResultsWrapper, SelectWrapper } from "./styles";

const subjects = getSubjects();

function App() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const results = useMemo(
    () => (selected ? getSubjectRankedInstitutions(selected) : []),
    [selected]
  );

  return (
    <div className="App">
      <Typography variant="h1" component="h1">
        THE Institution Reader
      </Typography>
      <Typography variant="body2" color="text.secondary">
        See the institute ranking for your subject!
      </Typography>
      <SelectWrapper>
        <FormControl fullWidth>
          <InputLabel id="subject-select">Subject</InputLabel>
          <Select
            id="subject-select"
            labelId="subject-select"
            value={selected ?? ""}
            label="Subject"
            onChange={(e) => setSelected(e.target.value)}
          >
            {subjects.map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SelectWrapper>

      <ResultsWrapper>
        {selected &&
          results.map((res) => <ResultCard key={res.id} result={res} selectedSubject={selected} />)}
      </ResultsWrapper>
    </div>
  );
}

export default App;
