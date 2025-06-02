import React, { useState, useMemo } from "react";
import PlayerCard from "./PlayerCard";
import { Grid, Pagination, Typography, Box, Select, MenuItem } from "@mui/material";
//import draftData from "../data/intern_project_data.json"; // Move JSON load here
import draftData from '../data/ivan_test_data.json';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];


function calculateAverageRank(rankings) {
    const values = Object.entries(rankings)
      .filter(([key, val]) => key !== "playerId" && typeof val === "number")
      .map(([, val]) => val);
    if (values.length === 0) return null;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }


function BigBoard({ activePlayerId , setActivePlayerId, setActivePlayerName, seasonLogs, setCurrentTitle, setActivePlayerRank}) {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  // Combine scout + bio
  const combinedPlayers = useMemo(() => {
    return draftData.bio
      .map((player) => {
        const rankData = draftData.scoutRankings.find(
          (r) => r.playerId === player.playerId
        );
        const averageRank = calculateAverageRank(rankData || {});
        return {
          ...player,
          averageRank,
        };
      })
      .filter((p) => p.averageRank !== null)
      .sort((a, b) => a.averageRank - b.averageRank)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
  }, []);

  const handlePageChange = (event, value) => setPage(value);
  const handleRowsChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(1); // reset to first page
  };

  const paginatedPlayers = combinedPlayers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );


  return (

    <Box data-name="Board" sx={{// minWidth: "1000px"

    }}>

      <Box data-name="" display="flex" justifyContent="space-between" alignItems="left" mb={2}>

        <Typography>Rows per page:</Typography>
        <Select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(1);
          }}
          size="small"
        >
          {[10, 20, 50].map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>

        {paginatedPlayers.map((player) => (
          <PlayerCard
            key={player.playerId}
            player={player}
            seasonLogs={seasonLogs}
            setActivePlayerId={setActivePlayerId}
            setActivePlayerName={setActivePlayerName}
            setCurrentTitle={setCurrentTitle}
            setActivePlayerRank={setActivePlayerRank}
            activePlayerId={activePlayerId}
            //onHover={() => setActivePlayerId(player.playerId)}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(combinedPlayers.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default BigBoard;
