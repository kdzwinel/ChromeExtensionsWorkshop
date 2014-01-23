# Chrome Extensions Workshop - Step 4

## TODO
1. Create empty "options.html" and set it as an options page by adding `options_page` property to your manifest file.
2. Test your options page by reloading the extension, right clicking on the browser button and choosing 'options'.
<br/>
![Options button](http://i.imgur.com/5ZE5jW7.png)
<br/>
3. Create a form on the options page that allows user to change the station that they want to monitor and disable notifications.
	- you can pull list of available stations from `http://smogalert.pl/api/stations` (use `_id` to make `http://smogalert.pl/api/stats/<id>` calls)
	- save settings using `chrome.storage.local.set()` and load them when options page is opened using `chrome.storage.local.get()`
4. Make appropriate changes to your background/event page so that it respects user settings.
	- pull settings from storage before showing a notification or making an API call
5. After user changes the station, make sure to update the pollution data immediately. There are two ways (valid for both background and event pages) to achieve that:
	- access your background page from your options page using `chrome.runtime.getBackgroundPage()`([docs](http://developer.chrome.com/extensions/runtime.html#method-getBackgroundPage)) and call some kind of a reload function (note that it must be available in the global scope).
	- use `chrome.storage.onChanged.addListener()` on the background page to listen for any changes in the storage and, whenever station changes, load appropriate data.

## Links
- [Manifest File Format](http://developer.chrome.com/extensions/manifest.html)
- [Storage API](http://developer.chrome.com/extensions/storage.html)
- [Runtime API](http://developer.chrome.com/extensions/runtime.html)

## Extra time left?
- You don't need a 'Save' button on the options page. Just save the settings whenever user makes a change.
- Don't load list of stations each time user opens the options page, cache it using `chrome.storage.local` or `localStorage`.
- When list of stations is loading you should show a loader on the options page.
- Add a setting that allows to change update interval (how often pollution data are downloaded).
<br/>
![Sample options page](http://i.imgur.com/WQ5Egcs.png)