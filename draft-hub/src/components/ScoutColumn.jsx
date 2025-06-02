import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import arrow from '../assets/arrow.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
        //minWidth: "250px",
        //position: "sticky",
        
        top: 80,
      }}
>
      
      <Typography variant="h6" fontWeight="bold" textAlign="center">Scout Rankings</Typography>
      
      
      
      {scouts.map((scout) => {
  const report = scoutingReports.find(
    (r) => r.playerId === activePlayerId && scout.includes(r.scout)
  );

  const rawValue = Number(playerData?.[scout]);
  const isNumeric = rawValue !== null && rawValue !== undefined && !isNaN(Number(rawValue));
  const scoutRank = isNumeric ? Number(rawValue) : null;

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
      }}
    >
      <CardContent
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          paddingTop: "5px",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" display="flex" alignItems="center">
          {scout}
          {scoutRank == 0}
          {scoutRank != 0 && isNumeric ? (
            <>
              : {scoutRank}
              {scoutRank < activePlayerRank && (
                <img
                  src={arrow}
                  alt="up arrow"
                  style={{
                    marginLeft: 6,
                    height: 14,
                    filter:
                      "invert(28%) sepia(95%) saturate(597%) hue-rotate(88deg) brightness(88%) contrast(92%)",
                  }}
                />
              )}
              {scoutRank > activePlayerRank && (
                <img
                  src={arrow}
                  alt="down arrow"
                  style={{
                    marginLeft: 6,
                    height: 14,
                    transform: "rotate(180deg)",
                    filter:
                      "invert(21%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(96%) contrast(112%)",
                  }}
                />
              )}
            </>
          ) : (
            <>: N/A</>
          )}
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
