const htmlTemplates = {

    trInvestmentRound:
    '<tr data-id="{row-id}">' +
    '    <td><input type="text" data-id="round-title" value="Round {row-number}"></td>' +
    '    <td><input type="number" value="" step="any" data-id="fiat" placeholder="x"></td>' +
    '    <td><input type="number" value="" step="any" data-id="token-price" placeholder="x"></td>' +
    '    <td><input type="number" value="" step="any" data-id="tokens-amount" placeholder="x"></td>' +
    '    <td><input type="number" value="" step="any" data-id="investor-share" placeholder="%"></td>' +
    '</tr>',

    trAgent:
    '<tr data-id="{row-id}">' +
    '    <td><input type="text" data-id="agent-name" value="Agent {row-number}"></td>' +
    '    <td><input type="number" step="any" data-id="agent-share" placeholder="%" value=""></td> ' +
    '    <td><input type="number" step="any" data-id="tokens-amount" value="" placeholder="x"></td>' +
    '</tr>',

    //

    trPoolType:
    '<tr data-id="{row-id}">' +
    '    <td><input type="text" data-id="pool-number" value="{row-number}"></td>' +
    '    <td>' +
    '        <input type="text" data-id="pool-type" value="Pool type">' +
    '    </td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    trPool:
    '<tr data-id="{row-id}">' +
    '    <td><input type="text" data-id="pool-title" value="Pool {row-number}"></td>' +
    '    <td>' +
    '        <select data-id="pool-type">' +
    '            {pool-type-options}' +
    '        </select>' +
    '    </td>' +
    '    <td><input type="text" data-id="pool-share" value="" placeholder="%"></td>' +
    '    <td><input type="text" data-id="amount" value="10000"></td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    //

    trVesting:
    '<tr data-id="{row-id}"> ' +
    '    <td>' +
    '        <select data-id="agent-name">' +
    '           {agent-name-options}' +
    '        </select>' +
    '    </td>' +
    '    <td>' +
    '       <select data-id="pool-title">' +
    '          {pool-title-options}' +
    '       </select>' +
    '    </td>' +
    '    <td><input type="text" data-id="start-vesting" value="" placeholder="x"></td>' +
    '    <td><input type="text" data-id="end-vesting" value="" placeholder="x"></td>' +
    '    <td><input type="text" data-id="vesting-coefficient" value="" placeholder="%"></td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    trUnlocking:
    '<tr data-id="{row-id}">' +
    '    <td>' +
    '        <select data-id="agent-name">' +
    '           {agent-name-options}' +
    '        </select>' +
    '    </td>' +
    '    <td><input type="text" data-id="start-unlocking" value="" placeholder="x"></td>' +
    '    <td><input type="text" data-id="end-unlocking" value="" placeholder="x"></td>' +
    '    <td><input type="text" data-id="initial-unlocking" value="" placeholder="x"></td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    //

    trService:
    '<tr data-id="{row-id}">' +
    '    <td><input type="number" step="any" value="{row-number}" data-id="number" readonly></td>' +
    '    <td>' +
    '        <select data-id="agent-name">' +
    '            {agent-name-options}' +
    '        </select>' +
    '    </td>' +
    '    <td><input type="number" step="any" data-id="agent-share" value="" placeholder="%"></td>' +
    '    <td><input type="number" step="any" data-id="unstaking-factor" value="" placeholder="%"></td>' +
    '    <td><input type="number" step="any" data-id="reward-coefficient" value="" placeholder="%"></td>' +
    '    <td>' +
    '        <select data-id="pool-for-rewards">' +
    '            {pool-title-options}' +
    '        </select>' +
    '    </td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    serviceTableTemplate:
    '<div class="inputs-table calcable choosable choosen" data-id="{table-id}">' +
    '    <header>' +
    '        <h3 class="table-title">{table-title}</h3>' +
    '        <div class="table-description"></div>' +
    '    </header>' +
    '    <table>' +
    '        <tr>' +
    '            <th>№</th>' +
    '            <th>Agent Name</th>' +
    '            <th>Agent Share</th>' +
    '            <th>Unstaking Factor</th>' +
    '            <th>Reward Coefficient</th>' +
    '            <th>Pool (For Rewards)</th>' +
    '            <th></th>' +
    '        </tr>' +
    '    </table>' +
    '    <div class="action-buttons">' +
    '        <button type="button" class="action" data-action="add-curves">Add curves</button>' +
    '    </div>' +
    '</div>',

    curvesTableTemplate:
    '<div class="inputs-table curveable calcable curved" data-id="{table-id}">' +
    '    <header>' +
    '        <h3 class="table-title">"{service-name}" Income</h3>' +
    '        <div class="table-description">(Incomes - marketing functions for planned project services)</div>' +
    '    </header>' +
    '    <table>' +
    '        <tr>' +
    '            <th>Curve №</th>' +
    '            <th>Sales Start</th>' +
    '            <th>Sales End</th>' +
    '            <th>Sales Min (USD)</th>' +
    '            <th>Sales Max (USD)</th>' +
    '            <th>Choose Algorithm</th>' +
    '            <th>Angular Coefficient</th>' +
    '            <th>Rising\'s Coefficient</th>' +
    '            <th></th>' +
    '        </tr>' +
    '    </table>' +
    '    <div class="action-buttons">' +
        '    <button type="button" class="action" data-action="show-service">Back to service</button>' +
    '    </div>' +
    '</div>',

    curvesTableTemplateAlternative:
    '<div class="inputs-table curveable calcable curved" data-id="{table-id}">' +
    '    <header>' +
    '        <h3 class="table-title">"{service-name}" Income</h3>' +
    '        <div class="table-description">(Incomes - marketing functions for planned project services)</div>' +
    '    </header>' +
    '    <table>' +
    '        <tr>' +
    '            <th>Curve №</th>' +
    '            <th>Sales Start</th>' +
    '            <th>Sales End</th>' +
    '            <th>Sales Min (USD)</th>' +
    '            <th>Sales Max (USD)</th>' +
    '            <th>Choose Algorithm</th>' +
    '            <th>Angular Coefficient</th>' +
    '            <th>Rising\'s Coefficient</th>' +
    '            <th></th>' +
    '        </tr>' +
    '    </table>' +
    '    <div class="action-buttons">' +
    '    </div>' +
    '</div>',

    trCurve:
    '<tr data-id="{row-id}">' +
    '    <td><input type="number" step="1" readonly data-id="curve-number" value="{row-number}"></td>' +
    '    <td><input type="number" step="1" data-id="sales-start" value="4"></td>' +
    '    <td><input type="number" step="1" data-id="sales-end" value="7"></td>' +
    '    <td><input type="number" step="1" data-id="sales-min" value="10000"></td>' +
    '    <td><input type="number" step="any" data-id="sales-max" value="10000"></td>' +
    '    <td>' +
    '        <select data-id="choose-algorithm">' +
    '            <option value="Linear">Linear</option>' +
    '            <option value="Exponential">Exponential</option>' +
    '        </select>' +
    '    </td>' +
    '    <td><input type="number" step="any" data-id="angular-coefficient" value="0.9"></td>' +
    '    <td><input type="number" step="any" data-id="risings-coefficient" value="0.7"></td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    //

    trAction:
    '<tr data-id="{row-id}">' +
    '    <td><input type="text" data-id="action-number" value="Action {row-number}"></td>' +
    '    <td><input type="text" data-id="source" value=""></td>' +
    '    <td>' +
    '       <select data-id="currency-type">' +
    '           {pool-type-options}' +
    '        </select>' +
    '    </td>' +
    '    <td><input type="text" data-id="value-percents" value="" placeholder="%"></td>' +
    '    <td><input type="text" data-id="destination" value=""></td>' +
    '    <td>' +
    '        <label>' +
    '            <input type="checkbox" name="" data-id="pre-condition">' +
    '            Yes/No' +
    '        </label>' +
    '    </td>' +
    '    <td>' +
    '        <div class="calc-buttons">' +
    '            <button type="button" class="calc" data-action="delete">–</button>' +
    '            <button type="button" class="calc" data-action="add">+</button>' +
    '        </div>' +
    '    </td>' +
    '</tr>',

    //

    selectOption: '<option data-id="{id}" value="{value}">{text}</option>',
}