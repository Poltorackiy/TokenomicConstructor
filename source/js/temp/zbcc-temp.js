class zbccForm {
    constructor(params) {
        this.element = params.element
        this.listeners = {}

        this.dataBlocks = {}

        this.htmlTemplates = params.htmlTemplates

        this.declareDataBlocks()
    }



    declareDataBlocks() {
        this.dataBlocks['initialData'] = {
            inputs: {
                totalTokensAmount: new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #total-tokens-amount')[0] }),
                initialTokenPrice: new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #initial-token-price')[0] }),
                exchangeType: new SelectInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #exchange-type')[0], allowedValues: ['decentralized', 'centralized'] }),
                tradingFunction: new SelectInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #trading-function')[0], allowedValues: ['increasing', 'decreasing', 'volatility'] }),
                duration: new NumberInput({ element: $('#zbcc > #data-blocks .data-block#initial-data #duration')[0] })
            }
        }

        this.dataBlocks['investmentRounds'] = {
            optionsForSelectInputs: {},
            tables: {
                rounds: new NumerableTable({
                    element: $('#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table')[0],
                    numerableInput: new NumberInput({ min: 1, element: $('#zbcc > #data-blocks .data-block#investment-rounds #rounds-number')[0] }),

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trInvestmentRound,
                        trSelector: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr[id]',
                        inputsSelectors: {
                            roundTitle: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr#{tr-id} #round-title',
                            fiat: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr#{tr-id} #fiat',
                            tokenPrice: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr#{tr-id} #token-price',
                            tokensAmount: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr#{tr-id} #tokens-amount',
                            investorShare: '#zbcc > #data-blocks .data-block#investment-rounds .inputs-table.numerable#rounds table tr#{tr-id} #investor-share',
                        },
                        inputsTypes: {
                            roundTitle: 'text',
                            fiat: 'number',
                            tokenPrice: 'number',
                            tokensAmount: 'number',
                            investorShare: 'number',
                        },
                        unicInputs: [
                            'roundTitle'
                        ],
                    }
                })
            }
        }

        this.dataBlocks['agents'] = {
            tables: {
                agents: new NumerableTable({
                    element: $('#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table')[0],

                    numerableInput: new NumberInput({ min: 1, element: $('#zbcc > #data-blocks .data-block#agents #agents-number')[0] }),

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trAgent,
                        trSelector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id]',
                        inputsSelectors: {
                            agentName: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr#{tr-id} #agent-name',
                            agenShare: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr#{tr-id} #agent-share',
                            tokensAmount: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr#{tr-id} #tokens-amount',
                        },
                        inputsTypes: {
                            agentName: 'text',
                            agenShare: 'number',
                            tokensAmount: 'number',
                        },
                        unicInputs: [
                            'agentName'
                        ],
                        linksToDependableSelects: {
                            agentName: {
                                inputId: 'agent-name',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                optionSelector: 'option[value="{value}"][id="{id}"]',
                                selects: [
                                    '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr[id] #agent-name',
                                    '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr[id] #agent-name',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr[id] #agent-name',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr[id] #agent-name',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable[id] table tr[id] #agent-name',
                                ]
                            }
                        }
                    }
                })
            }
        }

        this.dataBlocks['pools'] = {
            tables: {
                poolTypes: new CalcableTable({
                    element: $('#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table')[0],

                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trPoolType,
                        trSelector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table tr[id]',
                        inputsSelectors: {
                            poolNumber: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table tr#{tr-id} #pool-number',
                            poolType: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table tr#{tr-id} #pool-type',
                        },
                        inputsTypes: {
                            poolNumber: 'number',
                            poolType: 'text',
                        },
                        unicInputs: [
                            'poolType',
                        ],
                        linksToDependableSelects: {
                            poolType: {
                                inputId: 'pool-type',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                optionSelector: 'option[value="{value}"][id="{id}"]',
                                selects: [
                                    '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id] #pool-type',
                                    '#zbcc > #data-blocks .data-block#token-circulation .inputs-table.unhiddable.calcable#actions table tr[id] #currency-type',
                                ]
                            },
                        }
                    }
                }),
                pools: new CalcableTable({
                    element: $('#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table')[0],

                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trPool,
                        trSelector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id]',
                        inputsSelectors: {
                            poolTitle: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr#{tr-id} #pool-title',
                            poolType: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr#{tr-id} #pool-type',
                            poolShare: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr#{tr-id} #pool-share',
                            amount: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr#{tr-id} #amount',
                        },
                        inputsTypes: {
                            poolTitle: 'text',
                            poolType: 'select',
                            poolShare: 'text',
                            amount: 'text',
                        },
                        unicInputs: [
                            'poolTitle',
                        ],
                        linksToOptions: {
                            poolTypes: {
                                mask: '{pool-types-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table tr[id] #pool-type'
                            }
                        },
                        linksToDependableSelects: {
                            poolTitle: {
                                inputId: 'pool-title',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                optionSelector: 'option[value="{value}"][id="{id}"]',
                                selects: [
                                    '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr[id] #pool-title',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr[id] #pool-for-rewards',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr[id] #pool-for-rewards',
                                    '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable[id] table tr[id] #pool-for-rewards',
                                    '#zbcc-precond-popup .data-block#precond-popup .inputs #pool-threshold select#pool-threshold-easier-pool',
                                    '#zbcc-precond-popup .data-block#precond-popup .inputs #pool-threshold select#pool-threshold-harder-pool',
                                ]
                            }
                        }
                    }
                })
            }
        },

        this.dataBlocks['vestingAndUnlocking'] = new UnhiddableTables({
            cssClass: 'unhidden',

            unhidders: {
                vesting: $('#zbcc > #data-blocks .data-block#vesting-and-unlocking button.unhidder#show-vesting')[0],
                unlocking: $('#zbcc > #data-blocks .data-block#vesting-and-unlocking button.unhidder#show-unlocking')[0],
            },
            tables: {
                vesting: new CalcableTable({
                    element: $('#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table')[0],

                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trVesting,
                        trSelector: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr[id]',
                        inputsSelectors: {
                            agentName: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr#{tr-id} #agent-name',
                            poolTitle: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr#{tr-id} #pool-title',
                            startVesting: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr#{tr-id} #start-vesting',
                            endVesting: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr#{tr-id} #end-vesting',
                            vestingCoefficient: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#vesting table tr#{tr-id} #vesting-coefficient',
                        },
                        inputsTypes: {
                            agentName: 'text',
                            poolTitle: 'select',
                            startVesting: 'text',
                            endVesting: 'text',
                            vestingCoefficient: 'text',
                        },
                        linksToOptions: {
                            agentName: {
                                mask: '{agent-names-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id] #agent-name'
                            },
                            poolTitle: {
                                mask: '{pool-title-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id] #pool-title'
                            }
                        }
                    }
                }),
                unlocking: new CalcableTable({
                    element: $('#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table')[0],
                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trUnlocking,
                        trSelector: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr[id]',
                        inputsSelectors: {
                            agentName: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr#{tr-id} #agent-name',
                            startUnlocking: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr#{tr-id} #start-unlocking',
                            endUnlocking: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr#{tr-id} #end-unlocking',
                            initialUnlocking: '#zbcc > #data-blocks .data-block#vesting-and-unlocking .inputs-table.unhiddable.calcable#unlocking table tr#{tr-id} #initial-unlocking',
                        },
                        inputsTypes: {
                            agentName: 'text',
                            startUnlocking: 'text',
                            endUnlocking: 'text',
                            initialUnlocking: 'text',
                        },
                        linksToOptions: {
                            agentName: {
                                mask: '{agent-names-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id] #agent-name'
                            }
                        }
                    }
                })
            }
        })

        this.dataBlocks['projectServices'] = {
            stakingAndFarming: new UnhiddableTables({
                cssClass: 'unhidden',
                choosableCalcableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable',
                choosableCalcableTablesCssClass: 'choosen',
                unhidders: {
                    staking: $('#zbcc > #data-blocks .data-block#project-services button.unhidder#show-staking')[0],
                    farming: $('#zbcc > #data-blocks .data-block#project-services button.unhidder#show-farming')[0],
                },

                curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                curveableTablesCssClass: 'curved',
                tables: {
                    staking: new CalcableTable({

                        cssClass: 'unhidden',

                        showItAgain: 'button#show-service',

                        element: $('#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table')[0],

                        calcAppendBtnSelector: 'button.calc#append-row',
                        calcRemoveBtnSelector: 'button.calc#remove-row',

                        curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                        curveableTablesCssClass: 'curved',

                        removeClasses: ['choosen', 'unhidden', 'curved'],
                        addCurvesBtnSelector: 'button#add-curves',

                        row: {
                            numberOfInitial: 1,
                            numberOfMin: 1,
                            htmlTemplate: this.htmlTemplates.trStaking,
                            trSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr[id]',
                            inputsSelectors: {
                                number: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #number',
                                agentName: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #agent-name',
                                agentShare: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #agent-share',
                                unstakingFactor: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #unstaking-factor',
                                rewardCoefficient: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #reward-coefficient',
                                poolForRewards: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#staking table tr#{tr-id} #pool-for-rewards',
                            },
                            inputsTypes: {
                                number: 'number',
                                agentName: 'select',
                                agentShare: 'text',
                                unstakingFactor: 'text',
                                rewardCoefficient: 'text',
                                poolForRewards: 'select',
                            },
                            linksToOptions: {
                                agentName: {
                                    mask: '{agent-names-options}',
                                    optionHtmlTemplate: this.htmlTemplates.selectOption,
                                    selector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id] #agent-name'
                                },
                                poolTitle: {
                                    mask: '{pool-title-options}',
                                    optionHtmlTemplate: this.htmlTemplates.selectOption,
                                    selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id] #pool-title'
                                }
                            }
                        }
                    }),
                    farming: new CalcableTable({
                        element: $('#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table')[0],

                        showItAgain: 'button#show-service',

                        calcAppendBtnSelector: 'button.calc#append-row',
                        calcRemoveBtnSelector: 'button.calc#remove-row',

                        curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                        curveableTablesCssClass: 'curved',

                        removeClasses: ['choosen', 'unhidden', 'curved'],
                        addCurvesBtnSelector: 'button#add-curves',

                        row: {
                            numberOfInitial: 1,
                            numberOfMin: 1,
                            htmlTemplate: this.htmlTemplates.trFarming,
                            trSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr[id]',
                            inputsSelectors: {
                                number: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #number',
                                agentName: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #agent-name',
                                agentShare: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #agent-share',
                                unstakingFactor: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #unstaking-factor',
                                rewardCoefficient: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #reward-coefficient',
                                poolForRewards: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#farming table tr#{tr-id} #pool-for-rewards',
                            },
                            inputsTypes: {
                                number: 'number',
                                agentName: 'select',
                                agentShare: 'text',
                                unstakingFactor: 'text',
                                rewardCoefficient: 'text',
                                poolForRewards: 'select',
                            },
                            linksToOptions: {
                                agentName: {
                                    mask: '{agent-names-options}',
                                    optionHtmlTemplate: this.htmlTemplates.selectOption,
                                    selector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id] #agent-name'
                                },
                                poolTitle: {
                                    mask: '{pool-title-options}',
                                    optionHtmlTemplate: this.htmlTemplates.selectOption,
                                    selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id] #pool-title'
                                }
                            }
                        }
                    })
                }
            }),
            services: new ChoosableCalcableTables({
                // cssClass: 'choosable',
                cssClass: 'choosen',
                unhiddableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable',
                unhiddableTablesCssClass: 'unhidden',
                curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                curveableTablesCssClass: 'curved',

                unhidders: {
                    staking: $('#zbcc > #data-blocks .data-block#project-services button.unhidder#show-staking')[0],
                    farming: $('#zbcc > #data-blocks .data-block#project-services button.unhidder#show-farming')[0],
                },
                controls: {
                    serviceNameInput: '#zbcc > #data-blocks .data-block#project-services .extra-inputs #service-name',
                    serviceNamesList: '#zbcc > #data-blocks .data-block#project-services .extra-inputs #service-names',
                    addServiceBtn: '#zbcc > #data-blocks .data-block#project-services .extra-inputs #add-service',
                    serviceNameOptionSelector: 'option[id="{id}"]',
                    serviceNameOptionTemplate: this.htmlTemplates.serviceNameOption,
                    serviceNameInputPlaceholder: 'enter Service name'
                },
                presetTable: {
                    showItAgain: 'button#show-service',

                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    tableParentElement: '#zbcc > #data-blocks .data-block#project-services .base-inputs',
                    tableBlockSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id}',
                    tableSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table',
                    htmlTableTemplate: this.htmlTemplates.serviceTableTemplate,

                    curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                    curveableTablesCssClass: 'curved',
                    removeClasses: ['choosen', 'unhidden', 'curved'],
                    addCurvesBtnSelector: 'button#add-curves',

                    header: {
                        titleElement: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} header h3.table-title',
                        curvesTitleElement: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} header h3.table-title',
                        titlePreset: '{service-name}',
                        description: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} header div.table-description',
                    },

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        tableId: '',
                        htmlTemplate: this.htmlTemplates.trService,
                        trSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr[id]',
                        inputsSelectors: {
                            number: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #number',
                            agentName: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #agent-name',
                            agentShare: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #agent-share',
                            unstakingFactor: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #unstaking-factor',
                            rewardCoefficient: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #reward-coefficient',
                            poolForRewards: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id} table tr#{tr-id} #pool-for-rewards',
                        },
                        inputsTypes: {
                            number: 'number',
                            agentName: 'select',
                            agentShare: 'text',
                            unstakingFactor: 'text',
                            rewardCoefficient: 'text',
                            poolForRewards: 'select',
                        },
                        linksToOptions: {
                            agentName: {
                                mask: '{agent-names-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#agents .inputs-table.numerable#agents table tr[id] #agent-name'
                            },
                            poolTitle: {
                                mask: '{pool-title-options}',
                                optionHtmlTemplate: this.htmlTemplates.selectOption,
                                selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pools table tr[id] #pool-title'
                            }
                        }
                    }
                }
            }),
            curves: new CurvesTables({
                // cssClass: 'choosable',
                cssClass: 'curved',

                showItAgain: 'button#show-service',
                anotherServiceNameSelector: '#zbcc > #data-blocks .data-block#project-services .extra-inputs #service-name',
                btnTablesSelector: '#zbcc > #data-blocks .data-block#project-services',
                curveableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable',
                curveableTablesCssClass: 'curved',
                unhiddableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable',
                unhiddableTablesCssClass: 'unhidden',
                choosableTablesSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable',
                choosableTablesCssClass: 'choosen',
                removeClasses: ['choosen', 'unhidden', 'curved'],
                addCurvesBtnSelector: 'button#add-curves',
                saSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.unhiddable.calcable#{table-id}',
                sbSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.choosable.calcable#{table-id}',

                presetTable: {
                    showItAgain: 'button#show-service',

                    calcAppendBtnSelector: 'button.calc#append-row',
                    calcRemoveBtnSelector: 'button.calc#remove-row',

                    tableParentElement: '#zbcc > #data-blocks .data-block#project-services .base-inputs',
                    tableBlockSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id}',
                    tableSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table',
                    htmlTableTemplate: this.htmlTemplates.curvesTablesTemplate,

                    header: {
                        titleElement: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} header h3.table-title',
                        titlePreset: '"{service-name}" Income',
                        description: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} header div.table-description',
                    },

                    row: {
                        numberOfInitial: 1,
                        numberOfMin: 1,
                        htmlTemplate: this.htmlTemplates.trCurve,
                        trSelector: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr[id]',
                        tableId: '',
                        inputsSelectors: {
                            curveNumber: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #curve-number',
                            salesStart: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #sales-start',
                            salesEnd: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #sales-end',
                            salesMin: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #sales-min',
                            salesMax: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #sales-max',
                            chooseAlgorithm: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #choose-algorithm',
                            angularCoefficient: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #angular-coefficient',
                            risingsCoefficient: '#zbcc > #data-blocks .data-block#project-services .inputs-table.curveable.calcable#{table-id} table tr#{tr-id} #risings-coefficient',
                        },
                        inputsTypes: {
                            curveNumber: 'number',
                            salesStart: 'number',
                            salesEnd: 'number',
                            salesMin: 'number',
                            salesMax: 'number',
                            chooseAlgorithm: 'select',
                            angularCoefficient: 'number',
                            risingsCoefficient: 'number',
                        },
                    }
                }
            })
        }

        this.dataBlocks['tokenCirculation'] = {
            actions: new UnhiddableTables({
                cssClass: 'unhidden',
                unhidders: {
                    actions: $('#zbcc > #data-blocks .data-block#token-circulation button.unhidder#show-actions')[0],
                },
                tables: {
                    actions: new CalcableTable({
                        element: $('#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table')[0],

                        calcAppendBtnSelector: 'button.calc#append-row',
                        calcRemoveBtnSelector: 'button.calc#remove-row',

                        row: {
                            numberOfInitial: 1,
                            numberOfMin: 1,
                            htmlTemplate: this.htmlTemplates.trAction,
                            trSelector: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr[id]',
                            inputsSelectors: {
                                actionNumber: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #action-number',
                                source: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #source',
                                currencyType: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #currency-type',
                                valuePercents: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #value-percents',
                                destionation: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #destination',
                                preCondition: '#zbcc > #data-blocks .data-block#token-circulation .inputs-table#actions table tr#{tr-id} #pre-condition',
                            },
                            inputsTypes: {
                                actionNumber: 'text',
                                source: 'text',
                                currencyType: 'select',
                                valuePercents: 'text',
                                destionation: 'text',
                                preCondition: 'text',
                            },
                            unicInputs: [
                                'actionNumber'
                            ],
                            linksToOptions: {
                                poolTypes: {
                                    mask: '{pool-types-options}',
                                    optionHtmlTemplate: this.htmlTemplates.selectOption,
                                    selector: '#zbcc > #data-blocks .data-block#pools .inputs-table.calcable#pool-types table tr[id] #pool-type'
                                }
                            },
                        }
                    })
                }
            })
        }
    }
}