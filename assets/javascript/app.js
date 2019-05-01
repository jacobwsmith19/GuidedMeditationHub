

var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";                                                             
var sheetsA2;

// Pulls the value from cell A2 in the Google Sheets spreadsheet
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
                title= '${response.sheets[4].data[0].rowData[i].values[6].effectiveValue.stringValue}'>
                ${response.sheets[4].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        // On click function for playlist items - updates src of audio file being played
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
                title= '${response.sheets[5].data[0].rowData[i].values[6].effectiveValue.stringValue}'>
                ${response.sheets[5].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        // On click function for playlist items - updates src of audio file being played
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
                title= '${response.sheets[1].data[0].rowData[i].values[6].effectiveValue.stringValue}'>
                ${response.sheets[1].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        // On click function for playlist items - updates src of audio file being played
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
                title= '${response.sheets[3].data[0].rowData[i].values[6].effectiveValue.stringValue}'>
                ${response.sheets[3].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        // On click function for playlist items - updates src of audio file being played
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
    }); 
    

  }); //close AJAX function




