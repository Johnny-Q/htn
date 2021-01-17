var link = "https://www.youtube.com/watch?v=-Zn75eMkaoE";
if (window.location.href != link) {
    window.location.href = link;
}
//listen for click events
window.addEventListener("click", function () {
    console.log("@@click event@@", window.location.href, window.location.href == link);
    if (window.location.href != link) {
        window.location.href = link;
    }
});
