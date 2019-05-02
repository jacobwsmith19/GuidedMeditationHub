//Spread sheet key
var shortSheet = 4;
var longSheet = 5;
var walkingSheet = 1;
var eyesOpenSheet = 3;

// Hides description box until button is clicked
$('#description-div').hide();
$(".btn").on("click", function(){
    $('#description-div').show();
});

// Function that loads new audio file into the audio player and updates description box
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

    // Short ---------------------------------------------------------------------------------------------------------
    $("#short-button").on("click", function(){

        // Clears playlist div
        $("#playlist").html("");

        // Populates playlist div based on button clicked
        for (i = 1; i < response.sheets[4].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class= 'current-playlist' 
                src= '${response.sheets[4].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
                description= '${response.sheets[4].data[0].rowData[i].values[7].effectiveValue.stringValue}'
                title= '${response.sheets[4].data[0].rowData[i].values[6].effectiveValue.stringValue}'>&nbsp; 
                ${response.sheets[4].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }
        playAudio();
    }); 

    // Long ---------------------------------------------------------------------------------------------------------
    $("#long-button").on("click", function(){

        // Clears playlist div
        $("#playlist").html("");

        // Populates playlist div based on button clicked
        for (i = 1; i < response.sheets[5].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class= 'current-playlist' 
                src= '${response.sheets[5].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
                description= '${response.sheets[5].data[0].rowData[i].values[7].effectiveValue.stringValue}'
                title= '${response.sheets[5].data[0].rowData[i].values[6].effectiveValue.stringValue}'>&nbsp; 
                ${response.sheets[5].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }
        playAudio();
    }); 

    // Walking ---------------------------------------------------------------------------------------------------------
    $("#walking-button").on("click", function(){

        // Clears playlist div
        $("#playlist").html("");

        // Populates playlist div based on button clicked
        for (i = 1; i < response.sheets[1].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class= 'current-playlist' 
                src= '${response.sheets[1].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
                description= '${response.sheets[1].data[0].rowData[i].values[7].effectiveValue.stringValue}'
                title= '${response.sheets[1].data[0].rowData[i].values[6].effectiveValue.stringValue}'>&nbsp; 
                ${response.sheets[1].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }
        playAudio();
    }); 

    // Eyes open ---------------------------------------------------------------------------------------------------------
    $("#eyes-open-button").on("click", function(){

        // Clears playlist div
        $("#playlist").html("");

        // Populates playlist div based on button clicked
        for (i = 1; i < response.sheets[3].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class= 'current-playlist' 
                src= '${response.sheets[3].data[0].rowData[i].values[0].effectiveValue.stringValue}' 
                description= '${response.sheets[3].data[0].rowData[i].values[7].effectiveValue.stringValue}'
                title= '${response.sheets[3].data[0].rowData[i].values[6].effectiveValue.stringValue}'>&nbsp; 
                ${response.sheets[3].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }
        playAudio();
    }); 
    

  }); //close AJAX function




