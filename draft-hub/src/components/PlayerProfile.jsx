import {useState, React} from "react";
import { Grid, Card, CardContent, Typography, Avatar, 
         Divider, Box, TableContainer, Paper, Table, 
         TableHead, TableRow, TableCell, TableBody, Button,
         TextField
} from "@mui/material";

const defaultPlayerImg = "https://cdn.nba.com/headshots/nba/latest/1040x760/1642284.png"

const AddReports = () => {
    const [showInput, setShowInput] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [inputText, setInputText] = useState("");
    const [reports, setReports] = useState([]);
  
    const handleAddReportClick = () => {
      setShowInput(true);
      setShowReports(false);
    };
  
    const handleSubmit = () => {
      if (inputText.trim() !== "") {
        setReports((prev) => [...prev, inputText.trim()]);
        setInputText("");
        setShowInput(false);
        setShowReports(true);
      }
    };
  
    return (
      <Box>
        <Button variant="contained" size="small" onClick={handleAddReportClick} sx={{ mr: 1 }}>
          Add Report
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => setShowReports((prev) => !prev)}
          disabled={reports.length === 0}
        >
          {showReports ? "Hide Reports" : "Show Reports"}
        </Button>
  
        {showInput && (
          <Box mt={1}>
            <TextField
              label="Enter Report"
              multiline
              rows={3}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button 
              variant="contained" 
              size="small" 
              onClick={handleSubmit} 
              sx={{ mt: 1 }}
            >
              Submit
            </Button>
          </Box>
        )}
  
        {showReports && reports.length > 0 && (
          <Box mt={2} sx={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", p: 1, borderRadius: 1 }}>
            {reports.map((report, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                • {report}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    );
  };

const PlayerProfile = ({ players, gameLogs, seasonLogs, activePlayerId, activePlayerName, setCurrentTitle }) => {
  // Get the current player data
  const player = players.find((p) => p.playerId === activePlayerId);
  const imgSrc = player.photoUrl || defaultPlayerImg;

  function inchesToHeight(inches) {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}-${remainingInches}`;
  }
  function getAgeFromBirthday(birthdayStr) {
    const birthDate = new Date(birthdayStr);
    if (isNaN(birthDate)) return "--"; // Invalid date check
  
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!hasHadBirthdayThisYear) {
      age--;
    }
  
    return age;
  }

  // Set player info
  const playerSeasonLog = seasonLogs.find(log => log.playerId === activePlayerId);
  const playerGameLogs = gameLogs.filter(log => log.playerId === activePlayerId);
  const photoUrl = player?.photoUrl || "https://cdn.nba.com/headshots/nba/latest/1040x760/1642284.png";
  const team = player?.currentTeam || "";
  const league = player?.league || "";
  const ppg = playerSeasonLog?.pts ?? "--";
  const height = player?.height ? inchesToHeight(player.height) : "--";
  const weight = player?.weight || "--";
  const birthday = player?.birthDate || "";
  const age = birthday ? getAgeFromBirthday(birthday) : "--";
  const birthplace = player?.birthplace || "Hopkins, Minnesota";
  const college = player?.college || "UConn";
  const country = player?.country || "United States";
  const statsLabels = {
    "PPG": "PTS",
    "RPG": "TRB",
    "APG": "AST",
    "FG%": "FG%",
    "3P%": "3P%",
    "G": "GP",
    "GS": "GS",
    "SPG": "STL",
    "BPG": "BLK",
    "TOV": "TOV",
    "PF": "PF",
    "FTP": "FTP",
    "MIN": "MP"
  };
  const careerDescription = player?.careerDescription || `Career Highlights: NCAA Champion (2025), BIG EAST Player of the Year (2025), All-BIG EAST First Team (2025)...`;

  return (
    <Box sx={{ 
        height: "calc(100vh - 180px)", 
        width: "100%", 
        display: "flex", 
        flexDirection: "row", 
        paddingTop: "30px",
        flexGrow: 1 }}>
      <Box sx={{ flex: 2, marginRight: 2, height: "100%"}}>
      {/* Left Panel */}
      
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            
          <Box sx={{ 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            width: "100%", 
            display: "block" 
           }}>
             <Typography
                fontWeight="bold"
                gutterBottom
                sx={{
                fontSize: "clamp(1rem, 4vw, 2rem)", // auto scales between 1rem and 2rem
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center"
                }}>
              {activePlayerName}
            </Typography>
          </Box>
            <Box display="flex" justifyContent="center" my={2}>
            <Avatar
              src={photoUrl}
              alt={activePlayerName}
              sx={{ 
                width: "200px", 
                height: "auto", 
               
                borderRadius: 1 
            }}
              variant="square"
            />
            </Box>
            

            <Divider sx={{ my: 2 }} />
           
            <Typography variant="subtitle1" color="error" fontWeight="bold">
              PROSPECT INFO
            </Typography>

            {/* Section 1*/}
            <Box display="flex" >
                <Typography variant="body1" mx={1}>{height}</Typography>
                <Typography component="span" fontWeight="bold"> | </Typography>
                <Typography variant="body1"mx={1} >{weight} lbs</Typography>
                <Typography component="span" fontWeight="bold"> | </Typography>
                <Typography variant="body1" mx={1}>Age: {age}</Typography>
            </Box>

            {/* Section 2*/}
            <Box display="flex" >
              <Typography variant="body2" mx={1}>{team} -</Typography>
              <Typography variant="body2" >{league} </Typography>
              
            </Box>
            <Box display="flex" >
            <AddReports/>
            </Box>
            
          </CardContent>
        </Card>
       </Box>     
 
      <Box sx={{ flex: 8, height: "100%"}}>
      {/* Right Panel */}
     
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" color="error" fontWeight="bold">
                SEASON STATS
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                   setCurrentTitle("2025 NBA Draft Big Board")
                  }}
              >
                View All Prospects
              </Typography>
            </Box>
            <Box display="flex" gap={4} mb={3}>
            <Box textAlign="center">
                  <Typography fontWeight="bold" minWidth="40px" variant="overline" display="block" backgroundColor="#f2f2f2">Season</Typography>
                  <Typography variant="h6"  >
                    2024-25
                  </Typography>
                </Box>
              {["MIN", "G","GS", "PPG", "RPG", "APG", "FG%", "3P%", "SPG", "BPG"].map((label) => (
                <Box key={label} textAlign="center">
                  <Typography fontWeight="bold" minWidth="40px" variant="overline" display="block" backgroundColor="#f2f2f2">
                    {label}
                  </Typography>
                  <Typography variant="h6"  >
                    {label === "GS" || label === "G" ? playerSeasonLog[statsLabels[label]]:
                      playerSeasonLog[statsLabels[label]].toFixed(1)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" color="error" fontWeight="bold">
              PROSPECT INFO
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
            
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Height</Typography>
                <Typography>{height}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Weight</Typography>
                <Typography>{weight}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Birthdate</Typography>
                <Typography>{birthday}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Birthplace</Typography>
                <Typography>{birthplace}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">College/Club</Typography>
                <Typography>{college}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Country</Typography>
                <Typography>{country}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" color="error" fontWeight="bold">
              GAME LOGS
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small" aria-label="game logs table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#B8C4CA' }}>
                        <TableCell align="center"><strong>DATE</strong></TableCell>
                        <TableCell align="center"><strong>OPPONENT</strong></TableCell>
                        <TableCell align="center"><strong>RESULT</strong></TableCell>
                        <TableCell align="center"><strong>MIN</strong></TableCell>
                        <TableCell align="center"><strong>FG</strong></TableCell>
                        <TableCell align="center"><strong>FT</strong></TableCell>
                        <TableCell align="center"><strong>PTS</strong></TableCell>
                        <TableCell align="center"><strong>REB</strong></TableCell>
                        <TableCell align="center"><strong>AST</strong></TableCell>
                        <TableCell align="center"><strong>BLK</strong></TableCell>
                        <TableCell align="center"><strong>STL</strong></TableCell>
                        <TableCell align="center"><strong>PF</strong></TableCell>
                        <TableCell align="center"><strong>TO</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {playerGameLogs.map((log, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{new Date(log.date).toLocaleDateString()}</TableCell>
                            <TableCell align="center">{log.opponent}</TableCell>
                            <TableCell align="center">
                                {(() => {
                                    const isHome = log.isHome === 1;
                                    const teamScore = isHome ? log.homeTeamPts : log.visitorTeamPts;
                                    const oppScore = isHome ? log.visitorTeamPts : log.homeTeamPts;
                                    const isWin = teamScore > oppScore;
                                    const outcome = isWin ? 'W' : 'L';
                                    const high = Math.max(log.homeTeamPts, log.visitorTeamPts);
                                    const low = Math.min(log.homeTeamPts, log.visitorTeamPts);

                                    return (
                                    <span>
                                        <span style={{ color: isWin ? 'green' : 'red', fontWeight: 'bold' }}>
                                        {outcome}
                                        </span>{' '}
                                        {high}-{low}
                                    </span>
                                    );
                                })()}
                            </TableCell>
                            <TableCell align="center">
                                {parseInt(log.timePlayed.split(':')[0], 10)}
                            </TableCell>
                            <TableCell align="center">{log.fgm}-{log.fga}</TableCell>
                            <TableCell align="center">{log.ftm}-{log.fta}</TableCell>
                            <TableCell align="center">{log.pts}</TableCell>
                            <TableCell align="center">{log.reb}</TableCell>
                            <TableCell align="center">{log.ast}</TableCell>
                            <TableCell align="center">{log.blk}</TableCell>
                            <TableCell align="center">{log.stl}</TableCell>
                            <TableCell align="center">{log.pf}</TableCell>
                            <TableCell align="center">{log.tov}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

          </CardContent>
        </Card>
      
      </Box>
    </Box>
   
  );
};

export default PlayerProfile;
