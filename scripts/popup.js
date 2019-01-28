/*global chrome*/
let toggleBetfairOdds = document.getElementById("toggleBetfairOdds");

toggleBetfairOdds.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tab){
    console.log("Match with Betfair: Read tab id " + tab[0].id);
    chrome.tabs.sendMessage(
      tab[0].id, JSON.stringify({
        "identifier": "matchWithBetfair",
        "message": "toggleBetfairOdds"
      }), function(response) {
        if (response) {
          console.log("Match with Betfair: " + response.message);
        }
      });
  })
}
