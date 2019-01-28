// scrape-betfair.js is called by content.js to find odds on the current page
// on Betfair's Sportsbook and save references to them to later be able to add
// matching odds from Betfair's Exchange
console.log("Match with Betfair: scrape-betfair.js loaded");

// Current assumptions:
// * Odds are in decimal
// * Only scrape Match Odds ("1", "X" and "2")

scrapeEvents = function() {
  let foundEvents = [];

  let tableRows = document.getElementsByClassName("avb-row");

  for (let row = 0; row < tableRows.length; row++) {
    let event = {};

    event["data-eventid"] = tableRows[row].getElementsByClassName("event-information")[0].getAttribute("data-eventid");
    event["date"] = tableRows[row].getElementsByClassName("event-status-container")[0].innerText;
    event["data-sport"] = tableRows[row].getElementsByClassName("event-team-container")[0].getAttribute("data-sport");
    event["data-event"] = tableRows[row].getElementsByClassName("event-team-container")[0].getAttribute("data-event");
    event["data-market"] = tableRows[row].getElementsByClassName("event-team-container")[0].getAttribute("data-market");

    let eventActions = [];
    let actionColumns = tableRows[row].getElementsByClassName("ui-betslip-action");

    for (let column = 0; column < actionColumns.length; column++) {
      let action = {};

      action["data-is-fctc"] = actionColumns[column].getAttribute("data-is-fctc");
      action["data-context"] = actionColumns[column].getAttribute("data-context");
      action["data-eventid"] = actionColumns[column].getAttribute("data-eventid");
      action["data-marketid"] = actionColumns[column].getAttribute("data-marketid");
      action["data-selectionid"] = actionColumns[column].getAttribute("data-selectionid");
      action["data-uuid"] = actionColumns[column].getAttribute("data-uuid");
      action["odds"] = actionColumns[column].innerText;

      eventActions.push(action);
    }

    event["actions"] = eventActions;

    foundEvents.push(event);
  }

  return foundEvents;
};

console.log(scrapeEvents());

// https://docs.developer.betfair.com/visualisers/api-ng-sports-operations/
// TODO Use Betfair Exchange API's listMarketCatalogue to search for data-event
// * Use filter = {'marketTypeCodes': 'MATCH_ODDS}
// * Use maxResults = 1000
// * Use marketProjection = ['RUNNER_METADATA']
// TODO Use the selection IDs from listMarketCatalogue's output as input for listRunnerBook
// * Use priceProjection = {'priceData':['EX_BEST_OFFERS']}
// TODO Match the odds in the output to the ones on the page
// TODO Maybe cache Betfair Exchange API data in a database somewhere? Not too long, obviously