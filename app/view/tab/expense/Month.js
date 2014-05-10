Ext.define('MyApp.view.tab.expense.Month', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_month',
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
						title: 'expensemonthpreviousbutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',			
						//text: 'TOWEEK',				
						cls:'button-border',
						title: 'expensemonthtodaybutton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',					
						cls: 'button-icon',	
						iconCls:'button-icon-next',
						title: 'expensemonthnextbutton'
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
				//store: 'Expenses',
				cls: 'atm-atmlist atm-list2 ',
				itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
       				/*
       				 * 
       				 * 
       				 */
					['<div class="info">',
						'<div class="usernameinfo">',
							'<div class="dateicon"></div>',
							'<div class="username">{time:this.formatDate}</div>',  //Ngân hàng: 
						'</div>',	
						'<div class="usernameinfo">',
							'<div class="amounticon {type}"></div>',
							'<div class="username {type}">{amount:this.format}</div>', //Tên: 
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
		me.showThisMonth();
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
		if (!me._thisMonthButton) me._thisMonthButton = me.down('button[title = "expensemonthtodaybutton"]');
		//if (!me._nextButton) me._nextButton = me.down('button[title = "expensedaynextbutton"]');	
	},
	
	getCurrentMonth: function() {
		return this._currentDate.getMonth();	
	},
	
	updateStoreDataWithDate: function(date) {
		var me = this;
		if (date.sameMonthWith(me._currentDate)) {
			me.updateStoreData(date);
		}
	},
	
	updateStoreData: function(date) {
		var me = this;
		
		if (!me._list) me._list = me.down('list');
		if (!me._amountLbl) me._amountLbl = me.down('label[title = "tong_chi"]');
		if (!me._amountLblThu) me._amountLblThu = me.down('label[title = "tong_thu"]');
		if (!me._list.getStore())  me._list.setStore(Ext.getStore('Expenses_Month'));
		var store = me._list.getStore();
		me._list.getScrollable().getScroller().scrollToTop();
		store.removeAll();
		me._list.setGrouped(true);
		//me._list.setGrouped(true);
		AppUtil.offline.updateStoreQuery(store, 'Expenses_Month', {mm: date.getMonth(), yy: date.getFullYear()});
		store.load(function(records){
			var sumChi = 0;
			var sumThu = 0;
			Ext.Array.each(records, function(item, index) {
				if (item.data.type == 'chi')
					sumChi += parseInt(item.data.amount);
				else if (item.data.type == 'thu' || item.data.type == 'linh_lai')
					sumThu += parseInt(item.data.amount);
			});
			
			me._amountLbl.setHtml(AppUtil.formatMoneyWithUnit(sumChi));
			me._amountLblThu.setHtml(AppUtil.formatMoneyWithUnit(sumThu));
			//AppUtil.log('records');
			//AppUtil.log(records);
		});
			
		
	},
	
	showThisMonth: function() {
		var me = this;
		var now = new Date();
		
		//if (!now.sameMonthWith(me._currentDate)) {
			me._currentDate = now;
			me._thisMonthButton.setText(me.formatMonth(me._currentDate));
			
			me.updateStoreData(me._currentDate);
		//}
	},
	
	showNextMonth: function() {
		var me = this;
		me._currentDate.setMonth(me._currentDate.getMonth() + 1);
		me._thisMonthButton.setText(me.formatMonth(me._currentDate));
		
		me.updateStoreData(me._currentDate);
	},
	
	showPrevMonth: function() {
		var me = this;
		me._currentDate.setMonth(me._currentDate.getMonth() - 1);
		me._thisMonthButton.setText(me.formatMonth(me._currentDate));
		
		me.updateStoreData(me._currentDate);
	},
	
	formatMonth: function(date) {
		return date.getMonthName() + ', ' + date.getFullYear();
	}
 });   