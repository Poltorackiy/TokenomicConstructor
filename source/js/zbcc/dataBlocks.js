class zbccDataBlock {
    constructor(params) {}

    getValues() { return {} }
}



class zbccNumerableDataBlock extends zbccDataBlock {
    constructor(params) {
        super(params)

        this.table = params.table
    }

    getValues() {
        let values = {}

        values.numerableInput = this.table.controls.numerableInput.value
        values.rows = {}
        values.name = this.table.name

        ov(this.table.rows).forEach(row => {
            let inputs = {}

            ok(row).forEach(inputKey => {
                if (inputKey !== 'id')
                    inputs[inputKey] = row[inputKey].value
            })

            values.rows[row.id] = inputs
        })

        return values
    }
}



class zbccCalcableDataBlock extends zbccDataBlock {
    constructor(params) {
        super(params)

        this.tables = params.tables
    }

    getValues() {
        let values = { tables: {} }

        ok(this.tables).forEach(tableKey => {
            let tableRows = {}

            ov(this.tables[tableKey].rows).forEach(row => {
                let inputs = {}

                ok(row).forEach(inputKey => {
                    if (inputKey !== 'id') {
                        if (row[inputKey].type !== 'select')
                            inputs[inputKey] = row[inputKey].value
                        else
                            inputs[inputKey] = row[inputKey].optionId
                    }
                })

                tableRows[row.id] = inputs
            })

            if (tableRows !== undefined && Object.keys(tableRows).length !== 0) {
                values.tables[tableKey] = { rows: tableRows, name: this.tables[tableKey].name }
            }
        })

        return values
    }
}



class zbccUnhideableDataBlock extends zbccDataBlock {
    constructor(params) {
        super(params)

        this.cssActiveClass = params.cssActiveClass
        this.unhiders = params.unhiders
        this.tables = params.tables

        this.listenOnUnhide()
    }

    listenOnUnhide() {
        ok(this.unhiders).forEach(unhiderName => {
            $(this.unhiders[unhiderName]).on('click', e => {
                if ( af(e.currentTarget.classList).includes(this.cssActiveClass)) {
                    $(this.tables[unhiderName].element).parent().removeClass(this.cssActiveClass)
                    this.tables[unhiderName].clearData()

                    $(this.unhiders[unhiderName]).removeClass(this.cssActiveClass)
                    $(this.unhiders[unhiderName]).html('+')

                } else {
                    if (this.tables[unhiderName].isEmpty)
                        this.tables[unhiderName].initRows()

                    $(this.unhiders[unhiderName]).addClass(this.cssActiveClass)
                    $(this.unhiders[unhiderName]).html('-')
                    $(this.tables[unhiderName].element).parent().addClass(this.cssActiveClass)

                    ok(this.unhiders).forEach(unhiderName2 => {
                        if (unhiderName2 !== unhiderName) {
                            $(this.tables[unhiderName2].element).parent().removeClass(this.cssActiveClass)
                            $(this.unhiders[unhiderName2]).removeClass(this.cssActiveClass)
                            $(this.unhiders[unhiderName2]).html('+')
                        }
                    })
                }
            })
        })
    }

    getValues() {
        let values = { tables: {} }

        ok(this.tables).forEach(tableKey => {
            let tableRows = {}

            ov(this.tables[tableKey].rows).forEach(row => {
                let inputs = {}

                ok(row).forEach(inputKey => {
                    if (inputKey !== 'id') {
                        if (row[inputKey].type !== 'select')
                            inputs[inputKey] = row[inputKey].value
                        else
                            inputs[inputKey] = row[inputKey].optionId
                    }
                })

                tableRows[row.id] = inputs
            })

            if (tableRows !== undefined && Object.keys(tableRows).length !== 0) {
                values.tables[tableKey] = { rows: tableRows, name: this.tables[tableKey].name }
            }
        })

        if (values.tables.actions !== undefined && this.preconds !== undefined)
            values.tables.actions.preconds = this.preconds

        return values
    }
}



//



class zbccDataBlock_InitialData extends zbccDataBlock {
    constructor(params) {
        super(params)

        this.inputsSelectors = params.inputsSelectors
        this.inputsParams = params.inputsParams
        this.inputs = {}

        ok(this.inputsSelectors).forEach(inputName => {
            let input

            let inputParams = { elementSelector: this.inputsSelectors[inputName], type: this.inputsParams[inputName].type, dataType: this.inputsParams[inputName].dataType, allowedValues: this.inputsParams[inputName].allowedValues }

            if (this.inputsParams[inputName].type === 'text')
                input = new TextInput(inputParams)
            else if (this.inputsParams[inputName].type === 'number')
                input = new NumberInput(inputParams)
            else if (this.inputsParams[inputName].type === 'select')
                input = new SelectInput(inputParams)
            else
                input = new TextInput(inputParams)

            this.inputs[inputName] = input
        })
    }

    getValues() {
        let values = {}

        ok(this.inputs).forEach(key => {
            values[key] = this.inputs[key].value
        })

        return values
    }
}



class zbccDataBlock_InvestmentRounds extends zbccNumerableDataBlock {
    constructor(params) {
        super(params)
    }
}



class zbccDataBlock_Agents extends zbccNumerableDataBlock {
    constructor(params) {
        super(params)
    }
}



class zbccDataBlock_Pools extends zbccCalcableDataBlock {
    constructor(params) {
        super(params)
    }
}



class zbccDataBlock_VestingAndUnlocking extends zbccUnhideableDataBlock {
    constructor(params) {
        super(params)
    }
}



class zbccDataBlock_ProjectServices extends zbccDataBlock {
    constructor(params) {
        super(params)

        this.unhideableCssClass = params.unhideableCssClass
        this.unhideableActiveCssClass = params.unhideableActiveCssClass
        this.choosableCssClass = params.choosableCssClass
        this.choosableActiveCssClass = params.choosableActiveCssClass
        this.curveableCssClass = params.curveableCssClass
        this.curveableActiveCssClass = params.curveableActiveCssClass

        this.unhiders = params.unhiders

        this.tablesDataBlockSelector = params.tablesDataBlockSelector
        this.htmlServiceTableTemplate = params.htmlServiceTableTemplate
        this.htmlCurvesTableTemplate = params.htmlCurvesTableTemplate
        this.htmlCurvesTableTemplateAlternative = params.htmlCurvesTableTemplateAlternative

        this.choosableTableSelector = params.choosableTableSelector

        this.choosers = {
            serviceNameInput: params.choosers.serviceNameInput,
            servicesSelectBox: params.choosers.servicesSelectBox,
            addServiceBtn: params.choosers.addServiceBtn,
            serviceNameOptionSelector: params.choosers.serviceNameOptionSelector,
            serviceNameOptionTemplate: params.choosers.serviceNameOptionTemplate,
        }

        this.curveableTablesSelector = params.curveableTablesSelector

        this.serviceTables = Object.assign({}, params.serviceTables)
        this.curveTables = Object.assign({}, params.curveTables)
        this.servicesNames = Object.assign({}, params.servicesNames)

        this.serviceTablePreset = params.serviceTablePreset
        this.curvesTablePreset = params.curvesTablePreset
        this.curvesTablePreset = params.curvesTablePreset

        this.addListeners()
    }

    addListeners() {
        // staking & farming unhide
        ok(this.unhiders).forEach(unhiderName => {
            $(this.unhiders[unhiderName]).on('click', e => {
                if ( af(e.currentTarget.classList).includes(this.unhideableActiveCssClass)) {
                    // hide

                    this.hideUnhideable(unhiderName)

                    this.serviceTables[unhiderName].clearData()

                    if (this.curveTables[unhiderName] !== undefined) {
                        this.curveTables[unhiderName].clearData()
                        this.hideCurve(unhiderName)
                    }
                } else {
                    // unhide
                    if (this.serviceTables[unhiderName].isEmpty)
                        this.serviceTables[unhiderName].initRows()

                    this.showUnhideable(unhiderName)

                    this.hideUnhideables([unhiderName])
                    this.hideServices()
                    this.hideCurves()
                }
            })
        })

        // add service / curves
        $(this.choosers.addServiceBtn).on('click', e => {
            let newServiceId = (ov(this.curveTables).length - 2) <= 0 ? 0 : ov(this.curveTables).length - 2
            let newServiceName = $(this.choosers.serviceNameInput).val()
            $(this.choosers.serviceNameInput).val('')

            this.hideUnhideables()

            this.hideServices([newServiceId])
            this.hideCurves([newServiceId])

            $(this.tablesDataBlockSelector).append(this.htmlCurvesTableTemplateAlternative
                .replace('{table-id}', newServiceId)
                .replace('{service-name}', newServiceName)
            )

            this.curveTables[newServiceId] = new CalcableTable(Object.assign(this.curvesTablePreset, { tableId: newServiceId, name: newServiceName }))

            $(this.choosers.servicesSelectBox).append(this.choosers.serviceNameOptionTemplate
                .replaceAll('{id}', newServiceId)
                .replaceAll('{value}', newServiceName)
                .replaceAll('{text}', newServiceName)
            )

            $(this.choosers.servicesSelectBox).val(newServiceName)
        })

        // select another service
        $(this.choosers.servicesSelectBox).on('click', e => {
            if (Array.from($(this.choosers.servicesSelectBox).children()).length === 0)
                return

            this.hideUnhideables()
            this.hideServices()
            this.hideCurves()

            this.showCurve(Number( $(this.choosers.servicesSelectBox).find(':selected').attr('data-id')))
        })

        // select another service
        $(this.choosers.servicesSelectBox).on('change', e => {
            if (Array.from($(this.choosers.servicesSelectBox).children()).length === 0)
                return

            this.hideUnhideables()
            this.hideServices()
            this.hideCurves()

            this.showCurve(Number( $(this.choosers.servicesSelectBox).find(':selected').attr('data-id')))
        })

        ok(this.serviceTables).forEach(initialServiceKey => {
            this.serviceTables[initialServiceKey].addActionBtnsListener('addCurves', (e, f) => {
                this.onAddCurves(e)
            })
        })
    }

    //

    showUnhideable(key) {
        $(this.unhiders[key]).addClass(this.unhideableActiveCssClass)
        $(this.unhiders[key]).html('-')

        $(this.serviceTables[key].element).parent().addClass(this.unhideableActiveCssClass)
    }

    hideUnhideable(key) {
        $(this.unhiders[key]).removeClass(this.unhideableActiveCssClass)
        $(this.unhiders[key]).html('+')

        $(this.serviceTables[key].element).parent().removeClass(this.unhideableActiveCssClass)
    }

    hideUnhideables(exceptions) {
        exceptions = exceptions ?? []
        ok(this.unhiders).forEach(unhiderName => {
            if (!exceptions.includes(unhiderName)) {
                $(this.serviceTables[unhiderName].element).parent().removeClass(this.unhideableActiveCssClass)
                $(this.unhiders[unhiderName]).removeClass(this.unhideableActiveCssClass)
                $(this.unhiders[unhiderName]).html('+')
            }
        })
    }

    hideServices(exceptions) {
        exceptions = exceptions ?? []
        ok(this.serviceTables).forEach(serviceTableKey => {
            if (!exceptions.includes(serviceTableKey)) {
                $(this.serviceTables[serviceTableKey].element).parent().removeClass(this.choosableActiveCssClass)
            }
        })
    }

    showCurve(key) {
        $(this.curveTables[key].element).parent().addClass(this.curveableActiveCssClass)
    }

    hideCurve(key) {
        $(this.curveTables[key].element).parent().removeClass(this.curveableActiveCssClass)
    }

    hideCurves(exceptions) {
        exceptions = exceptions ?? []
        ok(this.curveTables).forEach(serviceTableKey => {
            if (!exceptions.includes(serviceTableKey)) {
                $(this.curveTables[serviceTableKey].element).parent().removeClass(this.curveableActiveCssClass)
            }
        })
    }

    onAddCurves(e) {
        ok(this.unhiders).forEach(unhiderName => {
            $(this.serviceTables[unhiderName].element).parent().removeClass(this.unhideableActiveCssClass)
            // $(this.unhiders[unhiderName]).removeClass(this.unhideableActiveCssClass)
            // $(this.unhiders[unhiderName]).html('+')
        })

        ok(this.serviceTables).forEach(serviceTableKey => {
            $(this.serviceTables[serviceTableKey].element).parent().removeClass(this.choosableActiveCssClass).removeClass(this.unhideableActiveCssClass)
        })

        ok(this.curveTables).forEach(serviceTableKey => {
            $(this.curveTables[serviceTableKey].element).parent().removeClass(this.curveableActiveCssClass)
        })

        let newCurvesTableId = e.target.parentNode.parentNode.dataset.id
        let newCurvesTableName = this.servicesNames[e.target.parentNode.parentNode.dataset.id]

        if (ok(this.curveTables).includes(newCurvesTableId)) {
            $(this.curveTables[newCurvesTableId].element).parent().addClass(this.curveableActiveCssClass)
        } else {
            $(this.tablesDataBlockSelector).append(this.htmlCurvesTableTemplate
                .replace('{table-id}', newCurvesTableId)
                .replace('{service-name}', newCurvesTableName)
            )

            this.curveTables[newCurvesTableId] = new CalcableTable(Object.assign(this.curvesTablePreset, { tableId: newCurvesTableId, name: newCurvesTableName }))

            this.curveTables[newCurvesTableId].addActionBtnsListener('showService', (e, f) => {
                $(this.curveTables[newCurvesTableId].element).parent().removeClass(this.curveableActiveCssClass)

                if (($(this.serviceTables[newCurvesTableId].element).parent().attr('class').split(/\s+/)).includes(this.unhideableCssClass))
                    $(this.serviceTables[newCurvesTableId].element).parent().addClass(this.unhideableActiveCssClass)
                else if (($(this.serviceTables[newCurvesTableId].element).parent().attr('class').split(/\s+/)).includes(this.choosableCssClass))
                    $(this.serviceTables[newCurvesTableId].element).parent().addClass(this.choosableActiveCssClass)
            })
        }

        // this.serviceTables[newCurvesTableId].addActionBtnsListener('addCurves', (e, f) => {
        //     this.onAddCurves(e)
        // })
    }

    getValues() {
        let values = { serviceTables: {}, curveTables: {} }

        ok(this.serviceTables).forEach(tableKey => {
            let tableRows = {}

            ov(this.serviceTables[tableKey].rows).forEach(row => {
                let inputs = {}

                ok(row).forEach(inputKey => {
                    if (inputKey !== 'id') {
                        if (row[inputKey].type !== 'select')
                            inputs[inputKey] = row[inputKey].value
                        else
                            inputs[inputKey] = row[inputKey].optionId
                    }
                })

                tableRows[row.id] = inputs
            })

            if (tableRows !== undefined && Object.keys(tableRows).length !== 0) {
                values.serviceTables[tableKey] = {
                    rows: tableRows,
                    name: this.serviceTables[tableKey].name
                }
            }
        })

        ok(this.curveTables).forEach(tableKey => {
            let tableRows = {}

            ov(this.curveTables[tableKey].rows).forEach(row => {
                let inputs = {}

                ok(row).forEach(inputKey => {
                    if (inputKey !== 'id') {
                        inputs[inputKey] = row[inputKey].value
                    }
                })

                tableRows[row.id] = inputs
            })

            if (tableRows !== undefined && Object.keys(tableRows).length !== 0) {
                values.curveTables[tableKey] = {
                    rows: tableRows,
                    name: this.curveTables[tableKey].name
                }
            }
        })

        // console.log(this.curveTables)

        return values

        // return {
        //     services: this.serviceTables,
        //     curves: this.curveTables
        // }
    }
}



class zbccDataBlock_TokenCirculation extends zbccUnhideableDataBlock {
    constructor(params) {
        super(params)

        this.preconds = {}

        this.tables.actions.addRowChangeListener((e, table) => {
            if (e.target.dataset.id === 'pre-condition' && e.target.checked === true)
                $('#zbcc .form-block[data-id="pre-condition"]').show().attr('data-action-id', e.target.parentNode.parentNode.parentNode.dataset.id)
        })

        this.tables.actions.addRowDeletingListener((rowId, row, form) => {
            delete this.preconds[rowId]
        })
    }

    addPreCondition(precond, actionId) {
        this.preconds[actionId] = precond
    }
}
