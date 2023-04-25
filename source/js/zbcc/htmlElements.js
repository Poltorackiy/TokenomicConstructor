class htmlElement {
    constructor(params) {
        this.elementSelector = params.elementSelector
        this.element = $(this.elementSelector)[0]

        this.eventListeners = {}
    }

    addEventListener(event, callback) {
        if (!ok(this.eventListeners).includes(event) && this.eventListeners[event] === undefined) {
            this.eventListeners[event] = []

            $(this.element).on(event, e => {
                this.eventListeners[event].forEach(func => {
                    func(e, this)
                })
            })
        }

        this.eventListeners[event].push(callback)
    }
}



//



class htmlInput extends htmlElement {
    constructor(params) {
        super(params)

        this.type = params.type
        this.dataType = params.dataType ?? { 'select': 'string', 'text': 'string' }[this.type]

        this.allowedValues = params.allowedValues
        this.defaultValue = params.defaultValue

        this.valuesHistory = []
        this.valueVerifyConditions = []
        this.value = this.element.value !== '' ? this.syncValue() : undefined
        this.previousValue = undefined

        this.addEventListener('change', e => {
            this.syncValue()
            console.log('synced')
        })
    }

    addValueVerifyCondition(condition) {
        this.valueVerifyConditions.push(condition)
    }

    syncValue() {}

    verifyValue(value) {}
}



class TextInput extends htmlInput {
    constructor(params) {
        super(params)

        this.initValue()
    }

    initValue() {
        this.previousValue = undefined
        this.value = String(this.element.value)
    }

    syncValue() {
        if ( this.verifyValue(this.element.value) ) {
            this.valuesHistory.push({ previousValue: this.previousValue, value: this.value })

            this.previousValue = this.value
            this.value = String(this.element.value)
        } else {
            this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue ?? this.defaultValue ?? ''
        }
    }

    verifyValue(value) {
        if (value === undefined)
            return false

        if (typeof value !== typeof String())
            return false

        this.valueVerifyConditions.forEach(condition => {
            if ( condition(value) )
                return false
        })

        return true
    }
}



class NumberInput extends htmlInput {
    constructor(params) {
        super(params)

        this.min = this.element.min
        this.max = this.element.max
        this.step = this.element.step

        this.initValue()
    }

    initValue() {
        this.previousValue = undefined
        this.value = this.element.value !== undefined && this.element.value !== '' ? Number(this.element.value) : undefined
    }

    syncValue() {
        if ( this.verifyValue(this.element.value) ) {
            this.valuesHistory.push({ previousValue: this.previousValue, value: this.value })

            this.previousValue = this.value
            this.value = Number(this.element.value)
        } else {
            this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue ?? this.defaultValue ?? this.min ?? 1
        }
    }

    verifyValue(value) {
        if (value === undefined)
            return false

        if (isNaN( Number(value) ) || value === '')
            return false

        if (isNaN( Number(Math.round(value)) ))
            return false

        if (this.min !== undefined && this.min !== '' && value < this.min)
            return false

        if (this.max !== undefined && this.max !== '' && value > this.max)
            return false

        this.valueVerifyConditions.forEach(condition => {
            if ( condition(value) )
                return false
        })

        return true
    }
}



class SelectInput extends htmlInput {
    constructor(params) {
        super(params)

        this.initValue()
    }

    initValue() {
        this.previousValue = undefined
        this.value = String(this.element.value)
        this.optionId = Number( $(this.element).find('option:selected').attr('data-id') )
    }

    syncValue() {
        if ( this.verifyValue(this.element.value) ) {
            this.valuesHistory.push({ previousValue: this.previousValue, value: this.value, optionId: this.optionId })

            this.previousValue = this.value
            this.value = String(this.element.value)
            this.optionId = Number( $(this.element).find('option:selected').attr('data-id') )
        } else {
            this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue ?? this.defaultValue ?? (this.allowedValues !== undefined ? this.allowedValues[0] : '') ?? ''
            // TODO: change selected option in optionId
        }
    }

    verifyValue(value) {
        if (value === undefined)
            return false

        if (this.allowedValues !== undefined)
            if (!this.allowedValues.includes(value))
                return false

        this.valueVerifyConditions.forEach(condition => {
            if ( condition(value) )
                return false
        })

        return true
    }
}