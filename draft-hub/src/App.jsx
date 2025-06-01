import { useState, useEffect, useRef } from 'react';
import './App.css';
//import draftData from './data/intern_project_data.json';
import draftData from './data/ivan_test_data.json';
import BigBoard from './components/BigBoard';
import ScoutColumn from './components/ScoutColumn';

import { Card, CardContent, Typography, Box } from "@mui/material";

function App() {
  const [bios, setBios] = useState([]);
  const [scoutRankings, setScoutRankings] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [gameLogs, setGameLogs] = useState([]);
  const [seasonLogs, setSeasonLogs] = useState([]);
  const [scoutingReports, setScoutingReports] = useState([]);
  const [activePlayerId, setActivePlayerId] = useState(null);
  const [activePlayerName, setActivePlayerName] = useState(null)
  const bigBoardRef = useRef(null);
  const [bigBoardHeight, setBigBoardHeight] = useState(0);

  useEffect(() => {
    setBios(draftData.bio || []);
    setScoutRankings(draftData.scoutRankings || []);
    setMeasurements(draftData.measurements || []);
    setGameLogs(draftData.game_logs || []);
    setSeasonLogs(draftData.seasonLogs || []);
    setScoutingReports(draftData.scoutingReports || []);
  }, []);

  useEffect(() => {
    if (bigBoardRef.current) {
      setBigBoardHeight(bigBoardRef.current.offsetHeight);
    }
  }, [bios, scoutRankings]);


  return (
    <Box
  data-name="rooot"
  sx={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
  }}
>
  {/* Fixed Header */}
  <Box
    data-name="1st-Box"
    sx={{
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#00538C",
      zIndex: 1000,
      height: "120px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
    }}
  >
    <h1 style={{ margin: 0, color: "white"}}>NBA Draft Hub</h1>
  </Box>

  {/* Spacer below fixed header */}
  <Box sx={{ height: "120px" }} />

  {/* Main Content */}
  <Box
    data-name="board+scout"
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-start",
      paddingLeft: "5%",
      paddingRight: "2%",
      paddingBottom: "2%",
      boxSizing: "border-box",
      backgroundColor: "#B8C4CA",
    }}
  >
    {/* BigBoard (scrolls normally) */}
    <Box sx={{ flexGrow: 8, flexBasis: 0 }}>
      <BigBoard
        players={bios}
        scoutRankings={scoutRankings}
        seasonLogs={seasonLogs}
        setActivePlayerId={setActivePlayerId}
        setActivePlayerName={setActivePlayerName}
      />
    </Box>

    {/* ScoutColumn (sticks to top when scrolling) */}
    
    <Box
      sx={{
        flexGrow: 2,
        flexBasis: 0,
        position: "sticky",
        top: "130px", // a bit more than header to add spacing
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 130px)",
        backgroundColor: "#B8C4CA",
        overflowY: "auto", 
        scrollbarWidth: "none",       // Firefox
        msOverflowStyle: "none",      // IE 11
  '&::-webkit-scrollbar': {     // Chrome, Safari, Edge
    display: 'none',
  },
       // overflowY: "auto",
      }}
    >
      <ScoutColumn
        scoutRankings={scoutRankings}
        scoutingReports={scoutingReports}
        activePlayerId={activePlayerId}
        activePlayerName={activePlayerName}
      />
    </Box>
    </Box>
  
</Box>
  );
    
    


  ///////
  
  
  
}

export default App;
