Ext.define('MyApp.view.tab.expense.Week', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_week',
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
						title: 'expenseweekpreviousbutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',			
						//text: 'TOWEEK',				
						cls:'button-border',
						title: 'expenseweektodaybutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',					
						cls: 'button-icon',	
						iconCls:'button-icon-next',
						title: 'expenseweeknextbutton'
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
					//'height': '40px',
					'margin-top': '10px',
					'margin-left': '15px'
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
					html:'0 (đ)',
					title:'tong_thu',
					cls:'atm-tienmat-amount'
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
					'margin-left': '15px'
					//'border-bottom': '1px solid gray',
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
						html:'0 (đ)',
						title:'tong_chi',
						cls:'atm-tienmat-amount'
					}
				]
				
			},
			{
				xclass: 'MyApp.view.component.AppList',
				store: 'Expenses_Week',
				cls: 'atm-atmlist atm-list3',
				itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
       				/*
       				 * '<div class="usernameinfo">',
							'<div class="dateicon"></div>',
							'<div class="username">{time:this.formatDate}</div>',  //Ngân hàng: 
						'</div>',	
       				 * 
       				 */
					['<div class="info">',
						'<div class="usernameinfo">',
							'<div class="shoppingicon {buyingtype}"></div>',
							'<div class="username">{buyingwhat}</div>', //Tên: 
						'</div>',	
						'<div class="usernameinfo">',
							'<div class="amounticon {type}"></div>',
							'<div class="username {type}">{amount:this.format}</div>',
						'</div>',		
					'</div>'
								
					].join(''),
					{
						formatDate:function(time) {
							var d = new Date(time);
							return d.dateShortFormatWithoutTime();
						},
						format: function(amount) {
							return AppUtil.formatMoneyWithUnit(amount);
						}	
					}
       			),
       			onItemDisclosure: true,
       			itemHeight: 82
       			//grouped: true
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
		me.showThisWeek();
		MyApp.app.on('expense_changed', me.onExpenseChanged, me);
	},
	
	onExpenseChanged: function(date) {
		var me = this;
		//if (me._currentDate.sameDateWith(date)) {
			me.updateStoreDataWithDate(date);
		//}
	},
	
	assignFields: function() {
		var me = this;
		//if (!me._prevButton) me._prevButton = me.down('button[title = "expenseweekpreviousbutton"]');
		if (!me._thisWeekButton) me._thisWeekButton = me.down('button[title = "expenseweektodaybutton"]');
		//if (!me._nextButton) me._nextButton = me.down('button[title = "expensedaynextbutton"]');	
	},
	
	getCurrentWeek: function() {
		return this._currentWeek;	
	},
	
	updateStoreDataWithDate: function(date) {
		var me = this;
		if (Ext.Date.between(date, me.beginDateOfWeek, me.endDateOfWeek)) {
			me.updateStoreData(me.beginDateOfWeek, me.endDateOfWeek);
		}
	},
	
	updateStoreData: function(fromDate, toDate) {
		var me = this;
		me.beginDateOfWeek = fromDate;
		me.endDateOfWeek = toDate;
		
		if (!me._list) me._list = me.down('list');
		if (!me._amountLbl) me._amountLbl = me.down('label[title = "tong_chi"]');
		if (!me._amountLblThu) me._amountLblThu = me.down('label[title = "tong_thu"]');
		
		if (!me._list.getStore())  me._list.setStore(new MyApp.store.Expenses_Week());
		var store = me._list.getStore();
		me._list.getScrollable().getScroller().scrollToTop();
		store.removeAll();
		me._list.setGrouped(true);
		
		
		AppUtil.offline.updateStoreQuery(store, 'Expenses_Week', {from: fromDate, to: toDate});
		store.load(function(records){
			var sumThu = 0;
			var sumChi = 0;
			Ext.Array.each(records, function(item, index) {
				if (item.data.type == 'chi')
					sumChi += parseInt(item.data.amount);
				else if (item.data.type == 'thu')
					sumThu += parseInt(item.data.amount);
			});
			
			me._amountLbl.setHtml(AppUtil.formatMoneyWithUnit(sumChi));
			me._amountLblThu.setHtml(AppUtil.formatMoneyWithUnit(sumThu));
		});
			
		
	},
	
	showThisWeek: function() {
		var me = this;
		var now = new Date();
		
		if (!now.sameDateWith(me._currentDate)) {
			me._currentDate = now;
			me._currentWeek = Ext.Date.getWeekOfYear(me._currentDate);
			var firstEnd = me._currentDate.getFirstAndLastDayOfWeek();
			me._thisWeekButton.setText(me.formatWeek(me._currentWeek, firstEnd.first, firstEnd.last));
			
			me.updateStoreData(firstEnd.first, firstEnd.last);
		}
	},
	
	showNextWeek: function() {
		var me = this;
		me._currentDate.setDate(me._currentDate.getDate() + 7);
		me._currentWeek = Ext.Date.getWeekOfYear(me._currentDate);
		var firstEnd = me._currentDate.getFirstAndLastDayOfWeek();
		me._thisWeekButton.setText(me.formatWeek(me._currentWeek, firstEnd.first, firstEnd.last));
		
		me.updateStoreData(firstEnd.first, firstEnd.last);
	},
	
	showPrevWeek: function() {
		var me = this;
		me._currentDate.setDate(me._currentDate.getDate() - 7);
		me._currentWeek = Ext.Date.getWeekOfYear(me._currentDate);
		var firstEnd = me._currentDate.getFirstAndLastDayOfWeek();
		me._thisWeekButton.setText(me.formatWeek(me._currentWeek, firstEnd.first, firstEnd.last));
		
		me.updateStoreData(firstEnd.first, firstEnd.last);
	},
	
	formatWeek: function(week, beginDate, endDate) {
		var s = 'Tuần ' + week + ' (' + beginDate.shortDateFormat2() + '->' + endDate.shortDateFormat2() + ')';
		return s;
	}
 });   