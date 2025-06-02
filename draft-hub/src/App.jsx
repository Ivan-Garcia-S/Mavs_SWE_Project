import { useState, useEffect, useRef} from 'react';
import './App.css';
import draftData from './data/intern_project_data.json';
import BigBoard from './components/BigBoard';
import ScoutColumn from './components/ScoutColumn';
import PlayerProfile from './components/PlayerProfile'

import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

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
  const [currentTitle, setCurrentTitle] = useState("2025 NBA Draft Big Board")
  const [activePlayerRank, setActivePlayerRank] = useState(null)

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
  sx={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#B8C4CA"
  }}
>
  {/* Fixed Header */}
  <Box
  sx={{
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#00538C",
    zIndex: 1000,
    height: "120px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    px: 3,
  }}
>
  {/* Centered Title */}
  <h1
    style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      margin: 0,
      color: "white",
    }}
  >
    {currentTitle}
  </h1>

  {/* Right-Aligned Home Button */}
  <Box sx={{ marginLeft: "auto" }}>
    <IconButton
      onClick={() => setCurrentTitle("2025 NBA Draft Big Board")}
      sx={{ pr: "50px", color: "white" }}
    >
      <HomeIcon />
    </IconButton>
  </Box>
</Box>

  {/* Spacer below fixed header */}
  <Box sx={{ height: "600px" }} />

  {/* Main Content */}
  <Box
    data-name="board+scout"
    sx={{
      marginTop: "123px",
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
      {currentTitle === "2025 NBA Draft Big Board" ?
      (<BigBoard
        players={bios}
        scoutRankings={scoutRankings}
        seasonLogs={seasonLogs}
        setActivePlayerId={setActivePlayerId}
        activePlayerId={activePlayerId}
        setActivePlayerName={setActivePlayerName}
        setCurrentTitle={setCurrentTitle}
        setActivePlayerRank={setActivePlayerRank}/>) : 
      (<PlayerProfile
        players={bios}
        gameLogs={gameLogs}
        seasonLogs={seasonLogs}
        activePlayerId={activePlayerId}
        activePlayerName={activePlayerName}
        measurements={measurements}
        setCurrentTitle={setCurrentTitle}/>) 
      }
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
        activePlayerRank={activePlayerRank}
      />
    </Box>
    </Box>
  
</Box>
  );
  
}

export default App;
