Ext.define('MyApp.controller.TabExpense', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			thisTab: 'tab_expense'
        },//end refs
        control: {
			thisTab: {
				initialize: 'onTabInit'
			}
		}
    },
	
	onTabInit: function() {	
		
	}
});