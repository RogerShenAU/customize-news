/*
Open a new tab, and load "my-page.html" into it.
*/
function openMyPage() {
  var creating = browser.tabs.create({
     "url": "index.html"
   });
  creating.then(onCreated, onError);
}


/*
Add openMyPage() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(openMyPage);
 
