// Spread sheet tab key
var shortSheet = 4;
var longSheet = 5;
var walkingSheet = 1;
var eyesOpenSheet = 3;

// Global variables
var playlist = [];
var playingIndex = 0;
var content;
var tagsArr = [];

// Icons for tags
var eyesOpenIcon = `<i class="far fa-eye"></i>`;
var walkingIcon = `<i class="fas fa-walking"></i>`;
var longIcon = `<i class="fas fa-hourglass-half"></i>`;
var shortIcon = `<i class="fas fa-stopwatch"></i>`;

// Hold active filter options
let filters = [];

// Hides description box & disables next/prev/shuff buttons until track is clicked
$('#description-div').hide();

// Ajax call to pull data from Google spreadsheet
var queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1Bysg6lO4dCENpN6Mk_A8W26b2Qeq_H4eQHXzJnEjeT4/?key=AIzaSyCIlkGoF9ptyUJZCB8sy7lCTnK-Bq58Bcw&includeGridData=true";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    content = response.sheets;
    // Filter buttons enabled after AJAX call to prevent error
    $('#short-button').attr("disabled", false);
    $('#long-button').attr("disabled", false);
    $('#walking-button').attr("disabled", false);
    $('#eyes-open-button').attr("disabled", false);
}); 

// Short button
$("#short-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filters = filters.filter(x => x != 4);
    } else {
        $(this).addClass('active');
        filters.push(4);
    }

    createPlaylist();
});

// Long button
$("#long-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filters = filters.filter(x => x != 5);
    } else {
        $(this).addClass('active');
        filters.push(5);
    }

    createPlaylist();
}); 

// Walking button
$("#walking-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filters = filters.filter(x => x != 1);
    } else {
        $(this).addClass('active');
        filters.push(1);
    }

    createPlaylist();
}); 

// Eyes open button
$("#eyes-open-button").on("click", function(){
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
        filters = filters.filter(x => x != 3);
    } else {
        $(this).addClass('active');
        filters.push(3);
    }

    createPlaylist();
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

    // Clears tags, then populates with data from title column in spread sheet
    $("#tags").html("");
    $("#tags").append(playNext.tags);

    $('.playing').attr('class', "current-playlist");
    $(`.current-playlist[data-index="${playingIndex}"]`).attr('class', 'current-playlist playing');
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

    // Clears tags box, then populates with data from title column in spread sheet
    $("#tags").html("");
    $("#tags").append(playPrev.tags);

    $('.playing').attr('class', "current-playlist");
    $(`.current-playlist[data-index="${playingIndex}"]`).attr('class', 'current-playlist playing');

})

// Shuffle button
$("#shuffle-button").on("click", function(){
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
})

// Populates playlist array based on button clicked
function createPlaylist(){
    $('#description-div').show();
    $("#playlist").html("");
    console.log(filters)
    var playlist = [];
    const baseFilterIndex = filters[0] || -1;
    const additionalFilters = filters.slice(1);
    
    // Gather filtered tracks
    for (var i = 0; i < baseFilterIndex; i++){
        var track = content[baseFilterIndex].data[i].rowData[i].values;
        console.log(1212121212121, track)
        var found = false
        additionalFilters.forEach(filterIndex => {
            found = content[filterIndex].data.indexOf(track) >= 0 
        })
        if (found){
            playlist.push({
                src: track.effectiveValue.stringValue,
                desc: track.effectiveValue.stringValue,
                title: track.effectiveValue.stringValue,
                duration: track.effectiveValue.numberValue,
                tags: tagsArr,
            })
        }
    }
    
    // for (i = 1; i < content[sheetNum].data[0].rowData.length; i++){
    //     tagsArr = [];
    //     playlist.push({
    //         src: content[sheetNum].data[0].rowData[i].values[0].effectiveValue.stringValue,
    //         desc: content[sheetNum].data[0].rowData[i].values[7].effectiveValue.stringValue,
    //         title: content[sheetNum].data[0].rowData[i].values[6].effectiveValue.stringValue,
    //         duration: content[sheetNum].data[0].rowData[i].values[3].effectiveValue.numberValue,
    //         tags: tagsArr,
    //     })

    //     // These if statements cycle through the selected tab and push relevant icons into the tagsArr
    //     if (content[sheetNum].data[0].rowData[i].values[5].effectiveValue.stringValue === "yes"){
    //         tagsArr.push(eyesOpenIcon); 
    //     }
    //     if (content[sheetNum].data[0].rowData[i].values[4].effectiveValue.stringValue === "no"){
    //         tagsArr.push(walkingIcon); 
    //     }
    //     if (content[sheetNum].data[0].rowData[i].values[3].effectiveValue.numberValue >= 900){
    //         tagsArr.push(longIcon); 
    //     }else{
    //         tagsArr.push(shortIcon);
    //     }
    // }
    renderPlaylist(playlist);
}

// Populates playlist div based on playlist array
function renderPlaylist(playlist){
    $("#playlist").html("");
    playlist.forEach((item, i) => {
        const formattedDuration = moment.utc(item.duration*1000).format('m:ss');
        $("#playlist").append(`
            <div class= 'current-playlist' 
            src= '${item.src}' 
            description= '${item.desc}'
            title= '${item.title}'
            duration = '${item.duration}'
            tags= '${item.tags}'
            data-index='${i}'>&nbsp; 
            ${item.title}&nbsp;(${formattedDuration})
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
        
        // Loads audio file into audio player
        $("#currentlyPlaying").attr("src", $(this).attr("src"));
        $("#audioPlayer")[0].load();

        // Clears description box, then populates with data from description column in spread sheet
        $("#description").html("");
        $("#description").append($(this).attr("description"));

        // Clears currently playing box, then populates with data from title column in spread sheet
        $("#current-meditation").html("");
        $("#current-meditation").append($(this).attr("title"));

        // Clears tags box, then populates with data from title column in spread sheet
        $("#tags").html("");
        $("#tags").append($(this).attr("tags"));

        playingIndex = $(this).attr('data-index');
        console.log("playingIndex: " + playingIndex);

    });
}


