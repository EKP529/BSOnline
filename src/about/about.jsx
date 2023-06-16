import React from "react";
import './about.css';

export function About() {
  return (
    <main className="container-fluid text-center">
      <div>
        <h2>Game Synopsis</h2>
        <br/>
          <p>
            BSOnline is an online card game where players seek to be the first
            to discard all the cards in their pile. Each player, in turn,
            announces the card and the amount that they want to discard. During
            a player's turn, each other player has 7 seconds to call that player's
            bluff. After 7 seconds, if no call is made the player's discard is accepted
            and the next player plays. If a player's bluff is correctly called that
            player must assume all the cards in the pile, if the bluff is incorrectly
            called, the calling player must pick up the pile. The game continues in this
            manner until the first player discards all of their cards.
          </p>
      </div>
    </main>
  );
}