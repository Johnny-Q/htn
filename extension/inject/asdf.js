chrome.storage.local.get("current_link", function (res) {
    if (!res.current_link)
        return;
    var link = res.current_link;
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
});
