# Chrome Extensions Workshop - Step 0

## TODO

1. Create a folder for your extension
2. Create a `manifest.json` file in that folder
3. Fill `manifest.json` with basic fields (`name`, `description`, `version`, `manifest_version`, `icons`)
	- use icons from the `img` folder (or create your own)
	- manifest file format is described [here](http://developer.chrome.com/extensions/manifest.html)
4. Test your extension in Chrome using "Load unpacked extension..." button on `chrome://extensions` page ("Developer mode" must be enabled)
<img src="http://i.imgur.com/ykYmF51.png" alt="Extension loaded using \"Load unpacked extension...\" feature" style="width: 100%;"/>
5. If there were any errors while loading your extension - fix them! Invalid extensions are being disabled by the browser, after fixing all issues make sure to enable your extension using checkbox on the right.
6. Add `browser_action` field with `default_icon` (you can use `img/icon_38.png`) to your manifest file.
7. Reload your extension to test it again (use "Reload" link under extension details)
8. If you are able to see your extensions' icon in the browser UI, you have successful finished this step!
<img src="http://i.imgur.com/GCEd81l.png" alt="Browser action" style="width:143px"/>

## Links
- [Manifest File Format](http://developer.chrome.com/extensions/manifest.html)
- [Browser Actions](http://developer.chrome.com/extensions/browserAction.html)
- [JSON Validator](http://jsonlint.com/)
- [Icon search engine](https://www.iconfinder.com/)