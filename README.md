# GuidedMeditationHub

Site: https://jacobwsmith19.github.io/GuidedMeditationHub/

This is an easy-to-use app for playing guided meditation audio files. A playlist is generated based on user criteria. The goal of this project was to keep the app as simple and practical as possible: the user should be listening to their desired audio file within three clicks.

# How it works:
Google Drive functions as the database for the audio files, and a Google Spreadsheet stores the data to generate the filtered playlists. Audio files are saved into the Google Drive and their links are added to the Google Spreadsheet, along with the necessary tags/title/description. The website uses the Google Sheets API to pull the audio file links from the spreadsheet and into the audio player. 

The user buttons correspond to different filters that have been preset in the spreadsheet. For example, when the "Walking" button is clicked, the app will pull audio files containing the "Walking" tag in the spreadsheet, and will generate a playlist of guided meditations meant to be listened to while walking. 

Since the buttons dynamically pull from the filtered spreadsheet tabs, and the tabs are dynamically filtered from the master tab in the spreadsheet, adding content to the app is quite simple:

1) Save a new audio file in Google Drive
2) Paste link to audio file in the spreadsheet's master tab
3) Add appropriate tags/title/description

Then, the next time a user clicks a button containing the audio file's tag, it will be included in their playlist.

# Problem being solved:
The intention behind this app was to solve an actual problem that currently exists- without paying monthly for a meditation app it can be time consuming trying to find free guided meditation audio files that fit your criteria. The value this app provides is twofold-

1) The audio files are quickly filtered for the user based on the most commonly used criteria
2) The time it takes to curate a database of high quality audio files no longer falls on the user's shoulders

# Tools used:
- Javascript
- jQuery
- Bootstrap
- CSS
- Google Sheets API
- Many hours curating :)
