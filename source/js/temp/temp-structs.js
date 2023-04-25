class htmlElement {
    constructor(params) {
        this.element = params.element

        this.listeners = {}
    }

    addEventListener(event, callback) {
        if (!Object.keys(this.listeners).includes(event) && this.listeners[event] === undefined) {
            this.listeners[event] = []

            $(this.element).on(event, e => {
                this.listeners[event].forEach(func => {
                    func(e, this)
                })
            })
        }

        this.listeners[event].push(callback)
    }
}



//



class htmlInput extends htmlElement {
    constructor(params) {
        super(params)
        this.initParams(params)

        this.valuesHistory = []
        this.verifyConditions = []

        this.value = this.element.value
        this.previousValue = this.dataType(this.value)

        this.addEventListener('change', e => {
            this.syncValue()
        })
    }

    initParams(params) {
        this.type = params.type
        this.dataType = params.dataType ?? { 'text': String, 'number': Number, 'select': String }[this.type] ?? String

        this.defaultValue = params.defaultValue
        this.allowedValues = params.allowedValues

        this.isUnic = params.isUnic ?? false
        this.linkToUnicValues = params.linkToUnicValues

        this.min = params.min
        this.max = params.max
    }

    syncValue() {
        if ( this.verifyValue(this.element.value) ) {
            this.valuesHistory.push({ previousValue: this.previousValue, value: this.value })
            this.previousValue = this.dataType(this.value)
            this.value = this.dataType(this.element.value)
        } else {
            if (this.type === 'text') {
                this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue
            } else if (this.type === 'number') {
                this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue
            } else if (this.type === 'select') {

            }
        }
    }

    verifyValue(value) {
        if (typeof this.dataType() !== typeof value && typeof this.dataType() !== typeof this.dataType(value))
            return false

        if (this.allowedValues !== undefined)
            if (!this.allowedValues.includes(value))
                return false

        if (this.isUnic)
            if (this.linkToUnicValues !== undefined && this.linkToUnicValues.includes(value))
                return false

        if (this.dataType === Number && value === '')
            return false

        if (this.min !== undefined && value < this.min)
            return false

        if (this.max !== undefined && value > this.max)
            return false

        this.verifyConditions.forEach(uncondition => {
            if ( !uncondition(value) )
                return false
        })

        return true
    }

    addVerifyUnCondition(uncondition) {
        this.verifyConditions.push(uncondition)
    }
}



class TextInput extends htmlInput {
    constructor(params) {
        super(Object.assign(params, { type: 'text', dataType: String } ))
    }
}



class NumberInput extends htmlInput {
    constructor(params) {
        super(Object.assign(params, { type: 'number', dataType: Number } ))
    }
}



class SelectInput extends htmlInput {
    constructor(params) {
        super(Object.assign(params, { type: 'select', dataType: String } ))
    }
}



//



class DataBlock {
    constructor(params) {
        this.extraInputs = params.extraInputs
        this.baseInputs = params.baseInputs
    }
}



class ExtraInputs {
    constructor(params) {
        this.inputs = params.inputs
        this.tables = params.tables
    }
}



class BaseInputs {
    constructor(params) {
        this.inputs = params.inputs
        this.tables = params.tables
    }
}



//



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
        this.row = {}

        this.row.numberOfInitial = params.row.numberOfInitial
        this.row.numberOfMin = params.row.numberOfMin

        this.row.htmlTemplate = params.row.htmlTemplate

        this.row.tableId = params.row.tableId
        this.row.trSelector = params.row.trSelector
        this.row.inputsSelectors = params.row.inputsSelectors

        this.row.inputsTypes = params.row.inputsTypes
        this.row.unicInputs = params.row.unicInputs

        this.row.linksToDependableSelects = params.row.linksToDependableSelects
        this.row.linksToOptions = params.row.linksToOptions

        this.unicValues = []
        this.rows = {}
    }

    initRows() {
        for (let rowId = 0; rowId < this.row.numberOfInitial; rowId++) {
            this.appendRow(rowId)
        }
    }

    getRowBySelectors(rowId) {
        let row = { id: Number(rowId) }

        Object.keys(this.row.inputsSelectors).forEach(inputName => {
            let input
            let inputElement = $(
                this.row.inputsSelectors[inputName]
                .replace('{table-id}', this.row.tableId)
                .replace('{tr-id}', rowId)
            )[0]

            if (this.row.inputsTypes[inputName] === 'text')
                input = new TextInput({ element: inputElement, dataType: String })
            else if (this.row.inputsTypes[inputName] === 'number')
                input = new NumberInput({ element: inputElement, dataType: Number })
            else if (this.row.inputsTypes[inputName] === 'select')
                input = new SelectInput({ element: inputElement, dataType: String })
            else
                input = new TextInput({ element: inputElement, dataType: this.row.inputsTypes[inputName] })

            if (this.row.unicInputs !== undefined )
                input.isUnic = this.row.unicInputs.includes(inputName)

            row[inputName] = input
        })

        return row
    }

    appendRow(rowId) {
        if (rowId === undefined) {
            let idsOfRows = []
            let maxRowId = 0

            Object.values(this.rows).forEach(row => {
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
                rowId = Object.keys(this.rows).length
        }

        let rowHtml = this.row.htmlTemplate
            .replaceAll('{id}', rowId)
            .replaceAll('{number}', rowId + 1)

        if (this.row.linksToOptions !== undefined) {
            Object.keys(this.row.linksToOptions).forEach(linkedInput => {
                let optionsHtml = ''
                let options = this.row.linksToOptions[linkedInput]

                Array.from( $(options.selector) ).forEach(optionDataInput => {
                    optionsHtml += options.optionHtmlTemplate
                        .replace('{id}', optionDataInput.parentNode.parentNode.id)
                        .replace('{value}', optionDataInput.value)
                        .replace('{text}', optionDataInput.value)
                })

                rowHtml = rowHtml.replaceAll(options.mask, optionsHtml)
            })
        }

        $(this.element).append(rowHtml)
        this.sortRows()
        this.rows[rowId] = this.getRowBySelectors(rowId)

        if (this.row.linksToDependableSelects !== undefined)
            this.appendOptionToLinkedSelectInputs(rowId)
    }

    sortRows() {
        let rowSelectors = Array.from(
            $(this.row.trSelector
                .replace('{table-id}', this.row.tableId !== undefined ? this.row.tableId : '')
        ))

        rowSelectors.sort((a, b) => {
            let compA = Number($(a).attr('id').toUpperCase())
            let compB = Number($(b).attr('id').toUpperCase())
            return (compA < compB) ? -1 : ((compA > compB) ? 1 : 0)
        })

        $.each(rowSelectors, (idx, itm) => {
            $(this.element).append(itm)
        })
    }

    removeRow(rowId, force) {
        if (Object.keys(this.rows).length === this.row.numberOfMin && (force === undefined || force !== true))
            return

        let rowIndex

        Object.values(this.rows).forEach((row, index) => {
            if (row.id === rowId)
                rowIndex = index
        })

        if (this.row.linksToDependableSelects !== undefined) {
            this.removeOptionFromLinkedSelectInputs(rowIndex ?? rowId)
        }

        $(Object.values($(this.row.trSelector))[rowIndex ?? rowId]).remove()
        delete this.rows[rowIndex ?? rowId]
    }

    appendOptionToLinkedSelectInputs(rowId) {
        Object.keys(this.row.linksToDependableSelects).forEach(input => {
            this.row.linksToDependableSelects[input].selects.forEach(select => {
                Array.from( $(select) ).forEach(selectInput => {
                    let previousOptionId = 0

                    Object.values(this.rows).forEach(row => {
                        if (row.id > previousOptionId && row.id < rowId)
                            previousOptionId = row.id
                    })

                    if (Object.values(this.rows).length > 1) {
                        $(selectInput).find(
                            this.row.linksToDependableSelects[input].optionSelector
                                .replace('{id}', this.rows[previousOptionId].id)
                                .replace('{value}', this.rows[previousOptionId][input].value)
                        ).after(
                            this.row.linksToDependableSelects[input].optionHtmlTemplate
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
        Object.keys(this.row.linksToDependableSelects).forEach(input => {
            this.row.linksToDependableSelects[input].selects.forEach(select => {
                Array.from($(select)).forEach(selectInput => {
                    $(selectInput).find(
                        this.row.linksToDependableSelects[input].optionSelector
                        .replace('{value}', this.rows[id][input].value)
                        .replace('{id}', id)
                    ).remove()
                })
            })
        })
    }

    editOptionInLinkedSelectInputs(e) {
        if (this.row.linksToDependableSelects === undefined)
            return

        Object.keys(this.row.linksToDependableSelects).forEach(input => {
            if (this.row.linksToDependableSelects[input].inputId === e.originalEvent.target.id) {
                Array.from( $(this.row.linksToDependableSelects[input].optionSelector
                    .replace('{value}', this.rows[e.originalEvent.target.parentNode.parentNode.id][input].previousValue)
                    .replace('{id}', e.originalEvent.target.parentNode.parentNode.id))
                ).forEach(option => {
                    $(option).html(this.rows[e.originalEvent.target.parentNode.parentNode.id][input].value)
                    $(option).attr('value', this.rows[e.originalEvent.target.parentNode.parentNode.id][input].value)
                })
            }
        })
    }

    clearData() {
        for (let i = Object.keys(this.rows).length - 1; i >= 0; i--)
            this.removeRow(i, true)

        for (let i = 0; i < this.row.numberOfMin; i++)
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
        this.numerableInput = params.numerableInput

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        if (this.numerableInput.value === undefined) {
            this.numerableInput.syncValue()
        }

        this.numerableInput.addEventListener('change', (e, input) => {
            if (input.value < this.row.numberOfMin || input.value === '') {
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

        this.calcAppendBtnSelector = params.calcAppendBtnSelector
        this.calcRemoveBtnSelector = params.calcRemoveBtnSelector

        this.showItAgain = params.showItAgain
        this.removeClasses = params.removeClasses
        this.addCurvesBtnSelector = params.addCurvesBtnSelector

        this.listenForChangesInNumOfRows()
    }

    listenForChangesInNumOfRows() {
        $(this.element).on('click', this.calcAppendBtnSelector, e => {
            this.appendRow()
        })

        $(this.element).on('click', this.calcRemoveBtnSelector, e => {
            this.removeRow(Number(e.currentTarget.parentNode.parentNode.parentNode.id))
        })

        if (this.addCurvesBtnSelector !== undefined && this.removeClasses !== undefined) {
            $(this.element.parentNode).on('click', this.addCurvesBtnSelector, e => {
                this.removeClasses.forEach(cssClass => {
                    $(this.element.parentNode).removeClass(cssClass)
                })
            })

            console.log(this)
            console.log($(this.element))
            console.log($(this.element.parentNode))
            console.log($(this.element.parentNode.parentNode))

            $(this.element.parentNode.parentNode).on('click', this.showItAgain, e => {
                if (this.element.parentNode.id === e.target.parentNode.id) {
                    // $(this.element.parentNode).addClass('unhidden')
                }
                console.log(e.target.parentNode.id)
                console.log('show it again')
            })
        }
    }
}



//



class UnhiddableTables {
    constructor(params) {
        this.unhidders = params.unhidders
        this.tables = params.tables

        this.cssClass = params.cssClass

        this.curveableTablesSelector = params.curveableTablesSelector
        this.curveableTablesCssClass = params.curveableTablesCssClass

        this.choosableCalcableTablesSelector = params.choosableCalcableTablesSelector
        this.choosableCalcableTablesCssClass = params.choosableCalcableTablesCssClass

        this.listenOnUnhidderClick()
    }

    listenOnUnhidderClick() {
        let unhiddersList = Object.keys(this.unhidders)
        unhiddersList.forEach(key => {
            $(this.unhidders[key]).on('click', e => {
                $(this.choosableCalcableTablesSelector).removeClass(this.choosableCalcableTablesCssClass)
                $(this.curveableTablesSelector).removeClass(this.curveableTablesCssClass)

                if ( $(e.currentTarget).hasClass(this.cssClass) ) {
                    this.tables[key].clearData()
                    $(this.unhidders[key]).html('+').removeClass(this.cssClass)
                    $(this.tables[key].element.parentNode).removeClass(this.cssClass)
                } else {
                    $(this.unhidders[key]).html('-').addClass(this.cssClass)
                    $(this.tables[key].element.parentNode).addClass(this.cssClass)

                    unhiddersList.forEach(key2 => {
                        if (key !== key2) {
                            $(this.unhidders[key2]).html('+').removeClass(this.cssClass)
                            $(this.tables[key2].element.parentNode).removeClass(this.cssClass)
                        }
                    })
                }
            })
        })
    }
}


class ChoosableCalcableTables {
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
        this.unhidders = params.unhidders

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

        this.presetTable.calcAppendBtnSelector = params.presetTable.calcAppendBtnSelector
        this.presetTable.calcRemoveBtnSelector = params.presetTable.calcRemoveBtnSelector

        this.presetTable.tableParentElement = params.presetTable.tableParentElement
        this.presetTable.tableBlockSelector = params.presetTable.tableBlockSelector
        this.presetTable.tableSelector = params.presetTable.tableSelector
        this.presetTable.htmlTableTemplate = params.presetTable.htmlTableTemplate

        this.presetTable.header = {}
        this.presetTable.header.titleElement = params.presetTable.header.titleElement
        this.presetTable.header.curvesTitleElement = params.presetTable.header.curvesTitleElement
        this.presetTable.header.titlePreset = params.presetTable.header.titlePreset
        this.presetTable.header.description = params.presetTable.header.description

        this.presetTable.row = {}
        this.presetTable.row.numberOfInitial = params.presetTable.row.numberOfInitial
        this.presetTable.row.numberOfMin = params.presetTable.row.numberOfMin
        this.presetTable.row.tableId = params.presetTable.row.tableId
        this.presetTable.row.htmlTemplate = params.presetTable.row.htmlTemplate
        this.presetTable.row.trSelector = params.presetTable.row.trSelector
        this.presetTable.row.inputsSelectors = params.presetTable.row.inputsSelectors
        this.presetTable.row.inputsTypes = params.presetTable.row.inputsTypes
        this.presetTable.row.linksToOptions = params.presetTable.row.linksToOptions

        this.listenOnEvents()
    }

    hideUnhiddable() {
        $(this.unhiddableTablesSelector).removeClass(this.unhiddableTablesCssClass)
        $(this.presetTable.curveableTablesSelector).removeClass(this.presetTable.curveableTablesCssClass)

        Object.keys(this.unhidders).forEach(key => {
            $(this.unhidders[key]).html('+').removeClass(this.unhiddableTablesCssClass)
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

            Object.keys(this.services).forEach(serviceId => {
                servicesNames[this.services[serviceId].name] = serviceId
            })

            if ( Object.keys(servicesNames).includes( $(this.controls.serviceNameInput).val() )) {
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

        Object.values(this.services).forEach(service => {
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
            id = Object.keys(this.services).length

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
                calcAppendBtnSelector: this.presetTable.calcAppendBtnSelector,
                calcRemoveBtnSelector: this.presetTable.calcRemoveBtnSelector,

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
            let idsOfTables = Object.keys(this.tables)
            let curId = e.target.parentNode.id

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
            $(this.saSelector.replace('{table-id}', e.target.parentNode.id)).addClass(this.unhiddableTablesCssClass)
            $(this.sbSelector.replace('{table-id}', e.target.parentNode.id)).addClass(this.choosableTablesCssClass)
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
                calcAppendBtnSelector: this.presetTable.calcAppendBtnSelector,
                calcRemoveBtnSelector: this.presetTable.calcRemoveBtnSelector,

                tableBlockSelector: this.presetTable.tableBlockSelector,

                removeClasses: this.presetTable.removeClasses,
                addCurvesBtnSelector: this.presetTable.addCurvesBtnSelector,

                row: Object.assign(this.presetTable.row, { tableId: id })
            })
        }

        return table
    }
}