import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RatedInstitutionHistory } from "../entityTypes";
import { ResultsWrapper } from "../App";

export const ResultCard = ({
  result,
  selectedSubject,
}: {
  result: RatedInstitutionHistory;
  selectedSubject: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {result.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {result.address}, {result.region}, {result.country}
        </Typography>
        <Typography variant="h6">
          Student Rating: {result.rating.rating} ({result.rating.yearRated})
        </Typography>
      </CardContent>
      <CardActions>
        <ResultsWrapper>
          <Button size="small" onClick={() => setShow((val) => !val)}>
            {show ? "Hide Rating History" : "See Rating History"}
          </Button>
          {show &&
            result.history.map((historyPoint) => {
              const subject = historyPoint.subjects.find((sub) => sub.name === selectedSubject);

              return (
                <div>
                  {historyPoint.year} - {subject?.student_rating}
                </div>
              );
            })}
        </ResultsWrapper>
      </CardActions>
    </Card>
  );
};
