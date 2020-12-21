

class scalePageObject {
    constructor(browser) {
      this.browser = browser;
    }
    get url() {
        return 'http://ec2-54-208-152-154.compute-1.amazonaws.com/';
    }

    leftElement(id) {
        return `#left_${id}`
    }

    rightElement(id) {
        return `#right_${id}`
    }

    get weigh() {
        return '#weigh'
    }

    get reset() {
        return '.game > div:nth-of-type(4) > button'
    }

    get gameInfo() {
        return '.game-info ol li'
    }

    coinElement(id) {
        return `#coin_${id}`
    }

    addValuesLeftBowl(arr) {
        if (arr.length > 8) {
            throw 'left bowl can only hold 9 bars'
        }
        for (let i = 0; i < arr.length; i++) {
          let element = this.browser.$(`${this.leftElement(i)}`);
          element.addValue(arr[i]);
        }
    }

    addValuesRightBowl(arr) {
        if (arr.length > 8) {
            throw 'right bowl can only hold 9 bars'
        }
        for (let i = 0; i < arr.length; i++) {
          let element = this.browser.$(`${this.rightElement(i)}`);
          element.addValue(arr[i]);
        }
    }

    hitWeigh() {
        let button = this.browser.$(`${this.weigh}`);
        button.click();

        let gameInfo = this.browser.$(`${this.gameInfo}`);
        let weighings = gameInfo.getText();
        let lastWeighing = Array.isArray(weighings) ? weighings[weighings.length - 1] : weighings ;
        return this.determineSideWithLessWeight(lastWeighing);
    }

    determineSideWithLessWeight(text) {
        switch(true) {
            case text.indexOf('=') > -1:
              return 'equal';
              break;
            case text.indexOf('>') > -1:
              return 'right';
              break;
            case text.indexOf('<') > -1:
              return 'left';
              break;
        }
    }

    hitReset(arr) {
        let button = this.browser.$(`${this.reset}`);
        button.click();
    }

    hitCoin(coinIdx) {
        let button = this.browser.$(`${this.coinElement(coinIdx)}`);
        button.click();
    }

}

module.exports = scalePageObject;
