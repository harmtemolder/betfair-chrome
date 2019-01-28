// popup.js runs in the popup and enables a user to interact with content.js through links that send messages
console.log("Match with Betfair: popup.js loaded");

let analyseLink = document.getElementById("analyse");
let fetchLink = document.getElementById("fetch");

sendToContent = function(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tab){
    console.log("Match with Betfair: sendToContent read tab id \"" + tab[0].id + "\"");

    chrome.tabs.sendMessage(
        tab[0].id, JSON.stringify({
          "identifier": "matchWithBetfair",
          "message": message
        }), function(response) {
          if (response) {
            let decodedResponse = JSON.parse(response);
            console.log("Match with Betfair: sendToContent received response \"" + decodedResponse.message + "\"");
          }
        });

    console.log("Match with Betfair: sendToContent sent message \"" + message + "\"");
  })
};

analyseLink.onclick = function() {
  sendToContent("analyseLinkClicked");
};

fetchLink.onclick = function() {
  sendToContent("fetchLinkClicked");
};