// Replaces the audio player's src with the src from the button
$(".btn").on("click", function(x) {
    x.preventDefault();
    $("#currentlyPlaying").attr("src", $(this).attr("src"));
    console.log(this);
    $("#audioPlayer")[0].load();
});

var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";                                                             
var sheetsLink;

// Pulls the value from cell A2 in the Google Sheets spreadsheet
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.sheets[0].data[0].rowData[1].values[0].effectiveValue.stringValue);
    sheetsLink = response.sheets[0].data[0].rowData[1].values[0].effectiveValue.stringValue
    $("#google-sheets").attr("src", sheetsLink);
  });