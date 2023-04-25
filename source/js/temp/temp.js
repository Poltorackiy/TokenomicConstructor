






















































// TODO: refactor this sh#t))

$('#zbcc > #precond').on('submit', e => {
    e.preventDefault()
    $('#zbcc > #precond').hide()

    $('#zbcc > #precond .inputs div#time #time-select').prop('checked', false)

    $('#zbcc > #precond .inputs div#time #time-monthly').prop('checked', false)
    $('#zbcc > #precond .inputs div#time #time-monthly-easier').prop('checked', false)
    $('#zbcc > #precond .inputs div#time #time-monthly-easier-cb1').val('0')
    $('#zbcc > #precond .inputs div#time #time-monthly-easier-inpx').val('')

    $('#zbcc > #precond .inputs div#time #time-monthly-harder').prop('checked', false)
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb1').val('0')
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpx').val('')
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb2').val('0')
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpy').val('')


    $('#zbcc > #precond .inputs div#time #time-monthly').prop('disabled', true)

    $('#zbcc > #precond .inputs div#time #time-monthly-easier').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-easier-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-easier-inpx').prop('disabled', true)

    $('#zbcc > #precond .inputs div#time #time-monthly-harder').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpx').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb2').prop('disabled', true)
    $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpy').prop('disabled', true)

    //

    $('#zbcc > #precond .inputs div#token-price #token-price-select').prop('checked', false)
    $('#zbcc > #precond .inputs div#token-price #token-price-andor').val('0')

    $('#zbcc > #precond .inputs div#token-price #token-price').prop('checked', false)
    $('#zbcc > #precond .inputs div#token-price #token-price-easier').prop('checked', false)
    $('#zbcc > #precond .inputs div#token-price #token-price-easier-cb1').val('0')
    $('#zbcc > #precond .inputs div#token-price #token-price-easier-inpx').val('')

    $('#zbcc > #precond .inputs div#token-price #token-price-harder').prop('checked', false)
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb1').val('0')
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpx').val('')
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb2').val('0')
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpy').val('')


    $('#zbcc > #precond .inputs div#token-price #token-price-andor').prop('disabled', true)

    $('#zbcc > #precond .inputs div#token-price #token-price').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-easier').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-easier-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-easier-inpx').prop('disabled', true)

    $('#zbcc > #precond .inputs div#token-price #token-price-harder').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpx').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb2').prop('disabled', true)
    $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpy').prop('disabled', true)

    //

    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-select').prop('checked', false)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-andor').val('0')

    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold').prop('checked', false)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier').prop('checked', false)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-cb1').val('0')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-inpx').val('')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-pool').val('0')

    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder').prop('checked', false)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb1').val('0')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpx').val('')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb2').val('0')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpy').val('')
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-pool').val('0')


    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-andor').prop('disabled', true)

    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-inpx').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-pool').prop('disabled', true)

    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb1').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpx').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb2').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpy').prop('disabled', true)
    $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-pool').prop('disabled', true)
})

$('#zbcc > #precond .inputs div#time #time-select').on('change', e => {
    if (e.currentTarget.checked) {
        $('#zbcc > #precond .inputs div#time #time-monthly').prop('disabled', false)

        $('#zbcc > #precond .inputs div#time #time-monthly-easier').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-easier-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-easier-inpx').prop('disabled', false)

        $('#zbcc > #precond .inputs div#time #time-monthly-harder').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpx').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb2').prop('disabled', false)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpy').prop('disabled', false)
    } else {
        $('#zbcc > #precond .inputs div#time #time-monthly').prop('disabled', true)

        $('#zbcc > #precond .inputs div#time #time-monthly-easier').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-easier-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-easier-inpx').prop('disabled', true)

        $('#zbcc > #precond .inputs div#time #time-monthly-harder').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpx').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-cb2').prop('disabled', true)
        $('#zbcc > #precond .inputs div#time #time-monthly-harder-inpy').prop('disabled', true)
    }
})

$('#zbcc > #precond .inputs div#token-price #token-price-select').on('change', e => {
    if (e.currentTarget.checked) {
        $('#zbcc > #precond .inputs div#token-price #token-price-andor').prop('disabled', false)

        $('#zbcc > #precond .inputs div#token-price #token-price').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier-inpx').prop('disabled', false)

        $('#zbcc > #precond .inputs div#token-price #token-price-harder').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpx').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb2').prop('disabled', false)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpy').prop('disabled', false)
    } else {
        $('#zbcc > #precond .inputs div#token-price #token-price-andor').prop('disabled', true)

        $('#zbcc > #precond .inputs div#token-price #token-price').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-easier-inpx').prop('disabled', true)

        $('#zbcc > #precond .inputs div#token-price #token-price-harder').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpx').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-cb2').prop('disabled', true)
        $('#zbcc > #precond .inputs div#token-price #token-price-harder-inpy').prop('disabled', true)
    }
})

$('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-select').on('change', e => {
    if (e.currentTarget.checked) {
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-andor').prop('disabled', false)

        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-inpx').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-pool').prop('disabled', false)

        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb1').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpx').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb2').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpy').prop('disabled', false)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-pool').prop('disabled', false)
    } else {
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-andor').prop('disabled', true)

        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-inpx').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-easier-pool').prop('disabled', true)

        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb1').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpx').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-cb2').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-inpy').prop('disabled', true)
        $('#zbcc > #precond .inputs div#pool-threshold #pool-threshold-harder-pool').prop('disabled', true)
    }
})

form.dataBlocks['tokenCirculation'].actions.tables.actions.addEventListener('change', e => {
    if (e.target.id === 'pre-condition' && e.target.checked) {
        $('#zbcc-precond-popup').show()
    }
})


function calculateInvestmentRoundForRow(rowId, dataBlock) {
    let db = dataBlock.rows[rowId]
    let tta = form.dataBlocks['initialData'].inputs.totalTokensAmount.value

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

form.dataBlocks['initialData'].inputs.totalTokensAmount.addEventListener('change', (e, input) => {
    let ids = Object.keys(form.dataBlocks['investmentRounds'].tables.rounds.rows)
    console.log('tta changed:', ids)
    for (let rowId = 0; rowId < Object.keys(form.dataBlocks['investmentRounds'].tables.rounds.rows).length; rowId++) {
        console.log('changing row:', rowId)
        calculateInvestmentRoundForRow(rowId, form.dataBlocks['investmentRounds'].tables.rounds)
    }
})

form.dataBlocks['investmentRounds'].tables.rounds.addEventListener('change', (e, dataBlock) => {
    console.log('')
    console.log('')
    console.log('rounds table changed')
    let rowId = e.target.parentNode.parentNode.id

    calculateInvestmentRoundForRow(rowId, dataBlock)
})



// let inputId = e.target.id
/* let tpv = dataBlock.rows[rowId].tokenPrice.value
    let tav = dataBlock.rows[rowId].tokensAmount.value
    let isv = dataBlock.rows[rowId].investorShare.value
    let fv = dataBlock.rows[rowId].fiat.value

    let tpev = dataBlock.rows[rowId].tokenPrice.element.value
    let taev = dataBlock.rows[rowId].tokensAmount.element.value
    let isev = dataBlock.rows[rowId].investorShare.element.value
    let fev = dataBlock.rows[rowId].fiat.element.value */
// console.log(dataBlock.rows[rowId])
    /* switch (inputId) {
        case 'token-price':
            if (dataBlock.rows[rowId].investorShare.value !== undefined) {
                alert('TP & IS')
            } else if (dataBlock.rows[rowId].tokensAmount.value !== undefined) {
                alert('TP & TA')
            } else if (dataBlock.rows[rowId].fiat.value !== undefined) {
                alert('TP & F')
            } else {
                alert('not yet')
            }
            break

        case 'fiat':
            // $(dataBlock.rows[rowId].tokensAmount.element).prop('disabled', true)
            if (dataBlock.rows[rowId].tokensAmount.value !== undefined) {
                alert('F & TA')
            } else if (dataBlock.rows[rowId].investorShare.value !== undefined) {
                alert('F & IS')
            } else {
                alert('not yet')
            }
            break

        case 'investor-share':
            if (dataBlock.rows[rowId].tokenPrice.value !== undefined) {
                alert('IS & TP')
            } else if (dataBlock.rows[rowId].fiat.value !== undefined) {
                alert('IS & F')
            } else {
                alert('not yet')
            }
            break

        case 'tokens-amount':
            if (dataBlock.rows[rowId].tokenPrice.value !== undefined) {
                alert('TA & TP')
            } else if (dataBlock.rows[rowId].fiat.value !== undefined) {
                alert('TA & F')
            } else {
                alert('not yet')
            }
            break

        default:
            alert('not yet')
            break
    } */
    // console.log(e.target.id)
    // console.log(e.target.parentNode.parentNode.id)
    // console.log(dataBlock.row.inputsSelectors.)






























    // editNumberOfTableRowsUsingNumberInput() {}
    // editNumberOfTableRowsUsingNumberInput() {}

    changeValueAndPreValueOfElementAndRunListeners(params) {
        $(this[params.dataBlockName][params.dataBlockElement].element).on(params.event, e => {
            this[params.dataBlockName][params.dataBlockElement].prevValue = this[params.dataBlockName][params.dataBlockElement].value
            this[params.dataBlockName][params.dataBlockElement].value = e.currentTarget.value

            this.runElementListeners({ listeners: this[params.dataBlockName][params.dataBlockElement][params.listenersProperyName ?? 'listeners'] })
        })
    }

    calcOnClick() {

    }

    runElementListeners(params) {
        console.log('run')
        $(this[params.dataBlockName][params.dataBlockElement].element).on('change', e => {
            this[params.dataBlockName][params.dataBlockElement].listeners.forEach(func => {
                console.log('runed')
                func(e)
            })
        })
    }

    changeNumOfTrUsingNumberInput(params) {
        const dataBlockName = params.dataBlockName

        const trsNumberCounter = params.trsNumberCounter
        const trsTable = params.trsTable
        const tablePreElement = params.tablePreElement

        const dataBlockHtmlId = params.dataBlockHtmlId
        const tableHtmlId = params.tableHtmlId

        const htmlTemplate = params.htmlTemplate

        if (this[dataBlockName][trsNumberCounter].value > this[dataBlockName][trsNumberCounter].prevValue) {
            while (this[dataBlockName][trsNumberCounter].value > this[dataBlockName][trsNumberCounter].prevValue) {
                $('#zbcc .data-block#' + dataBlockHtmlId + ' #' + tableHtmlId + '').append(
                    htmlTemplate
                    .replace('{id}', this[dataBlockName][trsNumberCounter].prevValue)
                    .replace('{number}', Number(this[dataBlockName][trsNumberCounter].prevValue) + 1)
                )

                let tableElement = {}

                Object.keys(tablePreElement).forEach(key => {
                    tableElement[key] = $(tablePreElement[key]
                    .replace('{data-block-html-id}', dataBlockHtmlId)
                    .replace('{table-html-id}', tableHtmlId)
                    .replace('{tr-html-id}', this[dataBlockName][trsNumberCounter].prevValue))[0].value
                })

                this[dataBlockName][trsTable].value.push(tableElement)

                this[dataBlockName][trsNumberCounter].prevValue++
            }

        } else if (this[dataBlockName][trsNumberCounter].value < this[dataBlockName][trsNumberCounter].prevValue) {
            while (this[dataBlockName][trsNumberCounter].value < this[dataBlockName][trsNumberCounter].prevValue) {
                this[dataBlockName][trsTable].value.pop()
                $('#zbcc .data-block#' + dataBlockHtmlId + ' #' + tableHtmlId + ' tr#' + (this[dataBlockName][trsNumberCounter].prevValue - 1)).remove()
                this[dataBlockName][trsNumberCounter].prevValue--
            }
        }
    }

    changeNumOfTrUsingCalcButtons(params) {

    }

    initBaseEventListeners() {
        // Initial Data //

        // On change Initial Inputs & run listeners
        Object.keys(this.initialData).forEach(key => {
            this.changeValueAndPreValueOfElementAndRunListeners({ dataBlockName: 'initialData', dataBlockElement: key })
        })


        // Investment Rounds //

        // On change number of rounds & run listeners
        this.changeValueAndPreValueOfElementAndRunListeners({ dataBlockName: 'investmentRounds', dataBlockElement: 'roundsNumber' })

        // On change in rounds table
        this.runElementListeners({ dataBlockName: 'investmentRounds', dataBlockElement: 'roundsTable', event: 'change' })


        // Agents //

        // On change number of agents
        this.changeValueAndPreValueOfElementAndRunListeners({ dataBlockName: 'agents', dataBlockElement: 'agentsNumber' })

        // On change in agents table
        this.runElementListeners({ dataBlockName: 'agents', dataBlockElement: 'agentsTable', event: 'change' })


        // Pools //

        // On change in table
        this.runElementListeners({ dataBlockName: 'pools', dataBlockElement: 'poolTypesTable', event: 'change' })

        // this.runElementListeners({ dataBlockName: 'pools', dataBlockElement: 'poolTypesTable', event: 'click' })

        // $(this.pools.poolTypesTable.appendButtonElement).on('click', e => {
        //     this.pools.poolTypesTable.appendButtonListeners.forEach(func => {
        //         func(e)
        //     })
        // })

        // $(this.pools.poolTypesTable.removeButtonElement).on('click', e => {
        //     this.pools.poolTypesTable.removeButtonListeners.forEach(func => {
        //         func(e)
        //     })
        // })

        // on change in table
        this.runElementListeners({ dataBlockName: 'pools', dataBlockElement: 'poolsTable', event: 'change' })

        // Vesting And Unlocking //

        // vesting

        // unlocking

        // vesting table
        this.runElementListeners({ dataBlockName: 'vestingAndUnlocking', dataBlockElement: 'vestingTable', event: 'change' })

        // unlocking table
        this.runElementListeners({ dataBlockName: 'vestingAndUnlocking', dataBlockElement: 'unlockingTable', event: 'change' })


        // Project Services //

        // stacking
        // this.changeValueAndPreValueOfElementAndRunListeners({ dataBlockName: 'projectServices', dataBlockElement: 'staking' })

        // farming
        // this.changeValueAndPreValueOfElementAndRunListeners({ dataBlockName: 'projectServices', dataBlockElement: 'farming' })

        // serviceName
        // $(this.projectServices.serviceName.element).on('change', e => {
        //     this.projectServices.serviceName.prevValue = this.projectServices.serviceName.value
        //     this.projectServices.serviceName.value = e.currentTarget.value

        //     this.projectServices.serviceName.listeners.forEach(func => {
        //         func(e)
        //     })
        // })

        // project-services
        // $(this.projectServices.projectServicesTable.element).on('change', e => {
        //     this.projectServices.projectServicesTable.listeners.forEach(func => {
        //         func(e)
        //     })
        // })


        // Token Circulation

        // add action
        // $(this.tokenCirculation.actionsNumber.element).on('change', e => {
        //     this.tokenCirculation.actionsNumber.prevValue = this.tokenCirculation.actionsNumber.value
        //     this.tokenCirculation.actionsNumber.value = e.currentTarget.value

        //     this.tokenCirculation.actionsNumber.listeners.forEach(func => {
        //         func(e)
        //     })
        // })

        // table
        // $(this.tokenCirculation.actionsTable.element).on('change', e => {
        //     this.tokenCirculation.actionsTable.listeners.forEach(func => {
        //         func(e)
        //     })
        // })
    }

    initRuledEventsListeners() {
        // Initial Data //

        this.initialData.totalTokensAmount.listeners.push(e => {

            // this.investmentRounds.roundsTable.value.forEach(round => {
            //     if (this.investmentRounds.roundsTable.value[round.id].tokenPrice !== '' && this.investmentRounds.roundsTable.value[round.id].investorShare !== '%') {
            //         $('#zbcc .data-block#investment-rounds #rounds tr#' + round.id + ' #tokens-amount').value(
            //             (this.initialData.totalTokensAmount * this.investmentRounds.roundsTable.value[round.id].investorShare) / 100
            //         )
            //         $('#zbcc .data-block#investment-rounds #rounds tr#' + round.id + ' #fiat').value(
            //             (this.initialData.totalTokensAmount * this.investmentRounds.roundsTable.value[round.id].investorShare) / 100 * this.investmentRounds.roundsTable.value[round.id].tokenPrice
            //         )
            //     } else if (true) {
            //     }
            // })
        })

        this.initialData.initialTokenPrice.listeners.push(e => {
            console.log(e)
        })

        this.initialData.exchangeType.listeners.push(e => {
            console.log(e)

        })

        this.initialData.tradingFunction.listeners.push(e => {
            console.log(e)

        })

        this.initialData.duration.listeners.push(e => {
            console.log(e)

        })


        // Investment Rounds //

        this.investmentRounds.roundsNumber.listeners.push(e => {
            this.changeNumOfTrUsingNumberInput({
                dataBlockName: 'investmentRounds',
                trsNumberCounter: 'roundsNumber',
                trsTable: 'roundsTable',

                tablePreElement: {
                    roundTitle: '#zbcc .data-block#{data-clock-html-id} table#{table-html-id} tr#{tr-html-id} #round-title',
                    fiat: '#zbcc .data-block#{data-clock-html-id} table#{table-html-id} tr#{tr-html-id} #fiat',
                    tokenPrice: '#zbcc .data-block#{data-clock-html-id} table#{table-html-id} tr#{tr-html-id} #token-price',
                    tokensAmount: '#zbcc .data-block#{data-clock-html-id} table#{table-html-id} tr#{tr-html-id} #tokens-amount',
                    investorShare: '#zbcc .data-block#{data-clock-html-id} table#{table-html-id} tr#{tr-html-id} #investor-share'
                },

                dataBlockHtmlId: 'investment-rounds',
                tableHtmlId: 'rounds',

                htmlTemplate: htmlTemplates.trRound
            })
        })

        this.investmentRounds.roundsTable.listeners.push(e => {
            // console.log(e)
            console.log(e.target.parentElement.parentElement.id)
        })


        // Agents //

        this.agents.agentsNumber.listeners.push(e => {
            this.changeNumOfTrUsingNumberInput({
                dataBlockName: 'agents',
                trsNumberCounter: 'agentsNumber',
                trsTable: 'agentsTable',

                tablePreElement: {
                    agentName: '#zbcc .data-block#{data-block-html-id} table#{table-html-id} tr#tr-html-id #agent-name',
                    agenShare: '#zbcc .data-block#{data-block-html-id} table#{table-html-id} tr#tr-html-id #agent-share',
                    tokensAmount: '#zbcc .data-block#{data-block-html-id} table#{table-html-id} tr#tr-html-id #tokens-amount'
                },

                dataBlockHtmlId: 'agents',
                tableHtmlId: 'agents',

                htmlTemplate: htmlTemplates.trAgent
            })
        })

        this.agents.agentsTable.listeners.push(e => {

        })


        // Pools //

        this.pools.poolTypesTable.listeners.push(e => {
            // if ()
            console.log(e)
        })

        this.pools.poolTypesTable.appendButtonListeners.push(e => {
            this.changeNumOfTrUsingCalcButtons({
                action: 'append'
            })
        })

        this.pools.poolTypesTable.removeButtonListeners.push(e => {
            this.changeNumOfTrUsingCalcButtons({
                action: 'remove',
                id: 1
            })
        })

        this.pools.poolsTable.listeners.push(e => {

        })


        // Vesting And Unlocking //

        this.vestingAndUnlocking.vestingTable.listeners.push(e => {

        })

        this.vestingAndUnlocking.unlockingTable.listeners.push(e => {

        })


        // Project Services //

        this.projectServices.staking.listeners.push(e => {

        })

        this.projectServices.farming.listeners.push(e => {

        })

        this.projectServices.serviceName.listeners.push(e => {

        })

        this.projectServices.projectServicesTable.listeners.push(e => {

        })


        // Token Circulation //

        this.tokenCirculation.actionsNumber.listeners.push(e => {

        })

        this.tokenCirculation.actionsTable.listeners.push(e => {

        })
    }
}



// $(document).ready(() => {

// })











































































        // this.vestingAndUnlocking = {
        //     vestingTable: {
        //         value: [
        //             {
        //                 id: 0,
        //                 agentName: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#0 #agent-name')[0].value,
        //                 pool: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#0 #pool')[0].value,
        //                 startVesting: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#0 #start-vesting')[0].value,
        //                 endVesting: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#0 #end-vesting')[0].value,
        //                 vestingCoefficient: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#0 #vesting-coefficient')[0].value
        //             },
        //             {
        //                 id: 1,
        //                 agentName: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#1 #agent-name')[0].value,
        //                 pool: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#1 #pool')[0].value,
        //                 startVesting: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#1 #start-vesting')[0].value,
        //                 endVesting: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#1 #end-vesting')[0].value,
        //                 vestingCoefficient: $('#zbcc .data-block#vesting-and-unlocking table#vesting tr#1 #vesting-coefficient')[0].value
        //             }
        //         ],
        //         element: $('#zbcc .data-block#vesting-and-unlocking table#vesting')[0],
        //         listeners: []
        //     },
        //     unlockingTable: {
        //         value: [
        //             {
        //                 id: 0,
        //                 agentName: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#0 #agent-name')[0].value,
        //                 startUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#0 #start-unlocking')[0].value,
        //                 endUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#0 #end-unlocking')[0].value,
        //                 initialUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#0 #initial-unlocking')[0].value
        //             },
        //             {
        //                 id: 1,
        //                 agentName: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#1 #agent-name')[0].value,
        //                 startUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#1 #start-unlocking')[0].value,
        //                 endUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#1 #end-unlocking')[0].value,
        //                 initialUnlocking: $('#zbcc .data-block#vesting-and-unlocking table#unlocking tr#1 #initial-unlocking')[0].value
        //             }
        //         ],
        //         element: $('#zbcc .data-block#vesting-and-unlocking table#unlocking')[0],
        //         listeners: []
        //     }
        // }

        // this.projectServices = {
        //     staking: {
        //         prevValue: $('#zbcc .data-block#project-services #staking')[0].value,
        //         value: $('#zbcc .data-block#project-services #staking')[0].value,
        //         element: $('#zbcc .data-block#project-services #staking')[0],
        //         listeners: []
        //     },
        //     farming: {
        //         prevValue: $('#zbcc .data-block#project-services #farming')[0].value,
        //         value: $('#zbcc .data-block#project-services #farming')[0].value,
        //         element: $('#zbcc .data-block#project-services #farming')[0],
        //         listeners: []
        //     },
        //     serviceName: {
        //         prevValue: $('#zbcc .data-block#project-services #service-name')[0].value,
        //         value: $('#zbcc .data-block#project-services #service-name')[0].value,
        //         element: $('#zbcc .data-block#project-services #service-name')[0],
        //         listeners: []
        //     },
        //     projectServicesTable: {
        //         value: [
        //             {
        //                 id: 0,
        //                 curveNumber: $('#zbcc .data-block#project-services table#project-services tr#0 #curve-number')[0].value,
        //                 salesStart: $('#zbcc .data-block#project-services table#project-services tr#0 #sales-start')[0].value,
        //                 salesEnd: $('#zbcc .data-block#project-services table#project-services tr#0 #sales-end')[0].value,
        //                 salesMin: $('#zbcc .data-block#project-services table#project-services tr#0 #sales-min')[0].value,
        //                 salesMax: $('#zbcc .data-block#project-services table#project-services tr#0 #sales-max')[0].value,
        //                 chooseAlgorithm: $('#zbcc .data-block#project-services table#project-services tr#0 #choose-algorithm')[0].value,
        //                 angularCoefficient: $('#zbcc .data-block#project-services table#project-services tr#0 #angular-coefficient')[0].value,
        //                 risingsCoefficient: $('#zbcc .data-block#project-services table#project-services tr#0 #risings-coefficient')[0].value,
        //             },
        //             {
        //                 id: 1,
        //                 curveNumber: $('#zbcc .data-block#project-services table#project-services tr#1 #curve-number')[0].value,
        //                 salesStart: $('#zbcc .data-block#project-services table#project-services tr#1 #sales-start')[0].value,
        //                 salesEnd: $('#zbcc .data-block#project-services table#project-services tr#1 #sales-end')[0].value,
        //                 salesMin: $('#zbcc .data-block#project-services table#project-services tr#1 #sales-min')[0].value,
        //                 salesMax: $('#zbcc .data-block#project-services table#project-services tr#1 #sales-max')[0].value,
        //                 chooseAlgorithm: $('#zbcc .data-block#project-services table#project-services tr#1 #choose-algorithm')[0].value,
        //                 angularCoefficient: $('#zbcc .data-block#project-services table#project-services tr#1 #angular-coefficient')[0].value,
        //                 risingsCoefficient: $('#zbcc .data-block#project-services table#project-services tr#1 #risings-coefficient')[0].value,
        //             },
        //             {
        //                 id: 2,
        //                 curveNumber: $('#zbcc .data-block#project-services table#project-services tr#2 #curve-number')[0].value,
        //                 salesStart: $('#zbcc .data-block#project-services table#project-services tr#2 #sales-start')[0].value,
        //                 salesEnd: $('#zbcc .data-block#project-services table#project-services tr#2 #sales-end')[0].value,
        //                 salesMin: $('#zbcc .data-block#project-services table#project-services tr#2 #sales-min')[0].value,
        //                 salesMax: $('#zbcc .data-block#project-services table#project-services tr#2 #sales-max')[0].value,
        //                 chooseAlgorithm: $('#zbcc .data-block#project-services table#project-services tr#2 #choose-algorithm')[0].value,
        //                 angularCoefficient: $('#zbcc .data-block#project-services table#project-services tr#2 #angular-coefficient')[0].value,
        //                 risingsCoefficient: $('#zbcc .data-block#project-services table#project-services tr#2 #risings-coefficient')[0].value,
        //             }
        //         ],
        //         element: $('#zbcc .data-block#project-services table#project-services')[0],
        //         listeners: []
        //     },
        // }

        // this.tokenCirculation = {
        //     actionsNumber: {
        //         prevValue: $('#zbcc .data-block#token-circulation #actions-number')[0].value,
        //         value: $('#zbcc .data-block#token-circulation #actions-number')[0].value,
        //         element: $('#zbcc .data-block#token-circulation #actions-number')[0],
        //         listeners: []
        //     },
        //     actionsTable: {
        //         value: [
        //             {
        //                 id: 0,
        //                 actionNumber: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #action-number')[0].value,
        //                 source: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #source')[0].value,
        //                 currencyType: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #currency-type')[0].value,
        //                 valuePercents: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #value-percents')[0].value,
        //                 destination: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #destination')[0].value,
        //                 preCondition: $('#zbcc .data-block#token-circulation table#token-circulation tr#0 #pre-condition')[0].value,
        //             },
        //             {
        //                 id: 1,
        //                 actionNumber: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #action-number')[0].value,
        //                 source: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #source')[0].value,
        //                 currencyType: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #currency-type')[0].value,
        //                 valuePercents: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #value-percents')[0].value,
        //                 destination: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #destination')[0].value,
        //                 preCondition: $('#zbcc .data-block#token-circulation table#token-circulation tr#1 #pre-condition')[0].value,
        //             },
        //             {
        //                 id: 2,
        //                 actionNumber: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #action-number')[0].value,
        //                 source: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #source')[0].value,
        //                 currencyType: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #currency-type')[0].value,
        //                 valuePercents: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #value-percents')[0].value,
        //                 destination: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #destination')[0].value,
        //                 preCondition: $('#zbcc .data-block#token-circulation table#token-circulation tr#2 #pre-condition')[0].value,
        //             }
        //         ],
        //         element: $('#zbcc .data-block#token-circulation table#token-circulation')[0],
        //         listeners: []
        //     }
        // }