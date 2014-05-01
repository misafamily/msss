Ext.define('MyApp.view.tab.atm.Fund', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_fund',
    requires: [
    	//'MyApp.view.tab.atm.AtmList'		     
    ],
    config: {
    	cls: 'atm-segment-item-container',
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
						xtype: 'image',			
						src: 'resources/images/coloricons/piggy-bank-icon.png',					
						cls:'atm-title-item-icon'
					},
					{
						xtype: 'label',
						html:'Quỹ',
						cls:'atm-title-item'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',								
						title: 'fundadd',
						cls: 'button-icon',
						iconCls: 'button-icon-addnew'
						//iconCls: 'add2'
					}
				]
			},
			/*{
				xtype:'tab_atm_atmlist',
				scrollable: false,
			}*/
		]
    }
 });   