Ext.define('MyApp.controller.TabExpense', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.expense.ExpenseAdd'
	],
    config: {
        refs: {		
			thisTab: 'tab_expense',
			thisSegmentContainer: 'tab_expense container[cls = "segment-container"]',
			thisMenuButton: 'tab_expense button[iconCls = "toolbar-icon-menu"]',
			thisAddButton: 'tab_expense button[title = "toolbar_tabexpense_add_button"]',
			thisExpenseDay: 'tab_expense_day',
			thisExpenseWeek: 'tab_expense_week',
			thisExpenseMonth: 'tab_expense_month'
        },//end refs
        control: {
			thisTab: {
				//initialize: 'onTabInit'
				push: function(me, view) {
					var mee = this;
					mee.getThisMenuButton().hide();
					mee.getThisAddButton().hide();
				},
				pop: function(me, view, level) {
					var mee = this;
					if (level < 3) {
						mee.getThisMenuButton().show();
						mee.getThisAddButton().show();
					}
				},
			},
			
			//TAB
			thisAddButton: {
				tap: function() {
					var me = this;
					var eAdd = me.getExpenseAddView();
					eAdd.resetView(me.getThisExpenseDay().getCurrentDate());
					me.getThisTab().push(eAdd);
				}
			},
			
			'tab_expense segmentedbutton': {
				toggle: function(container, button, pressed){
					var me = this;
        			if (pressed == true) {
        				me.getThisSegmentContainer().setActiveItem(button.config.viewIndex);					
					}
					                    
                }//end toogle
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
			},
			
			//WEEK
			'tab_expense_week button[title = "expenseweekpreviousbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseWeek().showPrevWeek();
				}
			},
			'tab_expense_week button[title = "expenseweektodaybutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseWeek().showThisWeek();
				}
			},
			'tab_expense_week button[title = "expenseweeknextbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseWeek().showNextWeek();
				}
			},
			
			//MONTH
			'tab_expense_month button[title = "expensemonthpreviousbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseMonth().showPrevMonth();
				}
			},
			'tab_expense_month button[title = "expensemonthtodaybutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseMonth().showThisMonth();
				}
			},
			'tab_expense_month button[title = "expensemonthnextbutton"]': {
				tap: function() {
					var me = this;
					me.getThisExpenseMonth().showNextMonth();
				}
			},
			
			//ExpenseAdd
			'tab_expense_expenseadd button[title = "expenseaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_expense_expenseadd button[title = "expenseaddsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getExpenseAddView().addExpense(
						function(date) {
							me.getThisExpenseDay().updateStoreData(date);
							me.getThisExpenseWeek().updateStoreDataWithDate(date);
							me.getThisExpenseMonth().updateStoreDataWithDate(date);
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
		}
    },
	
	onTabInit: function() {	
		
	},
	
	getExpenseAddView: function() {
		var me = this;
		if (!me._expenseAddView) me._expenseAddView = Ext.create('MyApp.view.tab.expense.ExpenseAdd');
		return me._expenseAddView;
	}
});