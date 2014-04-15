Ext.define('MyApp.view.tab.Atm', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_atm',
    requires: [
		'MyApp.view.tab.atm.Atm',
		'MyApp.view.tab.atm.Saving'
	],
    config: {      
    	title:'ATM',		
		iconCls:'tabbar-icon-home',	
		items:[
			{
				title:'ATM',
				xtype: 'container',
				scrollable:true,
				flex: 1,
				items:[
					{
						xtype:'container',
						title: 'ATM',				
						items:[
							{
								xtype:'container',
								layout: {
									type: 'hbox',
									align: 'center',
									pack: 'center'
								},
								cls:'atm-title-container',
								
								items:[
									{
										xtype: 'image',			
										src: 'resources/images/coloricons/money-wallet-icon.png',					
										cls:'atm-title-item-icon'
									},
									{
										xtype: 'label',
										html:'Tiền mặt',
										cls:'atm-title-item'
									},
									{
										xtype: 'spacer'
									},
															
									{
										xtype: 'button',								
										title: 'moneyadd',
										cls: 'button-icon',
										iconCls: 'button-icon-addnew'
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
									'margin-left': '20px'
								},							
								items:[
									{
										xtype: 'label',
										html:'Tổng cộng:',
										//cls:'atm-tienmat-amount'
									},	
									{
									xtype: 'label',
									html:'100.000 (đ)',
									cls:'atm-tienmat-amount'
									}
								]
								
							},
							{
								xtype:'tab_atm_atm',
								
								//height: 70*2 + 20,
							},
							{
								xtype:'tab_atm_saving',
								
								//height: 80*2 + 20,
							},
						]
					}
				]
			}
			
		]			
   },
   
   initialize: function() {
   		this.callParent(arguments);
   		MyApp.app.on('cash_changed', this.onCashChanged, this);
   		
   		this.initView();
   },
   
   initView: function() {
   		this.onCashChanged();
   },
   
   onCashChanged: function(cash, amount) {
   		if (!this._amountLabel) {
   			this._amountLabel = this.down('label[cls = "atm-tienmat-amount"]');
   		}
   		
   		this._amountLabel.setHtml(AppUtil.getCashFormat());
   }
});

