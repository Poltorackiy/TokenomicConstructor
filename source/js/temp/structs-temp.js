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

        this.value = undefined
        this.previousValue = undefined
        this.defaultValue = undefined
        // this.value = this.dataType(this.element.value)
        // this.previousValue = undefined
        // this.defaultValue = this.value

        this.valuesHistory = []
        this.verifyConditions = []

        this.addEventListener('change', e => {
            this.syncValue()
        })
    }

    initParams(params) {
        this.type = params.type
        this.dataType = params.dataType
    }

    syncValue() {
        if ( this.verifyValue(this.element.value) ) {
            if (this.value !== undefined)
                this.valuesHistory.push({ previousValue: this.previousValue, value: this.value })

            this.previousValue = this.value !== undefined ? this.dataType(this.value) : undefined
            this.value = this.dataType(this.element.value)
        } else {
            this.element.value = this.previousValue ?? this.valuesHistory[this.valuesHistory.length - 1].previousValue
        }
    }

    verifyValue(value) {
        return typeof value === typeof this.dataType() || (this.dataType === Number && this.dataType(value) === typeof Number())
    }

    addVerifyUnCondition(uncondition) {
        this.verifyConditions.push(uncondition)
    }
}



class TextInput extends htmlInput {
    constructor(params) {
        super(Object.assign({ type: 'text', dataType: String }, params))
    }
}



class NumberInput extends htmlInput {
    constructor(params) {
        super(Object.assign({ type: 'number', dataType: Number }, params))

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
        if (typeof Number(value) !== typeof this.dataType(value))
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
}



class SelectInput extends htmlInput {
    constructor(params) {
        super(Object.assign({ type: 'select', dataType: String }, params))
    }
}







 // totalTokensAmount: new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #total-tokens-amount')[0] }),
                    // initialTokenPrice: new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #initial-token-price')[0] }),
                    // exchangeType:      new SelectInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #exchange-type')[0], allowedValues: ['decentralized', 'centralized'] }),
                    // tradingFunction:   new SelectInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #trading-function')[0], allowedValues: ['increasing', 'decreasing', 'volatility'] }),
                    // duration:          new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #duration')[0] })
                }