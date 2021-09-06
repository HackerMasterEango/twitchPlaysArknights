# Twitch Chat Plays Arknights Desktop App

This application allows a twitch chat to play the game arknights. Inspired by infamous "twitch plays" streams I decided to make a twitch plays for arknights.

Arknights is a popular mobile tower defense game. Learn about Arknights here: https://www.arknights.global/

# How to use as a streamer

If you're a streamer and want to give this a go with your community do this:

1. Just install the app unzip, and run
2. Make sure when picking the map you want to play to insert your twitch username
3. Use the map overlays I provided in the mapOverlays folder on your obs scene, or make your own overlay.

# How to debug locally

If you want to contribute adding more maps or just fix some of this bad code do the following

1. git clone https://github.com/HackerMasterEango/twitchPlaysArknights
2. npm i

IMPORTANT DEVELOPMENT NOTE: robotjs and electron packages seem to not get along well when instantiating a child process from electron.
If running the full electron app you may need to run the following for it to work

1. ./node_modules/.bin/electron-rebuild

If wanting to debug the robotjs application locally and getting errors you will need to delete the node_modules folder and reinstall robotjs (or just all packages)

1. rm -rf node_modules
2. npm i
