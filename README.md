# Trivia Time!

This is the frontend repo for a trivia app that relies on socket.io from a node server. The frontend was designed in material UI (as a chance to learn the library).

## Play the Game

The game works without user authentication. To start a game, click start game and the socket.io wil create a game room. Only the creator of the room has control of starting the game. You can invite friends to join your room.

The user information, room, and scoring is stored in mongoDb Atlas. Using socket.io, the user is stored and removed once they open or close the app. This technique will prevent the database from becoming too large.

### Future todos

- add sendgrid or nodemailer to invite users from the admin window
- offer category options from trivia api
- look into other trivia apis (currently using opentdb.com)
