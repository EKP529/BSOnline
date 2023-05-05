function loadWinRecords() {
    let winRecords = [];
    const winRecordsText = localStorage.getItem('winRecords');
    if (winRecordsText) {
        winRecords = JSON.parse(winRecordsText);
    }

    const tableBodyEl = document.querySelector('#winRecords');

    if (winRecords.length) {
        for (const [i, score] of winRecords.entries()) {
            const positionTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const winsTdEl = document.createElement('td');
            const dateTdEl = document.createElement('td');

            positionTdEl.textContent = i + 1;
            nameTdEl.textContent = score.name;
            winsTdEl.textContent = score.wins;
            dateTdEl.textContent = score.date;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(positionTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(winsTdEl);
            rowEl.appendChild(dateTdEl);

            tableBodyEl.appendChild(rowEl);
        }
    } else {
        tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to win a game</td></tr>';
    }
}

loadWinRecords();