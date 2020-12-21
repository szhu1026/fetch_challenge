const { remote } = require('webdriverio')
const sync = require('@wdio/sync').default
const scalePageObject = require('./scale_page_object.js')

remote({
    logLevel: 'silent',
    capabilities: {
        browserName: 'chrome'
    }
}).then((browser) => sync(() => {
    const scalePage = new scalePageObject(browser);

    browser.url(scalePage.url);

    let recursive = (arr) => {
        if (arr.length == 1) {
            console.log(`coin ${arr[0]} was selected`);
            return scalePage.hitCoin(arr[0]);
        }

        scalePage.hitReset(arr);

        if (arr.length % 2 == 0) {
            scalePage.addValuesLeftBowl(arr.slice(0, arr.length / 2));
            scalePage.addValuesRightBowl(arr.slice(arr.length / 2, arr.length));
            let sideWithLessWeight = scalePage.hitWeigh();

            switch(sideWithLessWeight) {
                case "left":
                  return recursive(arr.slice(0, arr.length / 2))
                  break;
                case "right":
                  return recursive(arr.slice(arr.length / 2, arr.length))
                  break;
            }
        } else {
            scalePage.addValuesLeftBowl(arr.slice(0, Math.floor(arr.length / 2)));
            scalePage.addValuesRightBowl(arr.slice(Math.floor(arr.length / 2), arr.length - 1));
            let sideWithLessWeight = scalePage.hitWeigh();
            switch(sideWithLessWeight) {
                case "left":
                  return recursive(arr.slice(0, Math.floor(arr.length / 2)))
                  break;
                case "right":
                  return recursive(arr.slice(Math.floor(arr.length / 2), arr.length - 1))
                  break;
                case "equal":
                  return recursive([arr[arr.length - 1]])
                  break;
            }
        }
    }
    recursive([0, 1, 2, 3, 4, 5, 6, 7, 8])
    browser.deleteSession()
})).catch((err) => {
    console.log("errors: ", err)
    process.exit();
})
