

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

        $("#playlist").html("");

        for (i = 1; i < response.sheets[4].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class='current-playlist' src='${response.sheets[4].data[0].rowData[i].values[0].effectiveValue.stringValue}'>
                ${response.sheets[4].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        $(".current-playlist").on("click", function(x) {
            x.preventDefault();
            $("#currentlyPlaying").attr("src", $(this).attr("src"));
            $("#audioPlayer")[0].load();
        });
    }); 

    // Long ---------------------------------------------------------------------------------------------------------
    $("#long-button").on("click", function(){

        $("#playlist").html("");

        for (i = 1; i < response.sheets[5].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class='current-playlist' src='${response.sheets[5].data[0].rowData[i].values[0].effectiveValue.stringValue}'>
                ${response.sheets[5].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        $(".current-playlist").on("click", function(x) {
            x.preventDefault();
            $("#currentlyPlaying").attr("src", $(this).attr("src"));
            $("#audioPlayer")[0].load();
        });
    });

    // Walking ---------------------------------------------------------------------------------------------------------
    $("#walking-button").on("click", function(){

        $("#playlist").html("");

        for (i = 1; i < response.sheets[1].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class='current-playlist' src='${response.sheets[1].data[0].rowData[i].values[0].effectiveValue.stringValue}'>
                ${response.sheets[1].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        $(".current-playlist").on("click", function(x) {
            x.preventDefault();
            $("#currentlyPlaying").attr("src", $(this).attr("src"));
            $("#audioPlayer")[0].load();
        });
    });

    // Eyes open ---------------------------------------------------------------------------------------------------------
    $("#eyes-open-button").on("click", function(){

        $("#playlist").html("");

        for (i = 1; i < response.sheets[3].data[0].rowData.length; i++){
            $("#playlist").append(`
                <div class='current-playlist' src='${response.sheets[3].data[0].rowData[i].values[0].effectiveValue.stringValue}'>
                ${response.sheets[3].data[0].rowData[i].values[6].effectiveValue.stringValue}
                </div>
                `);
        }

        $(".current-playlist").on("click", function(x) {
            x.preventDefault();
            $("#currentlyPlaying").attr("src", $(this).attr("src"));
            $("#audioPlayer")[0].load();
        });
    });
    

  }); //close AJAX function




