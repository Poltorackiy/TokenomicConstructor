class zbCryptoConstructor {
    constructor(params) {
        // this.dataBlocksForm = new zbccDataBlocksForm({ elementSelector: params.dataBlocksFormSelector })
        // this.preConditionForm = new zbccPreConditionForm({ elementSelector: params.preConditionFormSelector })
        // this.buildedSchemeForm = new zbccBuildedSchemeForm({ elementSelector: params.buildedSchemeFormSelector })
    }

    addForm(name, form) {
        this[name] = form
    }
}



class zbccDataBlocksForm extends htmlElement {
    constructor(params) {
        super(params)

        this.dataBlocks = {}
    }

    addDataBlocks(params) {
        let keys = ok(params)

        keys.forEach(dbName => {
            this.dataBlocks[dbName] = params[dbName]
        })
    }

    getValues() {
        let values = {}

        ok(this.dataBlocks).forEach(name => {
            values[name] = this.dataBlocks[name].getValues()
        })

        return values
    }
}



class zbccPreConditionForm extends htmlElement {
    constructor(params) {
        super(params)

        this.inputs = {}
        this.actionBtns = {}
        this.actionBtnsListeners = {}
    }

    addActionBtn(name, selector, callback) {
        this.actionBtns[name] = selector

        if (callback !== undefined)
            this.addActionBtnsListener(name, callback)
    }

    addActionBtnsListener(actionBtnName, callback) {
        if (this.actionBtnsListeners[actionBtnName] === undefined)
            this.actionBtnsListeners[actionBtnName] = []
        this.actionBtnsListeners[actionBtnName].push(callback)
    }
}



class zbccBuildedSchemeForm extends htmlElement {
    constructor(params) {
        super(params)

        this.charts = undefined

        // Chart.register(ChartDataLabels)
    }

    buildCharts(charts, carousel) {
        this.clearCharts()

        this.charts = []

        let chartId = 0

        if (carousel) {
            $('.form-block[data-id="builded-scheme"] div[data-id="charts"]').append(
                '<section class="slider-wrapper"><button type="button" class="slide-arrow" id="slide-arrow-prev">&#8249;</button><button type="button" class="slide-arrow" id="slide-arrow-next">  &#8250;</button><ul class="slides-container" id="slides-container"></ul>'
            )

            const slidesContainer = document.getElementById("slides-container");
            const slide = document.querySelector(".slide");
            const prevButton = document.getElementById("slide-arrow-prev");
            const nextButton = document.getElementById("slide-arrow-next");

            nextButton.addEventListener("click", () => {
            // $('body').on("click", '#slide-arrow-next', () => {
                const slideWidth = document.querySelector(".slide").clientWidth;
                slidesContainer.scrollLeft += slideWidth;
            });

            prevButton.addEventListener("click", () => {
            // $('body').on("click", '#slide-arrow-prev', () => {
                const slideWidth = document.querySelector(".slide").clientWidth;
                slidesContainer.scrollLeft -= slideWidth;
            });
        }

        charts.forEach(chart => {
            $('.form-block[data-id="builded-scheme"] div[data-id="charts"]' + (carousel ? ' section.slider-wrapper ul' : '')).append(
                // (chartId % 2 === 0 && chartId !== 0 && false ? '<br>' : '') +
                (carousel ? '<li class="slide">' : '') +
                '<div class="chart-' + chart.type + '"><canvas data-chartid="' + chartId + '"></canvas></div>' +
                (carousel ? '</li>' : '') +
                ''
            )

            chart = new Chart(
                $('.form-block[data-id="builded-scheme"] div[data-id="charts"] canvas[data-chartid="' + chartId + '"]'),
                chart
            )

            chartId++
        })
    }

    clearCharts() {
        if (this.charts !== undefined) {
            let numOfCharts = this.charts.length

            this.charts.forEach(chart => {
                chart.destoy()
            })

            delete this.charts

            $('.form-block[data-id="builded-scheme"] div[data-id="charts"]').empty()
            // for(let i = 0; i < numOfCharts; i++)
        }
    }
}