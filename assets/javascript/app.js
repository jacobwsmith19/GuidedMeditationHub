// Spread sheet key
var shortSheet = 4;
var longSheet = 5;
var walkingSheet = 1;
var eyesOpenSheet = 3;
var playlist = [];
var playingIndex = 0;
var content;
// Hides description box until button is clicked
$('#description-div').hide();

// Loads new audio file into the audio player and updates description box
function playAudio(){
    $(".current-playlist").on("click", function(x) {
        x.preventDefault();
        $("#currentlyPlaying").attr("src", $(this).attr("src"));
        $("#audioPlayer")[0].load();

        // Clears description box, then populates with data from description column in spread sheet
        $("#description").html("");
        $("#description").append($(this).attr("description"));

        // Clears currently playing box, then populates with data from title column in spread sheet
        $("#current-meditation").html("");
        $("#current-meditation").append($(this).attr("title"));

        playingIndex = $(this).attr('data-index');
    });
}

// Pulls data from Google spread sheet
var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    content = response.sheets;
}); //close AJAX function

// Short
$("#short-button").on("click", function(){
    sheetNum = shortSheet;
    createPlaylist(shortSheet);
});

// Long
$("#long-button").on("click", function(){
    sheetNum = longSheet;
    createPlaylist(longSheet);
}); 

// Walking
$("#walking-button").on("click", function(){
    sheetNum = walkingSheet;
    createPlaylist(walkingSheet);
}); 

// Eyes open
$("#eyes-open-button").on("click", function(){
    sheetNum = eyesOpenSheet;
    createPlaylist(eyesOpenSheet);
}); 

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
})

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
})

// Populates playlist div based on button clicked
function createPlaylist(sheetNum){
    $('#description-div').show();
    $("#playlist").html("");
    playlist = [];

    for (i = 1; i < content[sheetNum].data[0].rowData.length; i++){
        playlist.push({
            src: content[sheetNum].data[0].rowData[i].values[0].effectiveValue.stringValue,
            desc: content[sheetNum].data[0].rowData[i].values[7].effectiveValue.stringValue,
            title: content[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue,
        })
        $("#playlist").append(`
            <div class= 'current-playlist' 
            src= '${content[sheetNum].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
            description= '${content[sheetNum].data[0].rowData[i].values[7].effectiveValue.stringValue}'
            title= '${content[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue}'
            data-index='${i-1}'>&nbsp; 
            ${content[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue}
            </div>
        `);
    }
    
    playAudio();
}