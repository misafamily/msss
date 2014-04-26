Ext.define('MyApp.view.tab.expense.Day', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_day',
    requires: [
    	'MyApp.view.component.AppList'	    
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
			},
			{
				xtype:'container',
				layout: {
					type: 'hbox',
					align: 'center'
				},
				style: {
					//'height': '40px',
					'margin-top': '10px',
					'margin-left': '15px',
					//'border-bottom': '1px solid gray',
					//'margin-right': '20px'
				},							
				items:[
					{
						xtype: 'label',
						html:'Tổng thu:'
						//cls:'atm-tienmat-amount'
					},	
					{
						xtype: 'label',
						html:'1.000.000 (đ)',
						title:'tong_thu',
						cls:'atm-tienmat-amount',
						title: 'tong_thu'
					}
				]
				
			},
			{
				xtype:'container',
				layout: {
					type: 'hbox',
					align: 'center'
				},
				style: {
					'height': '40px',
					'margin-left': '15px',
					'border-bottom': '1px solid gray',
					//'margin-right': '20px'
				},							
				items:[
					{
						xtype: 'label',
						html:'Tổng chi:'
						//cls:'atm-tienmat-amount'
					},	
					{
						xtype: 'label',
						html:'100.000 (đ)',
						cls:'atm-tienmat-amount',
						title: 'tong_chi'
					}
				]
				
			},
			{
				xclass: 'MyApp.view.component.AppList',
				//store: 'Expenses',
				cls: 'atm-atmlist expenseday',
				itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
					['<div class="info">',
						'<div class="usernameinfo">',
							'<div class="shoppingicon"></div>',
							'<div class="username">{buyingwhat}</div>', //Tên: 
						'</div>',	
						'<div class="usernameinfo">',
							'<div class="chiicon"></div>',
							'<div class="username">{amount:this.format}</div>',
						'</div>',	
					'</div>'
								
					].join(''),
					{
						upper:function(s) {
							return s.toUpperCase();
						},
						format: function(amount) {
							return AppUtil.formatMoneyWithUnit(amount);
						}	
					}
       			),
       			onItemDisclosure: true
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
		//if (!me._prevButton) me._prevButton = me.down('button[title = "expensedaypreviousbutton"]');
		if (!me._todayButton) me._todayButton = me.down('button[title = "expensedaytodaybutton"]');
		//if (!me._nextButton) me._nextButton = me.down('button[title = "expensedaynextbutton"]');	
	},
	
	getCurrentDate: function() {
		return this._currentDate;	
	},
	
	updateStoreData: function(chosenDate) {
		var me = this;
		if (!me._list) me._list = me.down('list');
		if (!me._amountLbl) me._amountLbl = me.down('label[title = "tong_chi"]');
		
		if (! me._list.getStore())  me._list.setStore(new MyApp.store.Expenses());
		
		var store = me._list.getStore();
		
		var date = me.getCurrentDate();
		var needRefresh = false;
		if (chosenDate) {
			if (chosenDate.sameDateWith(date)) {
				needRefresh = true;
			}
		} else {
			needRefresh = true;
		}
		
		if (needRefresh) {
			me._list.getScrollable().getScroller().scrollToTop();
			store.removeAll();
			
			AppUtil.offline.updateStoreQuery(store, 'Expenses_Day', {dd: date.getDate(), mm: date.getMonth(), yy: date.getFullYear()});
			store.load(function(records){
				var sum = 0;
				Ext.Array.each(records, function(item, index) {
					sum += parseInt(item.data.amount);
				});
				
				me._amountLbl.setHtml(AppUtil.formatMoneyWithUnit(sum));
			});
			
			
		}
	},
	
	showToday: function() {
		var me = this;
		me._currentDate = new Date();;
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
		me.updateStoreData();
	},
	
	showPrevDay: function() {
		var me = this;
		me._currentDate = me._currentDate.yesterday();
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
		me.updateStoreData();
	},
	
	showNextDay: function() {
		var me = this;
		me._currentDate = me._currentDate.tomorrow();
		me._todayButton.setText(me._currentDate.dateShortFormatWithoutTime());
		me.updateStoreData();
	}
 });   