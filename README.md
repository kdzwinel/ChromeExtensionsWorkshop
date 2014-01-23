# Chrome Extensions Workshop - Step 3

## TODO
1. Add "notifications" permission to your manifest
2. Change your extension so that, before new pollution data from server are saved to `chrome.storage.local`, they are compared with previous data. Show a notification when:
 - there were no pollutants exceeding norms before and now there is at least one that does or
 - there was, at least one, pollutant that exceeded the norms and now air is OK again.
<img src='http://i.imgur.com/pxZRsoq.png' alt='Chrome notification' />
3. Test your extension. If everything works as expected make your extension to open `http://www.malopolska.pl/powietrze` page whenever someone clicks on a notification. You'll need to use [Tabs API](http://developer.chrome.com/extensions/tabs.html#method-create).

**Chrome OS/ Windows / OSX** users please use Chrome Notifications API.

**Linux** users please use HTML5 Notifications API.

## Links
- [Manifest File Format](http://developer.chrome.com/extensions/manifest.html)
- [Chrome Notifications API](http://developer.chrome.com/extensions/notifications.html)
- [HTML5 Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/notification)
- [Tabs API](http://developer.chrome.com/extensions/tabs.html)

## Extra time left?
- Having different icon for different notifications would be nice.
- Notifications don't go away automatically. Implement a timeout (`setTimeout` on background page and `chrome.alarms.create` on event page).
- Support both Chrome and HTML5 notifications.
- If you are using Chrome Notifications you can show a short list of elements - use it to show pollutants that are currently exceeding norms.
