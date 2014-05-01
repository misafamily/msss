Ext.define('MyApp.controller.TabExpense', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.expense.ExpenseAdd',
		'MyApp.view.tab.expense.ExpenseDetail'
	],
    config: {
        refs: {		
			thisTab: 'tab_expense',
			thisSegmentContainer: 'tab_expense container[cls = "segment-container"]',
			thisMenuButton: 'tab_expense button[iconCls = "toolbar-icon-menu"]',
			thisAddButton: 'tab_expense button[title = "toolbar_tabexpense_add_button"]',
			thisSegmentButtons: 'tab_expense segmentedbutton',
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
			
			'tab_expense_day list': {
				disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var dAdd = me.getExpenseDetailView();
					dAdd.setExpenseModel(record);
					me.getThisTab().push(dAdd);
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
			
			'tab_expense_week list': {
				disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var dAdd = me.getExpenseDetailView();
					dAdd.setExpenseModel(record);
					me.getThisTab().push(dAdd);
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
			
			'tab_expense_month list': {
				disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var dAdd = me.getExpenseDetailView();
					dAdd.setExpenseModel(record);
					me.getThisTab().push(dAdd);
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
							var activeBtn = me.getThisSegmentButtons().getPressedButtons()[0];
							if (activeBtn.config.viewIndex == 0 && !me.getThisExpenseDay().getCurrentDate().sameDateWith(date)) {
									me.getThisExpenseDay().showSelectedDate(date);
							} else
								me.getThisExpenseDay().updateStoreData(date);
							me.getThisExpenseWeek().updateStoreDataWithDate(date);
							me.getThisExpenseMonth().updateStoreDataWithDate(date);
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			
			'tab_expense_expenseadd textfield[name = "todaydate"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var addView = this.getExpenseAddView();
					var dp = this.getDatePicker(addView.getSelectedDate(), addView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			}
		}
    },
	
	onTabInit: function() {	
		
	},
	
	getExpenseAddView: function() {
		var me = this;
		if (!me._expenseAddView) me._expenseAddView = Ext.create('MyApp.view.tab.expense.ExpenseAdd');
		return me._expenseAddView;
	},
	
	getExpenseDetailView: function() {
		var me = this;
		if (!me._expenseDetailView) me._expenseDetailView = Ext.create('MyApp.view.tab.expense.ExpenseDetail');
		return me._expenseDetailView;
	},
	
	getDatePicker: function(date, view, tf) {
		var me = this;	
		if (!me._datepicker) {
			me._datepicker = Ext.create('Ext.picker.Date', {
				 //doneButton: 'Xong',
	       		 //cancelButton: 'Hủy' 
			});			
		}
		me._datepicker.setValue(date);
		me._datepicker.un('change', me.onDatePickerDone, me);
		me._datepicker.on('change', me.onDatePickerDone, me, {view: view, tf: tf});
		return me._datepicker;
	},
	onDatePickerDone: function(dp, date, opts) {
		//console.log('onDatePickerDone: ' + date.format('dd/mm/yyyy'));
		if (opts) {
			//opts.tf.setValue(date.format('dd/mm/yyyy'));
			var now = new Date();
			date.setMinutes(now.getMinutes());
			date.setHours(now.getHours());
			opts.view.updateSelectedDate(Ext.Date.clone(date));
		}
	}
});