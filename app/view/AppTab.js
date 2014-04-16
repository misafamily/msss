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
			animation:{
				type:'fade'
			}
		},
		items: [
			{xtype:'tab_home'},
			{xtype:'tab_expense'},
			{xtype:'tab_atm'}
        ]
    }
});
