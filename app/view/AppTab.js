Ext.define('MyApp.view.AppTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'apptab',
    requires: [
       'MyApp.view.tab.Home',
       'MyApp.view.tab.Expense',
	   'MyApp.view.tab.Atm'
    ],
    config: {
        tabBarPosition: 'bottom',
		layout:{
			animation: null
		},
		items: [
			{xtype:'tab_home'},
			{xtype:'tab_atm'},
			{xtype:'tab_expense'}
        ]
    }
});
