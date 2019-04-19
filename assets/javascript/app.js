$(".btn").on("click", function(x) {
    x.preventDefault();
    $("#currentlyPlaying").attr("src", $(this).attr("src"));
    console.log(this);
$("#audioPlayer")[0].load();
    //document.getElementById('audioPlayer').load();
});

/*
Speaker
    video:
        dream analysis
        5
        tags/category
        url
    video:
        Stressful workplace
        20
        tags/category
        url
    video:
        time management
        30
        tags/category
        url
*/