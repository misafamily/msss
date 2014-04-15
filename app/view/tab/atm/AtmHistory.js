Ext.define('MyApp.view.tab.atm.AtmHistory', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmhistory',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết tài khoản',
        layout:{
			type:'vbox'
		},
		cls:'atm-form-container',
		items:[
			
           {
				xtype:'MyApp.view.component.AppList',
				cls: 'atm-atmhistory',
				store: 'AtmHistories',  	
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
								'<div class="amount">{amount:this.format} (đ)</div>',
							'</div>',					
							].join(''),
							{
								upper:function(s) {
									return s.toUpperCase()
								},
								format: function(amount) {
									return parseInt(amount).format(0, 3, '.');
								}	
							}
		       		)
			}
           
		]
    },
	initialize: function() {
		this.callParent(arguments);
	},
	
	
 });   