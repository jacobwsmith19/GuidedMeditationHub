$(".btn").on("click", function(x) {
    
    $("#currentlyPlaying").attr("src", $(this).attr("src"));
    console.log(this);

});