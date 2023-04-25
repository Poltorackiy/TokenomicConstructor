const inlineForm = new zbccInlineForm({
    elementSelector: '.form-block[data-id="data-blocks"]',
    htmlTemplates: htmlTemplates,
    dataBlocks: new zbccDataBlocks({
        initialData: new zbccDataBlock_InitialData({
            inputsSelectors: {
                totalTokensAmount: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="initial-data"] [data-id="total-tokens-amount"]',
                initialTokenPrice: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="initial-data"] [data-id="initial-token-price"]',
                exchangeType: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="initial-data"] [data-id="exchange-type"]',
                tradingFunction: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="initial-data"] [data-id="trading-function"]',
                duration: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="initial-data"] [data-id="duration"]',
            },
            inputsParams: {
                totalTokensAmount: {
                    type: 'number',
                    dataType: 'integer',
                },
                initialTokenPrice: {
                    type: 'number',
                    dataType: 'float',
                },
                exchangeType: {
                    type: 'select',
                    allowedValues: ['decentralized', 'centralized']
                },
                tradingFunction: {
                    type: 'select',
                    allowedValues: ['increasing', 'decreasing', 'volatility']
                },
                duration: {
                    type: 'number',
                    dataType: 'integer',
                },
            }
        }),

        investmentRounds: new zbccDataBlock_InvestmentRounds({
            table: new NumerableTable({
                elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table',
                controls: {
                    numerableInputSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] [data-id="rounds-number"]',
                },
                rowPreset: {
                    numOnInit: 1,
                    numOfMin: 1,
                    htmlTemplate: htmlTemplates.trInvestmentRound,
                    trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id]',
                    inputsSelectors: {
                        roundTitle: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id="{tr-id}"] [data-id="round-title"]',
                        fiat: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id="{tr-id}"] [data-id="fiat"]',
                        tokenPrice: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id="{tr-id}"] [data-id="token-price"]',
                        tokensAmount: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id="{tr-id}"] [data-id="tokens-amount"]',
                        investorShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="investment-rounds"] .inputs-table.numerable[data-id="rounds"] table tr[data-id="{tr-id}"] [data-id="investor-share"]',
                    },
                    inputsParams: {
                        roundTitle: {
                            type: 'text',
                        },
                        fiat: {
                            type: 'number',
                            dataType: 'float',
                        },
                        tokenPrice: {
                            type: 'number',
                            dataType: 'float',
                        },
                        tokensAmount: {
                            type: 'number',
                            dataType: 'float',
                        },
                        investorShare: {
                            type: 'number',
                            dataType: 'float',
                        },
                    },
                }
            })
        }),

        agents: new zbccDataBlock_Agents({
            table: new NumerableTable({
                elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table',
                controls: {
                    numerableInputSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] [data-id="agents-number',
                },
                rowPreset: {
                    numOnInit: 1,
                    numOfMin: 1,
                    htmlTemplate: htmlTemplates.trAgent,
                    trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id]',
                    inputsSelectors: {
                        agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                        agenShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id="{tr-id}"] [data-id="agent-share"]',
                        tokensAmount: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id="{tr-id}"] [data-id="tokens-amount"]',
                    },
                    inputsParams: {
                        agentName: {
                            type: 'text',
                        },
                        agenShare: {
                            type: 'number',
                            dataType: 'float'
                        },
                        tokensAmount: {
                            type: 'number',
                            dataType: 'float'
                        },
                    },
                    linksToDependableSelects: {
                        agentName: {
                            inputId: 'agent-name',
                            optionHtmlTemplate: htmlTemplates.selectOption,
                            optionSelector: 'option[value="{value}"][data-id="{id}"]',
                            selects: [
                                '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id] [data-id="agent-name"]',
                                '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id] [data-id="agent-name"]',
                                '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id] [data-id="agent-name"]',
                                '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id] [data-id="agent-name"]',
                                '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id] table tr[data-id] [data-id="agent-name"]',
                            ]
                        }
                    }
                }
            })
        }),

        pools: new zbccDataBlock_Pools({
            tables: {
                poolTypes: new CalcableTable({
                    elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table',

                    controls: {
                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',
                    },

                    rowPreset: {
                        numOnInit: 1,
                        numOfMin: 1,
                        htmlTemplate: htmlTemplates.trPoolType,
                        trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table tr[data-id]',
                        inputsSelectors: {
                            poolNumber: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table tr[data-id="{tr-id}"] [data-id="pool-number"]',
                            poolType: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table tr[data-id="{tr-id}"] [data-id="pool-type"]',
                        },
                        inputsParams: {
                            poolNumber: {
                                type: 'number',
                                dataType: 'integer'
                            },
                            poolType: {
                                type: 'text'
                            },
                        },
                        linksToDependableSelects: {
                            poolType: {
                                inputId: 'pool-type',
                                optionHtmlTemplate: htmlTemplates.selectOption,
                                optionSelector: 'option[value="{value}"][data-id="{id}"]',
                                selects: [
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id] [data-id="pool-type"]',
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table.calcable.unhideable[data-id="actions"] table tr[data-id] [data-id="currency-type"]',
                                ]
                            },
                        }
                    }
                }),
                pools: new CalcableTable({
                    elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table',

                    controls: {
                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',
                    },

                    rowPreset: {
                        numOnInit: 1,
                        numOfMin: 1,
                        htmlTemplate: htmlTemplates.trPool,
                        trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id]',
                        inputsSelectors: {
                            poolTitle: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id="{tr-id}"] [data-id="pool-title"]',
                            poolType: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id="{tr-id}"] [data-id="pool-type"]',
                            poolShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id="{tr-id}"] [data-id="pool-share"]',
                            amount: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id="{tr-id}"] [data-id="amount"]',
                        },
                        inputsParams: {
                            poolTitle: {
                                type: 'text',
                            },
                            poolType: {
                                type: 'select',
                            },
                            poolShare: {
                                type: 'text',
                            },
                            amount: {
                                type: 'text',
                            },
                        },
                        linksToOptions: {
                            poolTypes: {
                                selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table tr[data-id] [data-id="pool-type"]',
                                optionHtmlTemplate: htmlTemplates.selectOption,
                                mask: '{pool-type-options}',
                            }
                        },
                        linksToDependableSelects: {
                            poolTitle: {
                                inputId: 'pool-title',
                                optionHtmlTemplate: htmlTemplates.selectOption,
                                optionSelector: 'option[value="{value}"][data-id="{id}"]',
                                selects: [
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id] [data-id="pool-title"]',
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id] [data-id="pool-for-rewards"]',
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id] [data-id="pool-for-rewards"]',
                                    '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id] table tr[data-id] [data-id="pool-for-rewards"]',
                                    // '#zbcc-precond-popup .data-block#precond-popup .inputs [data-id="pool-threshold select#pool-threshold-easier-pool"]',
                                    // '#zbcc-precond-popup .data-block#precond-popup .inputs [data-id="pool-threshold select#pool-threshold-harder-pool"]',
                                ]
                            }
                        }
                    }
                })
            }
        }),

        vestingAndUnlocking: new zbccDataBlock_VestingAndUnlocking({
            tablesSystem: new UnhideableTables({
                cssClass: 'unhidden',

                unhiders: {
                    vesting: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] button.unhider[data-unhideableId="vesting"]',
                    unlocking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] button.unhider[data-unhideableId="unlocking"]',
                },

                tables: {
                    vesting: new CalcableTable({
                        elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table',

                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                        rowPreset: {
                            numOnInit: 1,
                            numOfMin: 1,
                            htmlTemplate: htmlTemplates.trVesting,
                            trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id]',
                            inputsSelectors: {
                                agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                                poolTitle: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id="{tr-id}"] [data-id="pool-title"]',
                                startVesting: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id="{tr-id}"] [data-id="start-vesting"]',
                                endVesting: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id="{tr-id}"] [data-id="end-vesting"]',
                                vestingCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="vesting"] table tr[data-id="{tr-id}"] [data-id="vesting-coefficient"]',
                            },
                            inputsParams: {
                                agentName: {
                                    type: 'text'
                                },
                                poolTitle: {
                                    type: 'select'
                                },
                                startVesting: {
                                    type: 'text'
                                },
                                endVesting: {
                                    type: 'text'
                                },
                                vestingCoefficient: {
                                    type: 'text'
                                },
                            },
                            linksToOptions: {
                                agentName: {
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id] [data-id="agent-name"]',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    mask: '{agent-name-options}',
                                },
                                poolTitle: {
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id] [data-id="pool-title"]',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    mask: '{pool-title-options}',
                                }
                            }
                        }
                    }),
                    unlocking: new CalcableTable({
                        elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table',
                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                        rowPreset: {
                            numOnInit: 1,
                            numOfMin: 1,
                            htmlTemplate: htmlTemplates.trUnlocking,
                            trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id]',
                            inputsSelectors: {
                                agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                                startUnlocking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id="{tr-id}"] [data-id="start-unlocking"]',
                                endUnlocking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id="{tr-id}"] [data-id="end-unlocking"]',
                                initialUnlocking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="vesting-and-unlocking"] .inputs-table.calcable.unhideable[data-id="unlocking"] table tr[data-id="{tr-id}"] [data-id="initial-unlocking"]',
                            },
                            inputsParams: {
                                agentName: {
                                    type: 'text',
                                },
                                startUnlocking: {
                                    type: 'text',
                                },
                                endUnlocking: {
                                    type: 'text',
                                },
                                initialUnlocking: {
                                    type: 'text',
                                },
                            },
                            linksToOptions: {
                                agentName: {
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id] [data-id="agent-name"]',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    mask: '{agent-name-options}',
                                }
                            }
                        }
                    })
                }
            })
        }),

        projectServices: new zbccDataBlock_ProjectServices({
            tablesSystem: {
                stakingAndFarming: new UnhideableTables({
                    cssClass: 'unhidden',
                    choosableCalcableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable',
                    choosableCalcableTablesCssClass: 'choosen',
                    unhiders: {
                        staking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] button.unhider[data-unhideableId="staking"]',
                        farming: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] button.unhider[data-unhideableId="farming"]',
                    },

                    curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                    curveableTablesCssClass: 'curved',
                    tables: {
                        staking: new CalcableTable({
                            cssClass: 'unhidden',
                            showItAgain: 'button#show-service',

                            elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table',

                            calcAddBtnSelector: 'button.calc[data-action="add"]',
                            calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                            curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                            curveableTablesCssClass: 'curved',

                            removeClasses: ['choosen', 'unhidden', 'curved'],
                            addCurvesBtnSelector: 'button#add-curves',

                            rowPreset: {
                                numOnInit: 1,
                                numOfMin: 1,
                                htmlTemplate: htmlTemplates.trService,
                                trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id]',
                                inputsSelectors: {
                                    number: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="number"]',
                                    agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                                    agentShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="agent-share"]',
                                    unstakingFactor: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="unstaking-factor"]',
                                    rewardCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="reward-coefficient"]',
                                    poolForRewards: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="staking"] table tr[data-id="{tr-id}"] [data-id="pool-for-rewards"]',
                                },
                                inputsParams: {
                                    number: {
                                        type: 'number',
                                        dataType: 'integer'
                                    },
                                    agentName: {
                                        type: 'select'
                                    },
                                    agentShare: {
                                        type: 'text'
                                    },
                                    unstakingFactor: {
                                        type: 'text'
                                    },
                                    rewardCoefficient: {
                                        type: 'text'
                                    },
                                    poolForRewards: {
                                        type: 'select'
                                    },
                                },
                                linksToOptions: {
                                    agentName: {
                                        selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id] [data-id="agent-name"]',
                                        optionHtmlTemplate: htmlTemplates.selectOption,
                                        mask: '{agent-name-options}',
                                    },
                                    poolTitle: {
                                        selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id] [data-id="pool-title"]',
                                        optionHtmlTemplate: htmlTemplates.selectOption,
                                        mask: '{pool-title-options}',
                                    }
                                }
                            }
                        }),
                        farming: new CalcableTable({
                            elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table',

                            showItAgain: 'button#show-service',

                            calcAddBtnSelector: 'button.calc[data-action="add"]',
                            calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                            curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                            curveableTablesCssClass: 'curved',

                            removeClasses: ['choosen', 'unhidden', 'curved'],
                            addCurvesBtnSelector: 'button#add-curves',

                            rowPreset: {
                                numOnInit: 1,
                                numOfMin: 1,
                                htmlTemplate: htmlTemplates.trService,
                                trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id]',
                                inputsSelectors: {
                                    number: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="number"]',
                                    agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                                    agentShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="agent-share"]',
                                    unstakingFactor: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="unstaking-factor"]',
                                    rewardCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="reward-coefficient"]',
                                    poolForRewards: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="farming"] table tr[data-id="{tr-id}"] [data-id="pool-for-rewards"]',
                                },
                                inputsParams: {
                                    number: {
                                        type: 'number',
                                        dataType: 'integer'
                                    },
                                    agentName: {
                                        type: 'select'
                                    },
                                    agentShare: {
                                        type: 'text'
                                    },
                                    unstakingFactor: {
                                        type: 'text'
                                    },
                                    rewardCoefficient: {
                                        type: 'text'
                                    },
                                    poolForRewards: {
                                        type: 'select'
                                    },
                                },
                                linksToOptions: {
                                    agentName: {
                                        selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id] [data-id="agent-name"]',
                                        optionHtmlTemplate: htmlTemplates.selectOption,
                                        mask: '{agent-name-options}',
                                    },
                                    poolTitle: {
                                        selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id] [data-id="pool-title"]',
                                        optionHtmlTemplate: htmlTemplates.selectOption,
                                        mask: '{pool-title-options}',
                                    }
                                }
                            }
                        })
                    }
                }),
                services: new ChoosableTables({
                    // cssClass: 'choosable',
                    cssClass: 'choosen',
                    unhideableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.unhideable',
                    unhideableTablesCssClass: 'unhidden',
                    curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                    curveableTablesCssClass: 'curved',

                    unhiders: {
                        staking: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] button.unhider#show-staking',
                        farming: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] button.unhider#show-farming',
                    },
                    controls: {
                        serviceNameInput: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .extra-inputs #service-name',
                        serviceNamesList: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .extra-inputs #service-names',
                        addServiceBtn: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .extra-inputs #add-service',
                        serviceNameOptionSelector: 'option[id="{id}"]',
                        serviceNameOptionTemplate: htmlTemplates.serviceNameOption,
                        serviceNameInputPlaceholder: 'enter Service name'
                    },
                    presetTable: {
                        showItAgain: 'button#show-service',

                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                        tableParentElement: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .base-inputs',
                        tableBlockSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"]',
                        tableSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table',
                        htmlTableTemplate: htmlTemplates.serviceTableTemplate,

                        curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                        curveableTablesCssClass: 'curved',
                        removeClasses: ['choosen', 'unhidden', 'curved'],
                        addCurvesBtnSelector: 'button#add-curves',

                        header: {
                            titleElement: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] header h3.table-title',
                            curvesTitleElement: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] header h3.table-title',
                            titlePreset: '{service-name}',
                            description: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] header div.table-description',
                        },

                        rowPreset: {
                            numOnInit: 1,
                            numOfMin: 1,
                            tableId: '',
                            htmlTemplate: htmlTemplates.trService,
                            trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id]',
                            inputsSelectors: {
                                number: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="number"]',
                                agentName: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="agent-name"]',
                                agentShare: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="agent-share"]',
                                unstakingFactor: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="unstaking-factor"]',
                                rewardCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="reward-coefficient"]',
                                poolForRewards: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="pool-for-rewards"]',
                            },
                            inputsParams: {
                                number: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                agentName: {
                                    type: 'select'
                                },
                                agentShare: {
                                    type: 'number',
                                    dataType: 'float'
                                },
                                unstakingFactor: {
                                    type: 'number',
                                    dataType: 'float'
                                },
                                rewardCoefficient: {
                                    type: 'number',
                                    dataType: 'float'
                                },
                                poolForRewards: {
                                    type: 'select'
                                },
                            },
                            linksToOptions: {
                                agentName: {
                                    mask: '{agent-name-options}',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="agents"] .inputs-table.numerable[data-id="agents"] table tr[data-id] [data-id="agent-name"]'
                                },
                                poolTitle: {
                                    mask: '{pool-title-options}',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pools"] table tr[data-id] [data-id="pool-title"]'
                                }
                            }
                        }
                    }
                }),
                curves: new CurvesTables({
                    // cssClass: 'choosable',
                    cssClass: 'curved',

                    showItAgain: 'button#show-service',
                    anotherServiceNameSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .extra-inputs #service-name',
                    btnTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"]',
                    curveableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.curveable',
                    curveableTablesCssClass: 'curved',
                    unhideableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.unhideable',
                    unhideableTablesCssClass: 'unhidden',
                    choosableTablesSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.choosable',
                    choosableTablesCssClass: 'choosen',
                    removeClasses: ['choosen', 'unhidden', 'curved'],
                    addCurvesBtnSelector: 'button#add-curves',
                    saSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.unhideable[data-id="{table-id}"]',
                    sbSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.choosable[data-id="{table-id}"]',

                    presetTable: {
                        showItAgain: 'button#show-service',

                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                        tableParentElement: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .base-inputs',
                        tableBlockSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"]',
                        tableSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table',
                        htmlTableTemplate: htmlTemplates.curvesTablesTemplate,

                        header: {
                            titleElement: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] header h3.table-title',
                            titlePreset: '"{service-name}" Income',
                            description: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] header div.table-description',
                        },

                        rowPreset: {
                            numOnInit: 1,
                            numOfMin: 1,
                            htmlTemplate: htmlTemplates.trCurve,
                            trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id]',
                            tableId: '',
                            inputsSelectors: {
                                curveNumber: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="curve-number"]',
                                salesStart: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="sales-start"]',
                                salesEnd: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="sales-end"]',
                                salesMin: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="sales-min"]',
                                salesMax: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="sales-max"]',
                                chooseAlgorithm: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="choose-algorithm"]',
                                angularCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="angular-coefficient"]',
                                risingsCoefficient: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="project-services"] .inputs-table.calcable.curveable[data-id="{table-id}"] table tr[data-id="{tr-id}"] [data-id="risings-coefficient"]',
                            },
                            inputsParams: {
                                curveNumber: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                salesStart: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                salesEnd: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                salesMin: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                salesMax: {
                                    type: 'number',
                                    dataType: 'integer'
                                },
                                chooseAlgorithm: {
                                    type: 'select',
                                },
                                angularCoefficient: {
                                    type: 'number',
                                    dataType: 'float'
                                },
                                risingsCoefficient: {
                                    type: 'number',
                                    dataType: 'float'
                                },
                            },
                        }
                    }
                })
            }
        }),

        tokenCirculation: new zbccDataBlock_TokenCirculation({
            tablesSystem: new UnhideableTables({
                cssClass: 'unhidden',
                unhiders: {
                    actions: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] button.unhider[data-unhideableId="actions"]',
                },
                tables: {
                    actions: new CalcableTable({
                        elementSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table',

                        calcAddBtnSelector: 'button.calc[data-action="add"]',
                        calcDeleteBtnSelector: 'button.calc[data-action="delete"]',

                        rowPreset: {
                            numOnInit: 1,
                            numOfMin: 1,
                            htmlTemplate: htmlTemplates.trAction,
                            trSelector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id]',
                            inputsSelectors: {
                                actionNumber: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="action-number"]',
                                source: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="source"]',
                                currencyType: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="currency-type"]',
                                valuePercents: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="value-percents"]',
                                destionation: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="destination"]',
                                preCondition: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="token-circulation"] .inputs-table[data-id="actions"] table tr[data-id="{tr-id}"] [data-id="pre-condition"]',
                            },
                            inputsParams: {
                                actionNumber: {
                                    type: 'text'
                                },
                                source: {
                                    type: 'text'
                                },
                                currencyType: {
                                    type: 'select'
                                },
                                valuePercents: {
                                    type: 'text'
                                },
                                destionation: {
                                    type: 'text'
                                },
                                preCondition: {
                                    type: 'text'
                                },
                            },
                            unicInputs: [
                                'actionNumber'
                            ],
                            linksToOptions: {
                                poolTypes: {
                                    selector: '#zbcc > .form-block[data-id="data-blocks"] .data-block[data-id="pools"] .inputs-table.calcable[data-id="pool-types"] table tr[data-id] [data-id="pool-type"]',
                                    optionHtmlTemplate: htmlTemplates.selectOption,
                                    mask: '{pool-type-options}',
                                }
                            },
                        }
                    })
                }
            })
        }),
    })
})