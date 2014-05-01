Ext.define('MyApp.view.tab.atm.SavingList', {
    extend: 'MyApp.view.component.AppList',
    xtype: 'tab_atm_savinglist',
    config: { 
    	cls: 'atm-atmlist',
		store: 'Savings',  	
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
						'<div class="amountinfo">',
							'<div class="amounticon"></div>',
							'<div class="amount">{amount:this.format}</div>',
						'</div>',
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
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		//Ux.locale.Manager.applyLocaleForCmp(this);
		me.updateStore();
	},
	
	updateStore: function() {
		var me = this;
		me.getStore().load(function(records) {
			//console.log('records.length: ', records.length);
			me.setHeight(113*records.length);
		});
	}
});
