# twitchPlaysArknights
twitch chat plays arknights


# install
npm i

to run program
./twitchPlaysArknights.js eango_ 5-11.json

# how chat plays
have "battle-ship like" map overlay and here is what chatters can write

1. to deploy operator: "1 A4 down" ====> places operator in 1st position at A4 on board facing down
2. to activate operator: "use A4" =====> uses the operator at A4. If no operator there just does nothing.
3. to undeploy operator: "undep A4" =====> undeploys the operator at A4 if present.


with above 3 simple commands, and taking the time to map out coordinates of the map on 1080p resolution, twitch chat can play any arknights map

# directions
hard coded for 1080p resolution lol so have game fullscreen on 1080p monitor.
use one of the maps supported (will have a maps folder for supported maps).

run program to listen to your chat room, example: ./twitchPlaysArknights.js eango_ 5-11.json

# notes
maps need to be hard coded unforunately since maps will have different square sizes.
