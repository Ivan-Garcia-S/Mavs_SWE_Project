import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { GoldStar, SilverStar, BronzeStar } from "./Stars"; // adjust import path
const defaultPlayerImg = "https://cdn.nba.com/headshots/nba/latest/1040x760/1642284.png"

function PlayerCard({ player, setActivePlayerId, setActivePlayerName, seasonLogs }) {
  const { rank } = player;
  const imgSrc = player.photoUrl || defaultPlayerImg;
  

  const renderRankIcon = () => {
    let StarComponent = null;

    if (rank === 1) StarComponent = GoldStar;
    else if (rank === 2) StarComponent = SilverStar;
    else if (rank === 3) StarComponent = BronzeStar;

    if (StarComponent) {
      return (
        <Box sx={{ position: "relative", width: 40, height: 40, mr: 2 }}>
          <StarComponent />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: "1.3rem",
              userSelect: "none",
              pointerEvents: "none",
              textShadow: "0 0 4px white",
            }}
          >
            {rank}
          </Box>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          fontWeight: "bold",
          fontSize: "1.1rem",
          mr: 2,
        }}
      >
        {rank}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        alignItems: "center",
        p: 1,
        cursor: "pointer", // optional, makes it clear it's interactive
      }}
      onMouseEnter={() => {
        setActivePlayerId(player.playerId);
        setActivePlayerName(player.firstName + " " + player.lastName)
      }}
      //onMouseLeave={() => setActivePlayerId(null)}
    >
      {renderRankIcon()}

      <CardMedia
        component="img"
        image={imgSrc}
        alt={`${player.firstName} ${player.lastName}`}
        sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "cover", mr: 2 }}
      />

<CardContent sx={{ flex: 3, p: 0 }}>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography variant="h6" align="left">
        {player.firstName} {player.lastName}
      </Typography>
      <Typography variant="body2" align="left" color="text.secondary">
        {player.currentTeam} — {player.league}
      </Typography>
      <Typography variant="body2" align="left">
        {player.homeTown}, {player.homeState || player.homeCountry}
      </Typography>
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 3, p: 0 }}></CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex", alignItems: "left" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        PPG
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.PTS ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex", alignItems: "left" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        RPG
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.TRB ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex"}}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        APG
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.AST ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        BPG
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.BLK ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex", alignItems: "left" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        SPG
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.STL ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 2, p: 0 }}>
  <Box sx={{ display: "flex", alignItems: "left" }}>
    {/* Left: vertical text stack */}
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1,}}>
      <Typography  textAlign="center" variant="h6" align="left">
        FG%
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
      {seasonLogs?.find(log => log.playerId === player.playerId)?.["FG%"].toFixed(1) ?? "N/A"}

      </Typography>
      
    </Box>

   
  </Box>
</CardContent>
<CardContent sx={{ flex: 1, p: 0 }}/>

      
    </Card>
  );
}

export default PlayerCard;
