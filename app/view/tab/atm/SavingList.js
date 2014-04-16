Ext.define('MyApp.view.tab.atm.SavingList', {
    extend: 'MyApp.view.component.AppList',
    xtype: 'tab_atm_savinglist',
    config: { 
    	cls: 'atm-savinglist',
		store: 'TestSavings',  	
       	itemTpl: new Ext.XTemplate(
       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
					['<div class="info">',
						'<div class="bank">Ngân hàng: {bank}</div>',
						'<div class="date">Ngày gửi: {created_date}</div>',
						'<div class="note">{note}</div>',
					'</div>',
					'<div class="amount">{amount:this.format} (đ)</div>',
					].join(''),
					{
						format: function(amount) {
							return amount.format(0, 3, '.');
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
	}
});
