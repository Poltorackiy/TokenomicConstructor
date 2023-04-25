class Table extends htmlElement {
    constructor(params) {
        super(params)

        this.initParams(params)

        this.initRows()

        this.addEventListener('change', e => {
            this.editOptionInLinkedSelectInputs(e)
        })
    }

    initParams(params) {
        this.rowPreset = {}

        this.rowPreset.numOnInit = params.rowPreset.numOnInit
        this.rowPreset.numOfMin = params.rowPreset.numOfMin

        this.rowPreset.htmlTemplate = params.rowPreset.htmlTemplate

        this.rowPreset.tableId = params.rowPreset.tableId
        this.rowPreset.trSelector = params.rowPreset.trSelector
        this.rowPreset.inputsSelectors = params.rowPreset.inputsSelectors

        this.rowPreset.inputsParams = params.rowPreset.inputsParams
        this.rowPreset.unicInputs = params.rowPreset.unicInputs

        this.rowPreset.linksToDependableSelects = params.rowPreset.linksToDependableSelects
        this.rowPreset.linksToOptions = params.rowPreset.linksToOptions

        this.unicValues = []
        this.rows = {}
    }

    initRows() {
        for (let rowId = 0; rowId < this.rowPreset.numOnInit; rowId++) {
            this.appendRow(rowId)
        }
    }

    getRowBySelectors(rowId) {
        let row = { id: Number(rowId) }

        ok(this.rowPreset.inputsSelectors).forEach(inputName => {
            let input
            let inputElement = $(
                this.rowPreset.inputsSelectors[inputName]
                .replace('{table-id}', this.rowPreset.tableId)
                .replace('{tr-id}', rowId)
            )[0]

            let params = { elementSelector: inputElement, type: this.rowPreset.inputsParams[inputName].type, dataType: this.rowPreset.inputsParams[inputName].dataType, allowedValues: this.rowPreset.inputsParams[inputName].allowedValues }

            if (this.rowPreset.inputsParams[inputName].type === 'text')
                input = new TextInput(params)
            else if (this.rowPreset.inputsParams[inputName].type === 'number')
                input = new NumberInput(params)
            else if (this.rowPreset.inputsParams[inputName].type === 'select')
                input = new SelectInput(params)
            else
                input = new TextInput({ elementSelector: inputElement })

            if (this.rowPreset.unicInputs !== undefined )
                input.isUnic = this.rowPreset.unicInputs.includes(inputName)

            row[inputName] = input
        })

        return row
    }

    appendRow(rowId) {
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
                let optionsHtml = ''
                let options = this.rowPreset.linksToOptions[linkedInput]

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

        if (this.rowPreset.linksToDependableSelects !== undefined)
            this.appendOptionToLinkedSelectInputs(rowId)
    }

    sortRows() {
        let rowSelectors = Array.from(
            $(this.rowPreset.trSelector
                .replace('{table-id}', this.rowPreset.tableId !== undefined ? this.rowPreset.tableId : '')
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

    clearData() {
        for (let i = ok(this.rows).length - 1; i >= 0; i--)
            this.removeRow(i, true)

        for (let i = 0; i < this.rowPreset.numOfMin; i++)
            this.appendRow(i)
    }
}



class OneRowTable {
    constructor(params) {
        this.element = params.element

        this.rows = []
    }
}



class NumerableTable extends Table {
    constructor(params) {
        super(params)

        this.numerableInput = new NumberInput({ elementSelector: params.numerableInputSelector, type: 'number', dataType: 'integer'})

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        if (this.numerableInput.value === undefined) {
            this.numerableInput.syncValue()
        }

        this.numerableInput.addEventListener('change', (e, input) => {
            if (input.value < this.rowPreset.numOfMin || input.value === '') {
                return input.element.value = input.valuesHistory[input.valuesHistory.length - 1].previousValue
            }

            while (input.previousValue < input.value) {
                this.appendRow(input.previousValue)
                input.previousValue++
            }

            while (input.previousValue > input.value) {
                this.removeRow(input.previousValue - 1)
                input.previousValue--
            }
        })
    }
}



class CalcableTable extends Table {
    constructor(params) {
        super(params)

        this.calcAddBtnSelector = params.calcAddBtnSelector
        this.calcDeleteBtnSelector = params.calcDeleteBtnSelector

        this.showItAgain = params.showItAgain
        this.removeClasses = params.removeClasses
        this.addCurvesBtnSelector = params.addCurvesBtnSelector

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        $(this.element).on('click', this.calcAddBtnSelector, e => {
            this.appendRow()
        })

        $(this.element).on('click', this.calcDeleteBtnSelector, e => {
            this.removeRow(Number(e.currentTarget.parentNode.parentNode.parentNode.dataset.id))
        })

        if (this.addCurvesBtnSelector !== undefined && this.removeClasses !== undefined) {
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
        }
    }
}



//



class UnhideableTables {
    constructor(params) {
        this.unhiders = params.unhiders
        this.tables = params.tables

        this.cssClass = params.cssClass

        this.curveableTablesSelector = params.curveableTablesSelector
        this.curveableTablesCssClass = params.curveableTablesCssClass

        this.activeTableId = ''

        this.choosableCalcableTablesSelector = params.choosableCalcableTablesSelector
        this.choosableCalcableTablesCssClass = params.choosableCalcableTablesCssClass

        this.listenOnUnhiderClick()
    }

    listenOnUnhiderClick() {
        let unhidersList = ok(this.unhiders)
        unhidersList.forEach(key => {
            $(this.unhiders[key]).on('click', e => {
                $(this.choosableCalcableTablesSelector).removeClass(this.choosableCalcableTablesCssClass)
                $(this.curveableTablesSelector).removeClass(this.curveableTablesCssClass)

                if ( $(e.currentTarget).hasClass(this.cssClass) ) {
                    // TODO:
                    this.tables[key].clearData()
                    this.activeTableId = ''
                    $(this.unhiders[key]).html('+').removeClass(this.cssClass)
                    $(this.tables[key].element.parentNode).removeClass(this.cssClass)
                } else {
                    this.activeTableId = key
                    $(this.unhiders[key]).html('-').addClass(this.cssClass)
                    $(this.tables[key].element.parentNode).addClass(this.cssClass)

                    unhidersList.forEach(key2 => {
                        if (key !== key2) {
                            $(this.unhiders[key2]).html('+').removeClass(this.cssClass)
                            $(this.tables[key2].element.parentNode).removeClass(this.cssClass)
                        }
                    })
                }
            })
        })
    }
}


class ChoosableTables {
    constructor(params) {
        this.cssClass = params.cssClass

        this.activeServiceId
        this.activeServiceName
        this.timeoutIdForNameChange

        this.services = {}
        this.controls = {}
        this.presetTable = {}

        this.unhiddableTablesSelector = params.unhiddableTablesSelector
        this.unhiddableTablesCssClass = params.unhiddableTablesCssClass
        this.unhiders = params.unhiders

        this.controls.serviceNameInput = params.controls.serviceNameInput
        this.controls.serviceNamesList = params.controls.serviceNamesList
        this.controls.addServiceBtn = params.controls.addServiceBtn
        this.controls.serviceNameOptionSelector = params.controls.serviceNameOptionSelector
        this.controls.serviceNameOptionTemplate = params.controls.serviceNameOptionTemplate
        this.controls.serviceNameInputPlaceholder = params.controls.serviceNameInputPlaceholder

        this.presetTable.removeClasses = params.presetTable.removeClasses
        this.presetTable.addCurvesBtnSelector = params.presetTable.addCurvesBtnSelector
        this.presetTable.curveableTablesSelector = params.presetTable.curveableTablesSelector
        this.presetTable.curveableTablesCssClass = params.presetTable.curveableTablesCssClass

        this.presetTable.calcAddBtnSelector = params.presetTable.calcAddBtnSelector
        this.presetTable.calcDeleteBtnSelector = params.presetTable.calcDeleteBtnSelector

        this.presetTable.tableParentElement = params.presetTable.tableParentElement
        this.presetTable.tableBlockSelector = params.presetTable.tableBlockSelector
        this.presetTable.tableSelector = params.presetTable.tableSelector
        this.presetTable.htmlTableTemplate = params.presetTable.htmlTableTemplate

        this.presetTable.header = {}
        this.presetTable.header.titleElement = params.presetTable.header.titleElement
        this.presetTable.header.curvesTitleElement = params.presetTable.header.curvesTitleElement
        this.presetTable.header.titlePreset = params.presetTable.header.titlePreset
        this.presetTable.header.description = params.presetTable.header.description

        this.presetTable.rowPreset = {}
        this.presetTable.rowPreset.numOnInit = params.presetTable.rowPreset.numOnInit
        this.presetTable.rowPreset.numOfMin = params.presetTable.rowPreset.numOfMin
        this.presetTable.rowPreset.tableId = params.presetTable.rowPreset.tableId
        this.presetTable.rowPreset.htmlTemplate = params.presetTable.rowPreset.htmlTemplate
        this.presetTable.rowPreset.trSelector = params.presetTable.rowPreset.trSelector
        this.presetTable.rowPreset.inputsSelectors = params.presetTable.rowPreset.inputsSelectors
        this.presetTable.rowPreset.inputsParams = params.presetTable.rowPreset.inputsParams
        this.presetTable.rowPreset.linksToOptions = params.presetTable.rowPreset.linksToOptions

        this.listenOnEvents()
    }

    hideUnhiddable() {
        $(this.unhiddableTablesSelector).removeClass(this.unhiddableTablesCssClass)
        $(this.presetTable.curveableTablesSelector).removeClass(this.presetTable.curveableTablesCssClass)

        ok(this.unhiders).forEach(key => {
            $(this.unhiders[key]).html('+').removeClass(this.unhiddableTablesCssClass)
        })
    }

    listenOnEvents() {
        $(this.controls.serviceNameInput).on('focus', e => {
            $(this.controls.serviceNameInput).val('')

            if (this.activeServiceId !== undefined && this.activeServiceName !== undefined) {
                $(this.controls.serviceNameInput).attr('placeholder', this.activeServiceName)
            } else {
                $(this.controls.serviceNameInput).attr('placeholder', '')
            }
        })

        $(this.controls.serviceNameInput).on('change', e => {
            clearTimeout(this.timeoutIdForNameChange)

            let servicesNames = {}

            ok(this.services).forEach(serviceId => {
                servicesNames[this.services[serviceId].name] = serviceId
            })

            if ( ok(servicesNames).includes( $(this.controls.serviceNameInput).val() )) {
                this.changeService(this.activeServiceId, servicesNames[$(this.controls.serviceNameInput).val()], $(this.controls.serviceNameInput).val())

                this.hideUnhiddable()
            } else {
                this.timeoutIdForNameChange = setTimeout(() => {
                    // $(this.controls.serviceNameInput).data('prev-placeholder', $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder'))
                    this.activeServiceName = $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder')

                    $(this.controls.serviceNamesList).find(this.controls.serviceNameOptionSelector.replace('{id}', this.activeServiceId)).val( $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder') )
                    $(this.controls.serviceNamesList).find(this.controls.serviceNameOptionSelector.replace('{id}', this.activeServiceId)).html( $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder') )

                    $(this.presetTable.header.titleElement.replace('{table-id}', this.activeServiceId)).html(this.presetTable.header.titlePreset.replace('{service-name}', $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder')))
                    $(this.presetTable.header.curvesTitleElement.replace('{table-id}', this.activeServiceId)).html(this.presetTable.header.titlePreset.replace('{service-name}', $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder')))

                    if (this.services[this.activeServiceId] !== undefined)
                        this.services[this.activeServiceId].name = $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder')
                }, 2000)
            }
        })

        $(this.controls.serviceNameInput).on('focusout', () => {
            setTimeout(() => {
                if ($(this.controls.serviceNameInput).val() !== '') {
                    $(this.controls.serviceNameInput).data('prev-placeholder', $(this.controls.serviceNameInput).attr('placeholder'))
                    $(this.controls.serviceNameInput).attr('placeholder', $(this.controls.serviceNameInput).val() )
                    $(this.controls.serviceNameInput).val('')
                }

                if ($(this.controls.serviceNameInput).val() === '' && $(this.controls.serviceNameInput).attr('placeholder') === '') {
                    $(this.controls.serviceNameInput).data('prev-placeholder', 'enter Service name')
                    $(this.controls.serviceNameInput).attr('placeholder', $(this.controls.serviceNameInput).data('prev-placeholder') )
                    $(this.controls.serviceNameInput).val('')
                }
            }, 0)
        })

        $(this.controls.addServiceBtn).on('click', e => {
            clearTimeout(this.timeoutIdForNameChange)

            if ($(this.controls.serviceNameInput).val() !== '' || ($(this.controls.serviceNameInput).attr('placeholder') !== 'enter Service name' && $(this.controls.serviceNameInput).attr('placeholder') !== '')) {
                this.addService($(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder'))
                this.hideUnhiddable()

                if ($(this.controls.serviceNameInput).val() !== '') {
                    $(this.controls.serviceNameInput).data('prev-placeholder', $(this.controls.serviceNameInput).attr('placeholder'))
                    $(this.controls.serviceNameInput).attr('placeholder', $(this.controls.serviceNameInput).val() )
                    $(this.controls.serviceNameInput).val('')
                }
            }
        })
    }

    addService() {
        let prevId = this.activeServiceId
        let id
        let ids = []
        let max = 0

        ov(this.services).forEach(service => {
            ids.push(service.id)
            max = service.id > max ? service.id : max
        })

        for(let i = 0; i < max; i++) {
            if (!ids.includes(i)) {
                id = i
                break
            }
        }

        if (id === undefined)
            id = ok(this.services).length

        let name = $(this.controls.serviceNameInput).val() !== '' ? $(this.controls.serviceNameInput).val() : $(this.controls.serviceNameInput).attr('placeholder')

        $(this.controls.serviceNamesList).append(
            this.controls.serviceNameOptionTemplate
                .replace('{id}', id)
                .replace('{value}', name)
                .replace('{text}', name)
        )

        this.createTable(id, name)
        this.services[id] = this.getTableBySelectors(id, name)

        this.changeService(prevId, id, name)
    }

    createTable(id, name) {
        $(this.presetTable.tableParentElement).append(
            this.presetTable.htmlTableTemplate
                .replace('{table-id}', id)
                .replace('{table-title}', name)
        )
    }

    getTableBySelectors(id, name) {
        let service = {
            id: id,
            name: name,
            table: new CalcableTable({
                element: $(this.presetTable.tableSelector.replace('{table-id}', id))[0],

                showItAgain: this.presetTable.showItAgain,
                calcAddBtnSelector: this.presetTable.calcAddBtnSelector,
                calcDeleteBtnSelector: this.presetTable.calcDeleteBtnSelector,

                curveableTablesSelector: this.presetTable.curveableTablesSelector,
                curveableTablesCssClass: this.presetTable.curveableTablesCssClass,

                removeClasses: this.presetTable.removeClasses,
                addCurvesBtnSelector: this.presetTable.addCurvesBtnSelector,

                row: Object.assign(this.presetTable.row, { tableId: id })
            })
        }

        return service
    }

    changeService(prevId, nowId, nowName) {
        if (prevId !== undefined)
            $(this.presetTable.tableBlockSelector.replace('{table-id}', prevId)).removeClass(this.cssClass)

        $(this.presetTable.tableBlockSelector.replace('{table-id}', nowId)).addClass(this.cssClass)

        this.activeServiceId = nowId
        this.activeServiceName = nowName
    }
}

class CurvesTables {
    constructor(params) {
        this.tables = {}

        this.cssClass = params.cssClass
        this.anotherServiceNameSelector = params.anotherServiceNameSelector
        this.btnTablesSelector = params.btnTablesSelector

        this.showItAgain = params.showItAgain
        this.anotherServiceNameSelector = params.anotherServiceNameSelector
        this.btnTablesSelector = params.btnTablesSelector
        this.curveableTablesSelector = params.curveableTablesSelector
        this.curveableTablesCssClass = params.curveableTablesCssClass
        this.unhiddableTablesSelector = params.unhiddableTablesSelector
        this.unhiddableTablesCssClass = params.unhiddableTablesCssClass
        this.choosableTablesSelector = params.choosableTablesSelector
        this.choosableTablesCssClass = params.choosableTablesCssClass
        this.removeClasses = params.removeClasses
        this.addCurvesBtnSelector = params.addCurvesBtnSelector

        this.saSelector = params.saSelector
        this.sbSelector = params.sbSelector

        this.tableBlockSelector = params.presetTable.tableBlockSelector

        this.presetTable = params.presetTable

        this.listenOnShowCurvesTables()
    }

    listenOnShowCurvesTables() {
        $(this.btnTablesSelector).on('click', this.addCurvesBtnSelector, e => {
            let idsOfTables = ok(this.tables)
            let curId = e.target.parentNode.dataset.id

            if (idsOfTables.includes(curId)) {
                $(this.tableBlockSelector.replace('{table-id}', curId)).addClass(this.cssClass)
            } else {
                this.createTable(
                    curId,
                    curId > -1
                        ? (
                            $(this.anotherServiceNameSelector).val() !== undefined && $(this.anotherServiceNameSelector).val() !== ''
                            ? $(this.anotherServiceNameSelector).val()
                            : $(this.anotherServiceNameSelector).attr('placeholder')
                            )
                        : curId
                )
            }
        })

        $(this.presetTable.tableParentElement).on('click', this.showItAgain, e => {
            $(this.curveableTablesSelector).removeClass(this.curveableTablesCssClass)
            $(this.saSelector.replace('{table-id}', e.target.parentNode.dataset.id)).addClass(this.unhiddableTablesCssClass)
            $(this.sbSelector.replace('{table-id}', e.target.parentNode.dataset.id)).addClass(this.choosableTablesCssClass)
            // $()
        })
    }

    createTable(id, name) {
        $(this.presetTable.tableParentElement).append(
            this.presetTable.htmlTableTemplate
                .replace('{table-id}', id)
                .replace('{service-name}', name)
        )

        this.tables[id] = this.getTableBySelectors(id, name)
    }

    getTableBySelectors(id, name) {
        let table = {
            id: id,
            name: name,
            table: new CalcableTable({
                element: $(this.presetTable.tableSelector.replace('{table-id}', id))[0],

                showItAgain: this.presetTable.showItAgain,
                calcAddBtnSelector: this.presetTable.calcAddBtnSelector,
                calcDeleteBtnSelector: this.presetTable.calcDeleteBtnSelector,

                tableBlockSelector: this.presetTable.tableBlockSelector,

                removeClasses: this.presetTable.removeClasses,
                addCurvesBtnSelector: this.presetTable.addCurvesBtnSelector,

                row: Object.assign(this.presetTable.row, { tableId: id })
            })
        }

        return table
    }
}