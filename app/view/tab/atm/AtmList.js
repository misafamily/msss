Ext.define('MyApp.view.tab.atm.AtmList', {
    extend: 'MyApp.view.component.AppList',
    xtype: 'tab_atm_atmlist',
    config: { 
    	cls: 'atm-atmlist',
		store: 'Atms',  	
       	itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
					['<div class="info">',
						'<div class="username">{username:this.upper}</div>', //Tên: 
						'<div class="bank">{bank:this.upper}</div>', //Ngân hàng: 
					'</div>',
					'<div class="amount">{amount:this.format} (đ)</div>',
					].join(''),
					{
						upper:function(s) {
							return s.toUpperCase()
						},
						format: function(amount) {
							return parseInt(amount).format(0, 3, '.');
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
		this._atmStore.load(function(records) {
			list.setHeight(60*records.length);
		});
	}
});
