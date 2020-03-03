# CreaTRIVIty

Want an easy, fun and entertaining way to play trivia with your friends? Look no further, as CreaTRIVIty is the perfect solution! CreaTRIVIty is a mutliplayer trivia game which can be used for teambuilding exercises, classroom learning or just fun between friends. Test your knowledge and try to set the high score!

## Getting Started

Use this application on Heroku: https://evening-beach-84352.herokuapp.com/

Step 1: Host a game on a device with a larger screen - this will be used to display the questions for all players. Click Create Game and select the number of questions, category and difficulty. Once your game has been created, you will receive a Room ID which is shared with all participants.

![Working Giphy](/public/Create-game.gif)

Step 2: Players will join the game from their own devices (phones/tablet/laptop) by first clicking Join Game and entering their Player Name as well as the Room ID they want to join. Click on Join Room and your player name will pop up on the host device. Once all players have joined, click Start Game on the host device to begin! 

![Working Giphy](/public/Join-game.gif)

Step 3: The first question will be displayed on the host device, as well as the Time Remaining (10 seconds) and four possible multiple choice answers. The players can click their answer choice on their personal devices, which will then transform to show the selected answer. Players get points for chosing the correct answer as well as how quickly they selected their answer.

![Working Giphy](/public/Answer-question.gif)

Step 4: After time runs out, the host screen will display which players answered correctly and those that answered incorrectly. Players can also see the result on their own screen, with colour coding! Click next question on the host device to proceed.

![Working Giphy](/public/Question-results.gif)

Step 5: Once all questions have been answered, the game is over! The Final Scores screen will be shown on the host device for all to see. The player's devices also show their scores and rankings relative to other players. To play again, simply refresh the page and create a new game. 

![Working Giphy](/public/Final-results.gif)

## Built With

Development Tools:
  * [Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)

Front end:
  * [Bootstrap](https://getbootstrap.com)
  * [React-Bootstrap](https://react-bootstrap.github.io/)
  * [React](https://reactjs.org/)
  * [Create-React-App](https://github.com/facebook/create-react-app)

Back end and middleware:
  * [socket.io](https://socket.io/)
  * [axios](https://www.npmjs.com/package/axios)
  * [express](https://www.npmjs.com/package/express)
  * [opentdb](https://opentdb.com/) 

## Contributing

This project is not open to contributing.

## Versioning

This project does not use versions. 

## Authors

* **Patrick Abromeit** - *Main Contributor* - [pabrome](https://github.com/pabrome)
* **Paul Bernard-Hall** - *Main Contributor* - [PaulB-H](https://github.com/PaulB-H)

See also the list of [contributors](https://github.com/PaulB-H/ReactTrivia/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
