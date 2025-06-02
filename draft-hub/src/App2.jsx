import React from "react";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Title Section */}
      <div style={{ width: "100%", padding: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>NBA Draft Hub</h1>
      </div>

      {/* Scrollable Content Section */}
      <div
        style={{
          flex: 1,
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            minWidth: "calc(100vw - 100px)", // trigger horizontal scroll if screen too small
            margin: "0 50px",
            height: "100%", // stretch to bottom
          }}
        >
          {/* Left (80%) */}
          <div style={{ flexBasis: "80%", flexShrink: 0, background: "#f0f0f0" }}>
            <div style={{ padding: "20px" }}>BigBoard goes here</div>
          </div>

          {/* Right (20%) */}
          <div style={{ flexBasis: "20%", flexShrink: 0, background: "#ddd" }}>
            <div style={{ padding: "20px" }}>ScoutColumn goes here</div>
          </div>
        </div>
      </div>
    </div>
  );
}
