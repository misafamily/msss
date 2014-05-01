Ext.define('MyApp.view.tab.atm.InsuranceList', {
    extend: 'MyApp.view.component.AppList',
    xtype: 'tab_atm_insurancelist',
    config: { 
    	cls: 'atm-atmlist',
		store: 'Insurances',  	
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
						'<div class="amount">{insurancetext}</div>',
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
		this.callParent(arguments);
		//Ux.locale.Manager.applyLocaleForCmp(this);
		this.updateStore();
	},
	
	updateStore: function() {
		var me = this;
		me.getStore().load(function(records) {
			//console.log('records.length: ', records.length);
			me.setHeight(113*records.length);
		});
	}
});
