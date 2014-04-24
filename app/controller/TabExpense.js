Ext.define('MyApp.controller.TabExpense', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			thisTab: 'tab_expense',
			thisExpenseDay: 'tab_expense_day'
        },//end refs
        control: {
			thisTab: {
				//initialize: 'onTabInit'
			},
			
			//DAY
			'tab_expense_day button[title = "expensedaypreviousbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseDay().showPrevDay();
				}
			},
			'tab_expense_day button[title = "expensedaytodaybutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseDay().showToday();
				}
			},
			'tab_expense_day button[title = "expensedaynextbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseDay().showNextDay();
				}
			}
		}
    },
	
	onTabInit: function() {	
		
	}
});