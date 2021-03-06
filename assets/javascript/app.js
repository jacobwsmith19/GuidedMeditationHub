// FIRST TRACK KEY:
// 0-Title: response.sheets[0].data[0].rowData[1].values[0].effectiveValue.stringValue
// 1-File: response.sheets[0].data[0].rowData[1].values[1].effectiveValue.stringValue
// 2-First: response.sheets[0].data[0].rowData[1].values[2].effectiveValue.stringValue
// 3-Last: response.sheets[0].data[0].rowData[1].values[3].effectiveValue.stringValue
// 4-Duration: response.sheets[0].data[0].rowData[1].values[4].effectiveValue.numberValue
// 5-Description: response.sheets[0].data[0].rowData[1].values[5].effectiveValue.stringValue
// 6-Short: response.sheets[0].data[0].rowData[1].values[6].effectiveValue.boolValue
// 7-Long: response.sheets[0].data[0].rowData[1].values[7].effectiveValue.boolValue
// 8-Eyes-open: response.sheets[0].data[0].rowData[1].values[8].effectiveValue.boolValue
// 9-Sound: response.sheets[0].data[0].rowData[1].values[9].effectiveValue.boolValue
// 10-Walking: response.sheets[0].data[0].rowData[1].values[10].effectiveValue.boolValue
// 11-Lecture: response.sheets[0].data[0].rowData[1].values[11].effectiveValue.boolValue
// 12-id: response.sheets[0].data[0].rowData[1].values[12].effectiveValue.numberValue

// Global variables
var playlist = [];
var playingIndex = 0;
var content;
var heart;

// Legend for filters
var filtersArr = [];
const shortFilter = 6;
const longFilter = 7;
const eyesOpenFilter = 8;
const soundFilter = 9;
const walkingFilter = 10;
const lectureFilter = 11;

// Hides description box & disables next/prev/shuff buttons until track is clicked
$('#description-div').hide();
$('#add-button').hide();
$('#remove-button').hide();

// Ajax call to pull data from Google spreadsheet
var part1 = "4/?ke";
var part2 = "y=AIzaSyCIlkGoF9";
var part3 = "ptyUJZCB8sy7lCTnK-Bq58Bcw&inc";
var part4 = "ludeGridData=true";
var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT" + part1 + part2 + part3 + part4;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    content = response.sheets;
    // Filter buttons enabled after AJAX call to prevent error
    $('#short-button').attr("disabled", false);
    $('#long-button').attr("disabled", false);
    $('#walking-button').attr("disabled", false);
    $('#eyes-open-button').attr("disabled", false);
    $('#sound-button').attr("disabled", false);
    $('#lecture-button').attr("disabled", false);
    $('#favorites-button').attr("disabled", false);
    $('#all-button').attr("disabled", false);
    allTracks();
}); 

console.log("Filters array: " + filtersArr);

// Short button
$("#short-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != shortFilter);
    } else {
        $(this).addClass('active');
        $('#long-button').removeClass('active');
        filtersArr.push(shortFilter);
        filtersArr = filtersArr.filter(x => x != longFilter);
    }
    console.log(filtersArr);
    createPlaylist();
});

// Long button
$("#long-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != longFilter);
    } else {
        $(this).addClass('active');
        $('#short-button').removeClass('active');
        filtersArr.push(longFilter);
        filtersArr = filtersArr.filter(x => x != shortFilter);
    }
    console.log(filtersArr);
    createPlaylist();
}); 

// Walking button
$("#walking-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != walkingFilter);
    } else {
        $(this).addClass('active');
        filtersArr.push(walkingFilter);
    }
    console.log(filtersArr);
    createPlaylist();
}); 

// Eyes open button
$("#eyes-open-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != eyesOpenFilter);
    } else {
        $(this).addClass('active');
        filtersArr.push(eyesOpenFilter);
    }
    console.log(filtersArr);
    createPlaylist();
}); 

// Lecture button
$("#lecture-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != lectureFilter);
    } else {
        $(this).addClass('active');
        filtersArr.push(lectureFilter);
    }
    console.log(filtersArr);
    createPlaylist();
}); 

// Sound button
$("#sound-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filtersArr = filtersArr.filter(x => x != soundFilter);
    } else {
        $(this).addClass('active');
        filtersArr.push(soundFilter);
    }
    console.log(filtersArr);
    createPlaylist();
}); 

// All tracks button
$("#all-button").on("click", function(){
    allTracks();
});

// Next button
$("#next-button").on("click", function(){
    playingIndex++;
    if (playingIndex >= playlist.length){
        playingIndex = 0;
    }

    var playNext = playlist[playingIndex];
    $("#currentlyPlaying").attr("src", playNext.src);
    $("#audioPlayer")[0].load();

    // Clears description box, then populates with data from description column in spread sheet
    $("#description").html("");
    $("#description").append(playNext.desc);

    // Clears currently playing box, then populates with data from title column in spread sheet
    $("#current-meditation").html("");
    $("#current-meditation").append(playNext.title);

    $('.playing').attr('class', "current-playlist");
    $(`.current-playlist[data-index="${playingIndex}"]`).attr('class', 'current-playlist playing');

    console.log("playingIndex: " + playingIndex);
})

// Previous button
$("#previous-button").on("click", function(){
    playingIndex--;
    if (playingIndex < 0){
        playingIndex = playlist.length - 1;
    }

    var playPrev = playlist[playingIndex];
    $("#currentlyPlaying").attr("src", playPrev.src);
    $("#audioPlayer")[0].load();

    // Clears description box, then populates with data from description column in spread sheet
    $("#description").html("");
    $("#description").append(playPrev.desc);

    // Clears currently playing box, then populates with data from title column in spread sheet
    $("#current-meditation").html("");
    $("#current-meditation").append(playPrev.title);

    $('.playing').attr('class', "current-playlist");
    $(`.current-playlist[data-index="${playingIndex}"]`).attr('class', 'current-playlist playing');

    console.log("playingIndex: " + playingIndex);
})

// Shuffle function and button
function shuffleTracks(){
    var currentIndex = playlist.length;
    var temporaryValue;
    var randomIndex;
    playingIndex = $('.playing').attr('data-index');
    var track = playlist[playingIndex];
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;

        temporaryValue = playlist[currentIndex];
        playlist[currentIndex] = playlist[randomIndex];
        playlist[randomIndex] = temporaryValue;
    }
    renderPlaylist(playlist);
    playingIndex = playlist.indexOf(track);
    $(`.current-playlist[data-index="${playlist.indexOf(track)}"]`).attr('class', 'current-playlist playing');

    console.log("playingIndex: " + playingIndex);
}

$("#shuffle-button").on("click", function(){
    shuffleTracks();
})

// Populates playlist array
function createPlaylist(){
    $('#description-div').show();
    $("#playlist").html("");
    playlist = [];
    if (filtersArr.length === 0){
        allTracks();
    }else{
        for (i = 1; i < content[0].data[0].rowData.length; i++){

            if (filtersArr.length === 1){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                }
            }else if (filtersArr.length === 2){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[1]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                }
            }else if (filtersArr.length === 3){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[1]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                }
            }else if (filtersArr.length === 4){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[1]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[3]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                } 
            }else if (filtersArr.length === 5){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[1]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[3]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[4]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                }
            }else if (filtersArr.length === 6){
                if (content[0].data[0].rowData[i].values[filtersArr[0]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[1]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[3]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[2]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[4]].effectiveValue.boolValue && content[0].data[0].rowData[i].values[filtersArr[5]].effectiveValue.boolValue){
                    playlist.push({
                        src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                        desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                        title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                        duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                        id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                    });
                }
            }   
        };
    }
    console.log(playlist);
    renderPlaylist(playlist);
};

// Loads all tracks into playlist
function allTracks(){
    $('#description-div').show();
    $("#playlist").html("");
    playlist = [];

    for (i = 1; i < content[0].data[0].rowData.length; i++){
        playlist.push({
            src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
            desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
            title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
            duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
            id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
        });
    }
    shuffleTracks();
}

// Populates playlist div based on playlist array
function renderPlaylist(playlist){
    $("#playlist").html("");
    userFavorites = JSON.parse(localStorage.getItem('localFavorites')) || [];
    console.log("User favorites: " +userFavorites);
    playlist.forEach((item, i) => {
        const formattedDuration = moment.utc(item.duration*1000).format('m:ss');
        const stringNum = item.id.toString();
        if (userFavorites.includes(stringNum)){
            heart = `<i class="fas fa-heart"></i>`;
        }else{
            heart = "";
        }
        $("#playlist").append(`
            <div class= 'current-playlist' 
            src= '${item.src}' 
            description= '${item.desc}'
            title= '${item.title}'
            duration = '${item.duration}'
            data-index='${i}'
            id='${item.id}'>&nbsp; 
            ${item.title}&nbsp;(${formattedDuration})&nbsp;<span id="heart">${heart}&nbsp;</span>
            </div>
        `);
    });

    playAudio();
}

// Loads new audio file into the audio player and updates description box
function playAudio(){
    $(".current-playlist").on("click", function(x) {
        x.preventDefault();

        $('.playing').attr('class', "current-playlist");
        $(this).attr('class', 'current-playlist playing');

        // Enables next/prev/shuffle buttons
        $('#next-button').attr("disabled", false);
        $('#previous-button').attr("disabled", false);
        $('#shuffle-button').attr("disabled", false);

        var currentId = $('.playing').attr('id');
        userFavorites = JSON.parse(localStorage.getItem('localFavorites')) || [];
        const stringNum = currentId.toString();
        if (userFavorites.includes(stringNum)){
            $('#remove-button').attr("disabled", false);
            $('#remove-button').show();
            $('#add-button').attr("disabled", true);
            $('#add-button').hide();
        }else{
            $('#remove-button').attr("disabled", true);
            $('#remove-button').hide();
            $('#add-button').attr("disabled", false);
            $('#add-button').show();
        }
        // Loads audio file into audio player
        $("#currentlyPlaying").attr("src", $(this).attr("src"));
        $("#audioPlayer")[0].load();

        // Clears description box, then populates with data from description column in spread sheet
        $("#description").html("");
        $("#description").append($(this).attr("description"));

        // Clears currently playing box, then populates with data from title column in spread sheet
        $("#current-meditation").html("");
        $("#current-meditation").append($(this).attr("title"));

        playingIndex = $(this).attr('data-index');
        console.log("playingIndex: " + playingIndex);
    });
}

// Local storage

// "Like Track" button: adds the track ID of currently playing track to the local storage array
$("#add-button").on("click", function() {
    var favoriteItem = $('.playing').attr('id');
    var userFavorites = JSON.parse(localStorage.getItem('localFavorites')) || [];

    const stringNum = favoriteItem.toString();
    if (userFavorites.includes(stringNum)){
        $('#remove-button').attr("disabled", false);
        $('#remove-button').show();
        $('#add-button').attr("disabled", true);
        $('#add-button').hide();
        console.log("Track already liked!")
    }else{
        $('#remove-button').attr("disabled", true);
        $('#remove-button').hide();
        $('#add-button').attr("disabled", false);
        $('#add-button').hide();
        
        // userFavorites = []; //*** Unhide this line and hide line below to clear out local storage***
        userFavorites.push(favoriteItem);

        localStorage.setItem("localFavorites", JSON.stringify(userFavorites));
        
        // Added to favorites modal
        $('#overlay').modal('show');
        setTimeout(function() {
            $('#overlay').modal('hide');
        }, 850);
        $('#add-button').attr("disabled", true);

        renderPlaylist(playlist);
    }
})

// "My Favorites" button: renders playlist of tracks stored locally
 $("#favorites-button").on("click", function() {
    var currentFavorites = JSON.parse(localStorage.getItem('localFavorites')) || [];
    console.log("Track IDs stored locally: " + currentFavorites);
    playlist = [];
    for (j = 0; j < currentFavorites.length; j++){
        for (i = 1; i < content[0].data[0].rowData.length; i++){
            if (content[0].data[0].rowData[i].values[12].effectiveValue.numberValue == currentFavorites[j]){
                console.log(currentFavorites[j] +": " + content[0].data[0].rowData[i].values[0].effectiveValue.stringValue);
        
                playlist.push({
                    src: content[0].data[0].rowData[i].values[1].effectiveValue.stringValue,
                    desc: content[0].data[0].rowData[i].values[5].effectiveValue.stringValue,
                    title: content[0].data[0].rowData[i].values[0].effectiveValue.stringValue,
                    duration: content[0].data[0].rowData[i].values[4].effectiveValue.numberValue,
                    id: content[0].data[0].rowData[i].values[12].effectiveValue.numberValue
                });
        
            }
        }
    }
    renderPlaylist(playlist);
})

// "Unlike Track" button: removes track ID of currently playing track from local storage array
$("#remove-button").on("click", function() {
    var currentId = $('.playing').attr('id');
    userFavorites = JSON.parse(localStorage.getItem('localFavorites')) || [];
    console.log("User favorites: " + userFavorites);
    console.log("Current ID: " + currentId);

    const stringNum = currentId.toString();
    if (userFavorites.includes(stringNum)){

        for (i = userFavorites.length - 1; i >= 0; i--){
            if (userFavorites[i] === currentId){
                userFavorites.splice(i, 1);
            }
        }

        console.log("Updated user Favorites: " + userFavorites);
        localStorage.setItem("localFavorites", JSON.stringify(userFavorites));

        // Removed from favorites modal
        $('#overlay2').modal('show');
        setTimeout(function() {
            $('#overlay2').modal('hide');
        }, 850);
        $('#remove-button').attr("disabled", true);
        $('#remove-button').hide();
        renderPlaylist(playlist);
    }else{
        console.log("Track not in favorites");
    }
})
 
