## Hnefatafl

This is a web app that allows two people sharing a screen to play this board game. It uses pure React and was built for two reasons:

1. As an exercise with which to learn React fundamentals. 

2. I have wanted to play this game for awhile but boards are hard to find. I built this to play against my brother when he came to visit. 

#### Things I Learned

* With an arrow function and spreading, a deep copy of a two-dimensional array can now be done in one line:

        const newBoard = this.state.board.map(row => [ ...row ]);

* State management is hard. With an app that passes down state and update functions to the board and then each square, keeping track of everything can be tiring. A grid like this might be well suited for a library like Redux.

* It never hurts to go back and brush up on the basics. Using CSS components for the game pieces seemed like an easy option to make the game playable quickly, but there are probably more suitable options.

#### Next Time

* Better responsiveness
* Modularize game logic
* Networked