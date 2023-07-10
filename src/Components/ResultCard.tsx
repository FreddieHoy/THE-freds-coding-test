import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RankedInstitutionHistory } from "../entityTypes";
import { HeaderRow, RatingHistoryWrapper } from "../styles";

export const ResultCard = ({
  result,
  selectedSubject,
}: {
  result: RankedInstitutionHistory;
  selectedSubject: string;
}) => {
  const [show, setShow] = useState(false);
  const history = result.history.sort((a, b) => b.year - a.year);

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <HeaderRow>
          <Typography variant="h4" component="div">
            {result.rankPosition}.
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              marginBottom: "2px",
            }}
          >
            {result.name} - {selectedSubject}
          </Typography>
        </HeaderRow>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {result.address}, {result.region}, {result.country}
        </Typography>
        <Typography variant="h6">
          Last student rating: {result.rating.ratingValue} ({result.rating.yearRated})
        </Typography>
      </CardContent>
      <CardActions>
        <RatingHistoryWrapper>
          <Button size="small" onClick={() => setShow((val) => !val)}>
            {show ? "Hide Student Rating History" : "See Student Rating History"}
          </Button>
          {show &&
            history.map((item) => {
              const subject = item.subjects.find((sub) => sub.name === selectedSubject);
              if (!subject) return null;
              return (
                <Typography key={item.id} variant="body1">
                  {item.year}: {subject.student_rating}
                </Typography>
              );
            })}
        </RatingHistoryWrapper>
      </CardActions>
    </Card>
  );
};
