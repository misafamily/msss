Ext.define('MyApp.view.tab.atm.CashHistory', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_cashhistory',
    requires: [
    	 'MyApp.view.component.AppListPull'
    ],
    config: {
    	//emptyListOnHide: true,
    	title: 'Lịch sử thu chi',
    	layout:{
			type:'vbox'
		},
		//cls:'atm-form-container',
		items:[
			{
				xtype:'container',
				layout: {
					type:'vbox'
				},
				flex: 1,
				items:[
						{
							xclass: 'MyApp.view.component.AppListPull',
							store: 'Cashs',
							cls: 'atm-atmlist',
							//scrollable: false,
							itemTpl: new Ext.XTemplate(
					       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
										['<div class="info">',
											'<div class="usernameinfo">',
												'<div class="dateicon"></div>',
												'<div class="username">{time:this.formatDateTime}</div>',  //Ngân hàng: 
											'</div>',	
											'<div class="usernameinfo">',
												'<div class="shoppingicon {buyingtype}"></div>',
												'<div class="username">{buyingwhat}</div>', //Tên: 
											'</div>',
											'<div class="usernameinfo">',
												'<div class="amounticon cash {type}"></div>',
												'<div class="username {type}">{amount:this.format}</div>', //Tên: 
											'</div>',		
										'</div>'
										].join(''),
										{
											formatDateTime:function(time) {
												return AppUtil.formatDateTime(new Date(time));
											},
											format: function(amount) {
												return AppUtil.formatMoneyWithUnit(amount);
											}	
										}
					       ),
					       onItemDisclosure: true
						}
					]
			}
		]
    },
    initialize: function() {
    	var me = this;
    	me.callParent(arguments);
    	MyApp.app.on('chi_changed', me.onChiChanged, me);
    },
    
    onChiChanged: function() {
    	var me = this;
		if (!me._list) me._list = me.down('list');
		me._list.getScrollable().getScroller().scrollToTop();
		var store = me._list.getStore();
		store.removeAll();
		me.loadData();
    },

	loadData: function() {
		var me = this;
		//me.setAtmModel(atmModel);
		
		if (!me._list) me._list = me.down('list');
		
		//me._list.getScrollable().getScroller().scrollToTop();
		var store = me._list.getStore();
		//store.removeAll();
		
		AppUtil.offline.updateStoreQuery(store, 'Cashs');
		store.loadPage(1);
	}
 });   