// Spread sheet key
var shortSheet = 4;
var longSheet = 5;
var walkingSheet = 1;
var eyesOpenSheet = 3;

// Hides description box until button is clicked
$('#description-div').hide();
$(".btn").on("click", function(){
    $('#description-div').show();
});

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

    });
}

// Pulls data from Google spread sheet
var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    // Populates playlist div based on button clicked
    function createPlaylist(){
        
        $("#playlist").html("");

        for (i = 1; i < response.sheets[sheetNum].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class= 'current-playlist' 
                src= '${response.sheets[sheetNum].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
                description= '${response.sheets[sheetNum].data[0].rowData[i].values[7].effectiveValue.stringValue}'
                title= '${response.sheets[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue}'>&nbsp; 
                ${response.sheets[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
            `);
        }
        playAudio();
    }

    // Short
    $("#short-button").on("click", function(){
        sheetNum = shortSheet;
        createPlaylist();
    });

    // Long
    $("#long-button").on("click", function(){
        sheetNum = longSheet;
        createPlaylist();
    }); 

    // Walking
    $("#walking-button").on("click", function(){
        sheetNum = walkingSheet;
        createPlaylist();
    }); 

    // Eyes open
    $("#eyes-open-button").on("click", function(){
        sheetNum = eyesOpenSheet;
        createPlaylist();
    }); 
    
}); //close AJAX function
