function toggleBetfairOdds() {

}

// Add listener to trigger toggling Betfair odds when the popup asks for it
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var popupId = sender.id;
  var decodedMessage = JSON.parse(message);
  if (decodedMessage.identifier && decodedMessage.identifier == "matchWithBetfair") {
    console.log("Match with Betfair: content.js received \"" + decodedMessage.message + "\" from popupId \"" + popupId + "\".");
  }
});
