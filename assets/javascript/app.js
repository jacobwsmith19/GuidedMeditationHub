$(".btn").on("click", function(x) {
    x.preventDefault();
    $("#currentlyPlaying").attr("src", $(this).attr("src"));
    console.log(this);

});