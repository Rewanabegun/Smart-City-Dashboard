import React from "react";

const Reports = () => {

  const handleDownload = () => {
    const reportData = `
SMART CITY REPORT - VIJAYAWADA

📊 Daily Summary:
- Average Traffic: 65%
- Average AQI: 210

🚨 Critical Alerts:
- Accident at Benz Circle
- Roadblock at MG Road

Generated on: ${new Date().toLocaleString()}
`;

    const blob = new Blob([reportData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "SmartCity_Report.txt";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">

      <h1 className="title">📄 Reports</h1>

      {/* Daily Summary */}
      <div className="card">
        <h3>📍 Daily Summary</h3>
        <p>Average Traffic: 65%</p>
        <p>Average AQI: 210</p>
      </div>

      {/* Alerts */}
      <div className="card">
        <h3>🚨 Critical Alerts</h3>
        <ul>
          <li>Accident at Benz Circle</li>
          <li>Roadblock at MG Road</li>
        </ul>
      </div>

      {/* Download */}
      <div className="card">
        <button onClick={handleDownload} className="download-btn">
          ⬇ Download Report
        </button>
      </div>

    </div>
  );
};

export default Reports;