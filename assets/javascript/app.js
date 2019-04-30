// Replaces the audio player's src with the src from the button
$(".btn").on("click", function(x) {
    x.preventDefault();
    $("#currentlyPlaying").attr("src", $(this).attr("src"));
    console.log(this);
    $("#audioPlayer")[0].load();
});

// //duration marker
// var duration = 15;
// // choose duration toggle
// $('#chooseDuration').on('click', function() {
//   var durationToggle = $(this).find('#durationSelector');
//   if(durationToggle.hasClass('left')){
//       // remove class left + add class right
//       durationToggle.removeClass('left');
//       durationToggle.addClass('right');
//       duration = 15;
//   } else{
//     durationToggle.removeClass('right');
//     durationToggle.addClass('left');
//     duration = 16;
//   }
// });

var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";                                                             
var sheetsA2;

// Pulls the value from cell A2 in the Google Sheets spreadsheet
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    sheetsA2 = response.sheets[0].data[0].rowData[1].values[0].effectiveValue.stringValue
    $("#google-sheets").attr("src", sheetsA2);

    console.log("-------------------------------------------------------");

    console.log("Sam Harris:")
    // function to log the urls for each file on the "sam-harris" tab in the spreadsheet
    for (i = 1; i < response.sheets[1].data[0].rowData.length; i++){
        console.log(response.sheets[1].data[0].rowData[i].values[0].effectiveValue.stringValue);
    }
    console.log("-------------------------------------------------------");

    console.log("Sitting:")
    // function to log the urls for each file on the "sitting" tab in the spreadsheet
    for (i = 1; i < response.sheets[2].data[0].rowData.length; i++){
        console.log(response.sheets[2].data[0].rowData[i].values[0].effectiveValue.stringValue);
    }
    console.log("-------------------------------------------------------");

    console.log("Eyes open:")
    // function to log the urls for each file on the "eyes-open" tab in the spreadsheet
    for (i = 1; i < response.sheets[3].data[0].rowData.length; i++){
        console.log(response.sheets[3].data[0].rowData[i].values[0].effectiveValue.stringValue);
    }
    console.log("-------------------------------------------------------");

    console.log("Shorter than 15 minutes:")
    // function to log the urls for each file on the "shorter-than-1000" tab in the spreadsheet
    for (i = 1; i < response.sheets[4].data[0].rowData.length; i++){
        console.log(response.sheets[4].data[0].rowData[i].values[0].effectiveValue.stringValue);
    }
    console.log("-------------------------------------------------------");

  });


