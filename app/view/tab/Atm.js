Ext.define('MyApp.view.tab.Atm', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_atm',
    requires: [
		'MyApp.view.tab.atm.Atm',
		'MyApp.view.tab.atm.Saving'
	],
    config: {      
    	title:'ATM',
		scrollable:true,
		iconCls:'tabbar-icon-home',	
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
								xtype: 'label',
								html:'100.000 (đ)',
								cls:'atm-tienmat-amount'
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
   },
   
   initialize: function() {
   		this.callParent(arguments);
   }
});

