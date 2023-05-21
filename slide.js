var myIndex = 0;
function slider() {
    var images = document.getElementsByClassName("mySlides");
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }

    if (myIndex > images.length - 1) {
        myIndex = 0;
    }
    images[myIndex].style.display = "block";
    myIndex++;
    setTimeout(slider, 2000); // Change image every 2 seconds
}