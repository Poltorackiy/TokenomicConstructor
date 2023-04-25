class htmlTable extends htmlElement {
    constructor(params) {
        super(params)

        this.initParams(params)

        this.rows = {}
        this.rowChangesListeners = []
        this.rowAddingListeners = []
        this.rowDeletingListeners = []
        this.controlsListeners = {}
        this.actionBtnsListeners = {}

        if (this.type !== 'one-row' && this.isInitable)
            this.initRows()

        this.addEventListener('change', e => {
            this.editOptionInLinkedSelectInputs(e)
        })

        this.addEventListener('change', e => {
            this.rowChangesListeners.forEach(func => {
                func(e, this)
            })
        })

        this.listenActionButtons()
    }


    initParams(params) {
        this.name = params.name
        this.type = params.type
        this.isInitable = params.isInitable ?? true
        this.isEmpty = true

        if (params.elementSelector.indexOf('{table-id}') !== -1) {
            this.elementSelector = params.elementSelector.replace('{table-id}', params.tableId)
            this.element = $(this.elementSelector)[0]
        }

        this.id = params.tableId ?? $(this.element).parent().attr('data-id') ?? ''

        this.controls = params.controls ?? {}
        this.actionButtons = params.actionButtons ?? {}

        this.rowPreset = {}

        this.rowPreset.numOnInit = params.rowPreset.numOnInit
        this.rowPreset.numOfMin = params.rowPreset.numOfMin

        this.rowPreset.htmlTemplate = params.rowPreset.htmlTemplate

        this.rowPreset.trSelector = params.rowPreset.trSelector.replace('{table-id}', this.id)
        this.rowPreset.inputsSelectors = params.rowPreset.inputsSelectors
        this.rowPreset.inputsParams = params.rowPreset.inputsParams

        this.rowPreset.linksToOptions = params.rowPreset.linksToOptions
        this.rowPreset.linksToDependableSelects = params.rowPreset.linksToDependableSelects
    }

    listenActionButtons() {
        ok(this.actionButtons).forEach(actionBtnKey => {
            $(this.element.parentNode).on('click', this.actionButtons[actionBtnKey], e => {
                if (this.actionBtnsListeners[actionBtnKey] === undefined)
                    this.actionBtnsListeners[actionBtnKey] = []

                this.actionBtnsListeners[actionBtnKey].forEach(func => {
                    func(e, this)
                })
            })
        })
    }

    addRowAddingListener(callback) {
        this.rowAddingListeners.push(callback)
    }

    addRowDeletingListener(callback) {
        this.rowDeletingListeners.push(callback)
    }

    addRowChangeListener(callback) {
        this.rowChangesListeners.push(callback)
    }

    addControlsListener(controlerName, callback) {
        if (this.controlsListeners[controlerName] === undefined)
            this.controlsListeners[controlerName] = []
        this.controlsListeners[controlerName].push(callback)
    }

    addActionBtnsListener(actionBtnName, callback) {
        if (this.actionBtnsListeners[actionBtnName] === undefined)
            this.actionBtnsListeners[actionBtnName] = []
        this.actionBtnsListeners[actionBtnName].push(callback)
    }


    initRows() {
        for (let rowId = 0; rowId < this.rowPreset.numOnInit; rowId++) {
            this.addRow(rowId)
        }

        this.isEmpty = false
    }

    getRowBySelectors(rowId) {
        let row = { id: Number(rowId) }

        ok(this.rowPreset.inputsSelectors).forEach(inputName => {
            let input

            let inputSelector = this.rowPreset.inputsSelectors[inputName]
                .replace('{table-id}', this.id)
                .replace('{tr-id}', rowId)

            let inputParams = { elementSelector: inputSelector, type: this.rowPreset.inputsParams[inputName].type, dataType: this.rowPreset.inputsParams[inputName].dataType, allowedValues: this.rowPreset.inputsParams[inputName].allowedValues }

            if (this.rowPreset.inputsParams[inputName].type === 'text')
                input = new TextInput(inputParams)
            else if (this.rowPreset.inputsParams[inputName].type === 'number')
                input = new NumberInput(inputParams)
            else if (this.rowPreset.inputsParams[inputName].type === 'select')
                input = new SelectInput(inputParams)
            else
                input = new TextInput(inputParams)

            row[inputName] = input
        })

        return row
    }

    clearData() {
        for (let i = ok(this.rows).length - 1; i >= 0; i--)
            this.deleteRow(i, true)

        this.isEmpty = true
        // for (let i = 0; i < this.rowPreset.numOfMin; i++)
        //     this.addRow(i)
    }


    addRow(rowId) {
        if (rowId === undefined) {
            let idsOfRows = []
            let maxRowId = 0

            ov(this.rows).forEach(row => {
                idsOfRows.push(row.id)
                maxRowId = row.id > maxRowId ? row.id : maxRowId
            })

            for(let id = 0; id < maxRowId; id++) {
                if (!idsOfRows.includes(id)) {
                    rowId = id
                    break
                }
            }

            if (rowId === undefined)
                rowId = ok(this.rows).length
        }

        let rowHtml = this.rowPreset.htmlTemplate
            .replaceAll('{row-id}', rowId)
            .replaceAll('{row-number}', rowId + 1)

        if (this.rowPreset.linksToOptions !== undefined) {
            ok(this.rowPreset.linksToOptions).forEach(linkedInput => {
                let options = this.rowPreset.linksToOptions[linkedInput]
                let optionsHtml = ''

                Array.from( $(options.selector) ).forEach(optionDataInput => {
                    optionsHtml += options.optionHtmlTemplate
                        .replace('{id}', optionDataInput.parentNode.parentNode.dataset.id)
                        .replace('{value}', optionDataInput.value)
                        .replace('{text}', optionDataInput.value)
                })

                rowHtml = rowHtml.replaceAll(options.mask, optionsHtml)
            })
        }

        $(this.element).append(rowHtml)
        this.sortRows()

        this.rows[rowId] = this.getRowBySelectors(rowId)


        if (this.rowPreset.linksToDependableSelects !== undefined) {
            this.appendOptionToLinkedSelectInputs(rowId)
        }

        this.rowAddingListeners.forEach(func => {
            func(rowId, this.rows[rowId], this)
        })
    }

    deleteRow(rowId, force) {

        if (ok(this.rows).length === this.rowPreset.numOfMin && (force === undefined || force !== true))
            return

        let rowIndex

        ov(this.rows).forEach((row, index) => {
            if (row.id === rowId)
                rowIndex = index
        })

        // rowIndex = undefined

        if (this.rowPreset.linksToDependableSelects !== undefined) {
            this.removeOptionFromLinkedSelectInputs(rowId)
        }

        this.rowDeletingListeners.forEach(func => {
            func(rowId, this.rows[rowId], this)
        })

        $(ov( $(this.rowPreset.trSelector) )[rowIndex]).remove()
        delete this.rows[rowId]
    }


    sortRows() {
        let rowSelectors = Array.from(
            $(this.rowPreset.trSelector
                .replace('{table-id}', this.id ?? '')
        ))

        rowSelectors.sort((a, b) => {
            let compA = Number($(a).attr('data-id').toUpperCase())
            let compB = Number($(b).attr('data-id').toUpperCase())
            return (compA < compB) ? -1 : ((compA > compB) ? 1 : 0)
        })

        $.each(rowSelectors, (idx, itm) => {
            $(this.element).append(itm)
        })
    }

    appendOptionToLinkedSelectInputs(rowId) {
        ok(this.rowPreset.linksToDependableSelects).forEach(input => {
            this.rowPreset.linksToDependableSelects[input].selects.forEach(select => {
                Array.from( $(select) ).forEach(selectInput => {
                    let previousOptionId = 0

                    ov(this.rows).forEach(row => {
                        if (row.id > previousOptionId && row.id < rowId)
                            previousOptionId = row.id
                    })

                    if (ov(this.rows).length > 1) {
                        if (af($(selectInput).find(
                            this.rowPreset.linksToDependableSelects[input].optionSelector
                                .replace('{id}', this.rows[previousOptionId].id)
                                .replace('{value}', this.rows[previousOptionId][input].value)
                        )).length !== 0) {
                            $(selectInput).find(
                                this.rowPreset.linksToDependableSelects[input].optionSelector
                                .replace('{id}', this.rows[previousOptionId].id)
                                .replace('{value}', this.rows[previousOptionId][input].value)
                                ).after(
                                    this.rowPreset.linksToDependableSelects[input].optionHtmlTemplate
                                    .replaceAll('{id}', rowId)
                                    .replaceAll('{value}', this.rows[rowId][input].value)
                                    .replaceAll('{text}', this.rows[rowId][input].value)
                                    )
                                } else {
                            $(selectInput).prepend(
                                this.rowPreset.linksToDependableSelects[input].optionHtmlTemplate
                                    .replaceAll('{id}', rowId)
                                    .replaceAll('{value}', this.rows[rowId][input].value)
                                    .replaceAll('{text}', this.rows[rowId][input].value)
                            )
                        }
                    }
                })
            })
        })
    }

    removeOptionFromLinkedSelectInputs(id) {
        ok(this.rowPreset.linksToDependableSelects).forEach(input => {
            this.rowPreset.linksToDependableSelects[input].selects.forEach(select => {
                Array.from($(select)).forEach(selectInput => {
                    $(selectInput).find(
                        this.rowPreset.linksToDependableSelects[input].optionSelector
                        .replace('{id}', id)
                        .replace('{value}', this.rows[id][input].value)
                    ).remove()
                    $(selectInput).trigger('change')
                })
            })
        })
    }

    editOptionInLinkedSelectInputs(e) {
        if (this.rowPreset.linksToDependableSelects === undefined)
            return

        ok(this.rowPreset.linksToDependableSelects).forEach(input => {
            if (this.rowPreset.linksToDependableSelects[input].inputId === e.originalEvent.target.dataset.id) {
                Array.from( $(this.rowPreset.linksToDependableSelects[input].optionSelector
                    .replace('{value}', this.rows[e.originalEvent.target.parentNode.parentNode.dataset.id][input].previousValue)
                    .replace('{id}', e.originalEvent.target.parentNode.parentNode.dataset.id))
                ).forEach(option => {
                    $(option).html(this.rows[e.originalEvent.target.parentNode.parentNode.dataset.id][input].value)
                    $(option).attr('value', this.rows[e.originalEvent.target.parentNode.parentNode.dataset.id][input].value)
                })
            }
        })
    }
}

class OneRowTable extends htmlTable {
    constructor(params) {
        super(Object.assign(params, { type: 'one-row' }))
    }
}

class NumerableTable extends htmlTable {
    constructor(params) {
        super(Object.assign(params, { type: 'numerable' }))

        this.controls = {
            numerableInputSelector: params.controls.numerableInputSelector,
            numerableInput: new NumberInput({ elementSelector: params.controls.numerableInputSelector, type: 'number', dataType: 'integer' })
        }

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        if (this.controls.numerableInput.value === undefined) {
            this.controls.numerableInput.syncValue()
        }

        this.controls.numerableInput.addEventListener('change', (e, numerableInput) => {
            if (numerableInput.value < this.rowPreset.numOfMin || numerableInput.value === '') {
                return numerableInput.element.value = numerableInput.valuesHistory[numerableInput.valuesHistory.length - 1].previousValue
            }

            while (numerableInput.previousValue < numerableInput.value) {
                this.addRow(numerableInput.previousValue)
                numerableInput.previousValue++
            }

            while (numerableInput.previousValue > numerableInput.value) {
                this.deleteRow(numerableInput.previousValue - 1)
                numerableInput.previousValue--
            }

            if (this.controlsListeners.numerableInput !== undefined)
                this.controlsListeners.numerableInput.forEach(func => {
                    func(e, this, numerableInput)
                })
        })
    }
}

class CalcableTable extends htmlTable {
    constructor(params) {
        super(Object.assign(params, { type: 'calcable' }))

        this.controls = {
            calcAddBtnSelector: params.controls.calcAddBtnSelector,
            calcDeleteBtnSelector: params.controls.calcDeleteBtnSelector
        }

        this.actionButtons = params.actionButtons

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        $(this.element).on('click', this.controls.calcAddBtnSelector, e => {
            this.addRow()
        })

        $(this.element).on('click', this.controls.calcDeleteBtnSelector, e => {
            this.deleteRow(Number(e.currentTarget.parentNode.parentNode.parentNode.dataset.id))
        })

        // TODO: RECODE
        // if (this.actionButtons !== undefined) {
        //     ok(this.actionButtons).forEach(actionBtnKey => {
        //         $(this.element.parentNode).on('click', this.actionButtons[actionBtnKey], e => {
        //             if (this.actionBtnsListeners[actionBtnKey] === undefined)
        //                 this.actionBtnsListeners[actionBtnKey] = []

        //             this.actionBtnsListeners[actionBtnKey].forEach(func => {
        //                 func(e, this)
        //             })
        //         })
        //     })
        // }

        /* if (this.addCurvesBtnSelector !== undefined && this.removeClasses !== undefined) {
            $(this.element.parentNode).on('click', this.addCurvesBtnSelector, e => {
                this.removeClasses.forEach(cssClass => {
                    $(this.element.parentNode).removeClass(cssClass)
                })
            })

            $(this.element.parentNode.parentNode).on('click', this.showItAgain, e => {
                if (this.element.parentNode.dataset.id === e.target.parentNode.dataset.id) {
                    // $(this.element.parentNode).addClass('unhidden')
                }
            })
        } */
    }
}