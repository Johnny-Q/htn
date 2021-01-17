chrome.storage.local.get("current_link", (res) => {
    if(!res.current_link) return;
    
    let link = res.current_link;
    if (window.location.href != link) {
        window.location.href = link;
    }
    //listen for click events
    window.addEventListener("click", () => {
        console.log("@@click event@@", window.location.href, window.location.href == link);
        if (window.location.href != link) {
            window.location.href = link;
        }
    });
})