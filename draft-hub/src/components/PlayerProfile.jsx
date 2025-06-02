import {useState, React} from "react";
import { Grid, Card, CardContent, Typography, Avatar, 
         Divider, Box, TableContainer, Paper, Table, 
         TableHead, TableRow, TableCell, TableBody, Button,
         TextField,  Dialog,
         DialogTitle,
         DialogContent,
         DialogActions,
         IconButton
} from "@mui/material";

const defaultPlayerImg = "https://cdn.nba.com/headshots/nba/latest/1040x760/1642284.png"

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";


/**
 * Handles adding, editing, and deleting scouting reports.
 * Uses a dialog to display reports and inputs.
 */
const AddReports = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewReport("");
    setEditingIndex(null);
  };

  const handleAddReport = () => {
    if (newReport.trim() !== "") {
      setReports((prev) => [...prev, newReport.trim()]);
      setNewReport("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(reports[index]);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      setReports((prev) =>
        prev.map((r, i) => (i === editingIndex ? editedText.trim() : r))
      );
      setEditingIndex(null);
      setEditedText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedText("");
  };

  const handleDelete = (index) => {
    setReports((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        onClick={handleDialogOpen}
        disabled={false}
        sx={{
            backgroundColor: '#00538C',
            color: 'white',
            borderColor: '#00538C',
            '&:hover': {
              backgroundColor: 'darkblue',
              borderColor: 'darkblue',
            },
          }}
      >
        Scouting Reports
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">Scouting Reports</Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: 300 }}>
          {reports.map((report, i) => (
            <Box key={i} display="flex" alignItems="center" mb={1}>
              {editingIndex === i ? (
                <>
                  <TextField
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    fullWidth
                    multiline
                    size="small"
                  />
                  <IconButton onClick={handleSaveEdit} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelEdit} color="warning">
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    • {report}
                  </Typography>
                  <IconButton onClick={() => handleEdit(i)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(i)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ))}

          <Box mt={2}>
            <TextField
              label="Add New Report"
              multiline
              rows={2}
              fullWidth
              value={newReport}
              onChange={(e) => setNewReport(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddReport}
              sx={{ mt: 1 }}
            >
              Add
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

/**
 * Displays player profile info including photo, physical measurements,
 * and season/game stats with option to toggle total vs per game stats.
 */

const PlayerProfile = ({ players, gameLogs, seasonLogs, activePlayerId, activePlayerName, setCurrentTitle, measurements }) => {
  // Get the current player data
  const player = players.find((p) => p.playerId === activePlayerId);
  const imgSrc = player.photoUrl || defaultPlayerImg;
  const playerMetrics = measurements.find((m) => m.playerId === activePlayerId);
  const [changeViewText, setChangeViewText] = useState("Show Total Stats");

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
  const height = player?.height ? inchesToHeight(player.height) : "--";
  const weight = player?.weight || "--";
  const birthday = player?.birthDate || "";
  const age = birthday ? getAgeFromBirthday(birthday) : "--";
  const wingspan = playerMetrics?.wingspan || "--";
  const reach = playerMetrics?.reach || "--";
  const maxVert = playerMetrics?.maxVertical || "--";
  const noStepVertical = playerMetrics?.noStepVertical || "--";
  const bodyFat = playerMetrics?.bodyFat || "--";
  const agility = playerMetrics?.agility || "--";
  const sprint = playerMetrics?.sprint || "--";
  const shuttleBest = playerMetrics?.shuttleBest || "--";
  const ptsTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.PTS);
  const rebTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.TRB);
  const astTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.AST);
  const stlTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.STL);
  const blkTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.BLK);
  const gameTotal = playerSeasonLog.GP;
  const tovTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.TOV);
  const gameStartedTotal =playerSeasonLog.GS;
  const minTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.MP);
  const pfTotal = Math.floor(playerSeasonLog.GP * playerSeasonLog.PF);



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
  const totalsLabels = {
    "PTS": ptsTotal,
    "REB": rebTotal,
    "AST": astTotal,
    "G": gameTotal,
    "GS":  gameStartedTotal,
    "STL": stlTotal,
    "BLK": blkTotal,
    "TOV": tovTotal,
    "PF": pfTotal,
    "MIN": minTotal
  }

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
            {/* Player Card */}
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
                fontSize: "clamp(1rem, 4vw, 2rem)",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center"
                }}>
              {activePlayerName}
            </Typography>
          </Box>
            {/* Player Photo */}
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

           
            <Box display="flex" >
                <Typography component="span" fontWeight="bold">Height: </Typography>
                <Typography variant="body1" mx={1}>{height}</Typography>
            </Box>
            <Box display="flex">
                <Typography component="span" fontWeight="bold">Weight:</Typography>
                <Typography variant="body1" mx={1} >{weight} lbs</Typography>
                
            </Box>
            <Box display="flex" >
                <Typography component="span" fontWeight="bold">Age: </Typography>
                <Typography variant="body1" mx={1}>{age}</Typography>
            </Box>

           
            <Box display="flex" >
              <Typography component="span" fontWeight="bold">Team: </Typography>
              <Typography variant="body2" mx={1}>{team}</Typography>
            </Box>
            <Box display="flex" >
              <Typography component="span" fontWeight="bold">League: </Typography>
              <Typography variant="body2" mx={1}>{league} </Typography>
            </Box>
            <Box justifyContent="center" display="flex" marginTop="50px">
              <AddReports/>
            </Box>
            
          </CardContent>
        </Card>
       </Box>     
 
      <Box sx={{ flex: 8, height: "100%"}}>
       {/* Season Stats Card */}
     
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
                   if (changeViewText == "Show Total Stats"){
                    setChangeViewText("Show Per Game Stats");
                   }
                   else{
                    setChangeViewText("Show Total Stats");
                   }
                   
                  }}
              >
                {changeViewText}
              </Typography>
            </Box>
            <Box display="flex" gap={4} mb={3}>
            <Box textAlign="center">
                  <Typography fontWeight="bold" minWidth="40px" variant="overline" display="block" backgroundColor="#f2f2f2">Season</Typography>
                  <Typography variant="h6"  >
                    2024-25
                  </Typography>
                </Box>
                {changeViewText == "Show Per Game Stats" && ["MIN", "G","GS", "PTS", "REB", "AST", "STL", "BLK"].map((label) => (
                <Box key={label} textAlign="center">
                  <Typography fontWeight="bold" minWidth="40px" variant="overline" display="block" backgroundColor="#f2f2f2">
                    {label}
                  </Typography>
                  <Typography variant="h6"  >
                    {totalsLabels[label]}
                  </Typography>
                </Box>
              ))}
              {changeViewText == "Show Total Stats" && ["MIN", "G","GS", "PPG", "RPG", "APG", "FG%", "3P%", "SPG", "BPG"].map((label) => (
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
            
            {/* Physical Measurements Card */}
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" color="error" fontWeight="bold">
              PLAYER METRICS
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Wingspan</Typography>
                <Typography  textAlign="center">{wingspan}{wingspan !== "--" && ('"')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Reach</Typography>
                <Typography textAlign="center">{reach}{reach !== "--" && ('"')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Max Vert</Typography>
                <Typography  textAlign="center">{maxVert}{maxVert !== "--" && ('"')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">No Step Vert</Typography>
                <Typography  textAlign="center">{noStepVertical}{noStepVertical !== "--" && ('"')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Body Fat</Typography>
                <Typography  textAlign="center">{bodyFat}{bodyFat !== "--" && ("%")}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Agility</Typography>
                <Typography  textAlign="center">{agility}{agility !== "--" && ("s")}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Sprint</Typography>
                <Typography  textAlign="center">{sprint}{sprint !== "--" && ("s")}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">Shuttle Best</Typography>
                <Typography  textAlign="center">{shuttleBest}{shuttleBest !== "--" && ("s")}</Typography>
              </Grid>
            </Grid>
               {/* Game Log Card */}
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
