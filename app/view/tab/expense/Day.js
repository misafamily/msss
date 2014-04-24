Ext.define('MyApp.view.tab.expense.Day', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_day',
    requires: [
    	    
    ],
    config: {
    	cls: 'expense-day-container',
        layout:{
			type:'vbox'
		},
		items:[
			{
				xtype:'container',
				 layout:{
					type:'hbox',
					align:'center',
					pack:'center'
				},
				cls:'atm-title-container',
				items:[
					{
						xtype: 'button',			
						cls: 'button-icon',	
						iconCls:'button-icon-previous',
						title: 'expensedaypreviousbutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',			
						text: 'TODAY',				
						cls:'button-border',
						title: 'expensedaytodaybutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',					
						cls: 'button-icon',	
						iconCls:'button-icon-next',
						title: 'expensedaynextbutton'
					},
				]
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
		me.showToday();
	},
	
	assignFields: function() {
		var me = this;
		if (!me._prevButton) me._prevButton = me.down('button[title = "expensedaypreviousbutton"]');
		if (!me._todayButton) me._todayButton = me.down('button[title = "expensedaytodaybutton"]');
		if (!me._nextButton) me._nextButton = me.down('button[title = "expensedaynextbutton"]');	
	},
	
	showToday: function() {
		var me = this;
		me._currentDate = new Date();;
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
	},
	
	showPrevDay: function() {
		var me = this;
		me._currentDate = me._currentDate.yesterday();
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
	},
	
	showNextDay: function() {
		var me = this;
		me._currentDate = me._currentDate.tomorrow();
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
	}
 });   