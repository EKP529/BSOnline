# startup
The startup application for CS 260; BSOnline




## Notes(3/16): 
I learned a bit more about Git and GitHub and made some conflicting changes
that I fixed. I'm more comfortable with GitHub now, but it still may take some getting used to
as well as some further improvement which will come as I go along.


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
* Interactive display that shows the cards in your hand
* Display shows what other players play in realtime 
* Record of players' wins is kept

## Startup Server IP Address:
18.218.74.203

## Startup Server URL:
https://4thecode.click

## SSH into Server:
from within the CS 260 directory: `ssh -i production.pem ubuntu@18.218.74.203`

## Notes on Simon.html(3/19):
I was a bit worried about the complexity of adding pages to the website, but 
through the simon.html code I learned that it is pretty straight forward. I 
also learned, through the deployFile.sh code, about how to add different webpages for 
different subdomains of my domain. I can do similar code for my startup depending 
on my needs. The html files really are pretty simple and bare-bones and I learned 
that the Javscript and CSS files are what really bring the webpages to life, though
the HTML files are still essential.
