const whatIsIt = new Audio("assets/sounds/what_is_it.ogg");

document.addEventListener("DOMContentLoaded", () => {
    whatIsIt.load();

    $("#whatisit").on("click", function() {
        whatIsIt.currentTime = 0;
        whatIsIt.play();
    });
});
