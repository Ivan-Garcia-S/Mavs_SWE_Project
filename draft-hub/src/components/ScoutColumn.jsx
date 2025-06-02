import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function ScoutColumn({ scoutRankings, activePlayerId, bigBoardHeight, scoutingReports, activePlayerName, activePlayerRank }) {
  const samplePlayer = scoutRankings[0];
  if (!samplePlayer) return null;

  const scouts = Object.keys(samplePlayer).filter((key) => key !== "playerId");
  const playerData = scoutRankings.find(
    (r) => String(r.playerId) === String(activePlayerId)
  );

  const availableHeight = bigBoardHeight || 600;
  const cardCount = scouts.length;
  const totalOffset = 100 * cardCount; // ~100px per scout for padding
  const cardHeight = Math.max((availableHeight - totalOffset) / cardCount, 120);
  
  

  return (
    <Box
      sx={{
        minWidth: "250px",
        //position: "sticky",
        
        top: 80,
      }}
>
      
      <Typography variant="h6" fontWeight="bold" textAlign="center">Scout Rankings</Typography>
      <Typography textAlign="center">{activePlayerName}</Typography>
      
      
      {scouts.map((scout) => {
  const report = scoutingReports.find(
    (r) => r.playerId === activePlayerId && scout.includes(r.scout)
  );

  return (
    <Card
      key={scout}
      variant="outlined"
      sx={{
        height: `${cardHeight}px`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: 2,
        //marginTop: "-5px"
      }}
    >
      <CardContent sx={{
          overflowY: "auto", 
          flexGrow: 1,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
           display: "none", // Chrome, Safari
          },
          paddingTop: "5px"
        }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {scout}
          {playerData ? `: ${playerData[scout] ?? "N/A"}` : ""}
        </Typography>
        {report && (
          <Typography variant="body2">
            Notes: {report.report}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
})}
    </Box>
  );
}

export default ScoutColumn;
