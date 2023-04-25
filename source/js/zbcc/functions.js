function ok(object) {
    return Object.keys(object)
}

function ov(object) {
    return Object.values(object)
}

function af(something) {
    return Array.from(something)
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function generatePallete(numOfRows) {
    let pallete = []

    for (let i = 1; i <= numOfRows; i++) {
        let rgbNumber = 255 - i * Math.floor(255 / numOfRows)
        let color = rgbToHex(rgbNumber, rgbNumber, rgbNumber)
        pallete.push(color)
    }

    return pallete
}

function calculateInvestmentRoundForRow(rowId, dataBlock) {
    let db = dataBlock.rows[rowId]
    let tta = zbcc.dataBlocksForm.dataBlocks['initialData'].inputs.totalTokensAmount.value

    console.log('')
    console.log('')
    console.log('')
    console.log('—————————————')

    Object.keys(db).forEach(key => {
        if (key === 'id' || key === 'roundTitle')
            return

        console.log('')
        console.log('key:', key)
        console.log('value:', db[key].value)
        console.log('element:', db[key].element)
        console.log('element value:', db[key].element.value)
    })
    // console.log(db.map(e => {return e.value}))

    if (db.tokenPrice.value !== undefined && db.investorShare.value !== undefined) {
        db.tokensAmount.element.value = tta * db.investorShare.value / 100
        db.tokensAmount.syncValue()
        db.fiat.element.value = tta * db.investorShare.value / 100 * db.tokenPrice.value
        db.fiat.syncValue()
    } else if (db.tokenPrice.value !== undefined && db.tokensAmount.value !== undefined) {
        db.investorShare.element.value = db.tokensAmount.value * 100 / tta
        db.investorShare.syncValue()
        db.fiat.element.value = db.tokensAmount.value / db.tokenPrice.value
        db.fiat.syncValue()
    } else if (db.tokenPrice.value !== undefined && db.fiat.value !== undefined) {
        db.tokensAmount.element.value = db.fiat.value * db.tokenPrice.value
        db.tokensAmount.syncValue()
        db.investorShare.element.value = db.fiat.value * db.tokenPrice.value * 100 / tta
        db.investorShare.syncValue()
    } else if (db.fiat.value !== undefined && db.tokensAmount.value !== undefined) {
        db.investorShare.element.value = db.tokensAmount.value * 100 / tta
        db.investorShare.syncValue()
        db.tokenPrice.element.value = db.fiat.value / db.tokensAmount.value
        db.tokenPrice.syncValue()
    } else if (db.fiat.value !== undefined && db.investorShare.value !== undefined) {
        db.tokensAmount.element.value = tta * db.investorShare.value / 100
        db.tokensAmount.syncValue()
        db.tokenPrice.element.value = db.fiat.value / ((tta * db.investorShare.value) / 100)
        db.tokenPrice.syncValue()
    } else {
        console.log('')
        console.log('not enough data for auto calculate')
        console.log('')
    }
}

function joinLabelsAndDataPercents(data, labels, separator, endSeparator = '') {
    let sum = data.reduce((a, b) => a + b, 0)

    let newLabels = []

    console.log(data, labels)

    for (let i = 0; i < data.length; i++) {
        let percents = data[i] / (sum / 100)
        percents = percents.toFixed(2)
        console.log(labels[i] + separator + percents + '%' + endSeparator)
        newLabels.push(labels[i] + separator + percents + '%' + endSeparator)
    }

    console.log(newLabels)
    return newLabels
}