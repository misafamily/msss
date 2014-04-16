Ext.define('MyApp.view.tab.atm.AtmList', {
    extend: 'MyApp.view.component.AppList',
    xtype: 'tab_atm_atmlist',
    config: { 
    	cls: 'atm-atmlist',
		store: 'Atms',  	
       	itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
					['<div class="info">',
						'<div class="usernameinfo">',
							'<div class="usernameicon"></div>',
							'<div class="username">{username:this.upper}</div>', //Tên: 
						'</div>',	
						'<div class="bankinfo">',
							'<div class="bankicon"></div>',
							'<div class="bank">{bank:this.upper}</div>',  //Ngân hàng: 
						'</div>',	
					'</div>',
					'<div class="amountinfo">',
						'<div class="amounticon"></div>',
						'<div class="amount">{amount:this.format}</div>',
					'</div>',					
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
       	
    },
	setLocale:function(locale){
		this.callParent(arguments);
	},
		
	initialize: function() {
		this.callParent(arguments);
		//Ux.locale.Manager.applyLocaleForCmp(this);
		this.updateStore();
	},
	
	updateStore: function() {
		if (!this._atmStore) {
			this._atmStore = Ext.getStore('Atms');
		}
		var list = this;
		//list.getScrollable().getScroller().scrollToTop();
		this._atmStore.load(function(records) {
			//console.log('records.length: ', records.length);
			list.setHeight(113*records.length);
		});
	}
});
