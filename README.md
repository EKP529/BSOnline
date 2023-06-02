# startup
The startup application for CS 260; BSOnline


## Elevator Pitch for BSOnline: 
Everyone’s cards are up and against their chests. Deception is in 
the air and ***no one*** can be trusted. Does everyone have what they say they have, or is it just BS? 
**Sniff out the liars, and they’ll pay the price, but call out the innocent and the price is _yours_ 
to pay.** What will you do? This is **BS**! Perhaps you’ve played the card game before? What if this BS 
fun went _digital_, and you could play with friends from your laptop or phone? With **BSOnline**, that 
imagination becomes **reality**!

## BSOnline Wireframes:
![Image of the wireframes for the BSOnline startup application](https://github.com/EKP529/startup/blob/78abc8bc7fff836a247af4a82151c49539de856a/BSOnline%20Wireframes.jpg)

## Key Features:
* Secure login over HTTPS
* Play a game with up to 8 people
* Interactive display that shows the cards in your pile
* Display shows what other players play in realtime 
* Record of players' wins is kept

## Startup Server IP Address:
18.218.74.203

## Startup URL:
https://startup.4thecode.click

## Bio URL:
https://4thecode.click

## CSS Startup Takeaways(5/1):
What I learned from the CSS Startup deliverable:
* I learned what the `calc()` does for values
* I learned about bootstrap limitations and debugging kinks in its use and overwriting
* I learned about display kinks between desktop/laptop and mobile; I had to change the units I used
in order to accommodate both mobile and desktop views

## Javascript Deliverable Takeaways(5/25):
* Adjusted HTML page by getting rid of placeholders and loading data through javascript
* Login data is saved to local storage through javascript
* Added javascript to make the cards playable and the game functional
* Added computer play for simple version of game
* Added win records functionality
* Added promise functionality to make computer call 'BS'

## Service Deliverable Takeaways(6/1):
* all static files are now loaded up through node.js static express middleware
* win records now displayed through service endpoints and node.js
* Quote from third party endpoint is now displayed on home/login screen with additional styling