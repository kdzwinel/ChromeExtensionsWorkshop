# Chrome Extensions Workshop - Step 1

## TODO
1. Create `popup.html` file in your extension folder
2. Add `default_popup` field to the manifest and set it to `popup.html`
3. Test your changes. After clicking browser action button small popup should appear.
4. Create and add `popup.js` and `popup.css` to your `popup.html` page. Implement the functionality presented below
	<img src="http://i.imgur.com/Fz1xfHz.png" alt="Popup with pollution information" style="width:400px" />
	- Pull the pollution data from `http://smogalert.pl/api/stats/krakow-krasinskiego`
	- You can (but definitely don't have to) use any libraries/frameworks you wish. However, don't use external servers, download all files that you need to your extension folder.
5. Done! If you have extra time left you can polish your extension. Check list of possible improvements below.

## Links
- [Browser Action](http://developer.chrome.com/extensions/browserAction.html)
- [Manifest File Format](http://developer.chrome.com/extensions/manifest.html)

## Extra time left?
- Clean up your file structure (e.g. keep all JavaScript files in `js/` folder etc.)
- While data are being loaded show some text/animation (e.g. gif or CSS Animation).
- Make sure that user will get an error message if API is unreachable.
- Make this popup pretty! Play with styles and maybe use [bootstrap](http://getbootstrap.com/)?