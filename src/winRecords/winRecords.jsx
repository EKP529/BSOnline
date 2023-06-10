import React from "react";
import './winRecords.css';

export function WinRecords() {
  const [winRecords, setWinRecords] = React.useState([]);
  
  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(async () => {
    try {
      const response = fetch('/api/scores');
      setWinRecords(await response.json());
      localStorage.setItem('winRecords', JSON.stringify(winRecords));
    }
    catch {
      // If there was an error then just use the last saved records
      const winRecordsText = localStorage.getItem('winRecords');
      if (winRecordsText) {
        setWinRecords(JSON.parse(winRecordsText));
      }
    }
      // .then((response) => response.json())
      // .then((scores) => {
      //   setScores(scores);
      //   localStorage.setItem('scores', JSON.stringify(scores));
      // })
      // .catch(() => {
      //   const scoresText = localStorage.getItem('scores');
      //   if (scoresText) {
      //     setScores(JSON.parse(scoresText));
      //   }
      // });
  }, []);
  
  // Demonstrates rendering an array with React
  const winRecordsRows = [];
  if (winRecords.length) {
    for (const [i, record] of winRecords.entries()) {
      winRecordsRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{record.name.split('@')[0]}</td>
          <td>{record.score}</td>
          <td>{record.date}</td>
        </tr>
      );
    }
  } else {
    winRecordsRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }
  return (
    <main className="container-fluid text-center">
      <div>
        <h2>Win Records</h2>
        <table className="table table-warning table-striped-columns">
          <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody id="winRecords">{winRecordsRows}</tbody>
        </table>
      </div>
    </main>
  );
}