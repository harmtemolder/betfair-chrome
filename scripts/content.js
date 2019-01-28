// content.js runs on the page itself and has access to the DOM to scrape and add stuff
console.log("Match with Betfair: content.js loaded");

// Add listener receive messages from popup.js to be handled by the messageHandler function
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  let popupId = sender.id;
  let decodedMessage = JSON.parse(message);

  if (decodedMessage.identifier && decodedMessage.identifier === "matchWithBetfair") {
    console.log("Match with Betfair: content.js received \"" + decodedMessage.message + "\" from popupId \"" + popupId + "\".");

    sendResponse(JSON.stringify({
      "identifier": "matchWithBetfair",
      "message": decodedMessage.message + " received"
    }));

    messageHandler(decodedMessage.message);
  }
});

// Decide what to do, depending on the received message
messageHandler = function(message) {
  switch (message) {
    case "analyseLinkClicked":
      console.log("Match with Betfair: messageHandler received request to scrape the DOM for odds");
      scrapeDOM();
      break;
    case "fetchLinkClicked":
      console.log("Match with Betfair: messageHandler received request to fetch odds from Betfair Exchange");
      break;
    default:
      console.log("Match with Betfair: messageHandler isn't really sure what you requested");
  }
};

// Scrape the DOM for odds with the appropriate scrape script based on the page's hostname
scrapeDOM = function() {
  let currentHost = window.location.host;

  switch (currentHost) {
    case "www.betfair.com":
      let script   = document.createElement("script");
      let scriptUrl = chrome.runtime.getURL("scripts/scrape-betfair.js");

      console.log("Match with Betfair: scrapeDOM will load " + scriptUrl);

      script.type  = "text/javascript";
      script.src   = scriptUrl;
      document.body.appendChild(script);
      break;
    default:
      console.log("Match with Betfair: scrapeDOM doesn't recognise current host, is it implemented yet?")
  }
};