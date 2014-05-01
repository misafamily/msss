Ext.define('MyApp.view.tab.atm.Insurance', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_insurance',
    requires: [
    	'MyApp.view.tab.atm.InsuranceList'		     
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
						src: 'resources/images/coloricons/insurance-icon.png',					
						cls:'atm-title-item-icon'
					},
					{
						xtype: 'label',
						html:'Bảo hiểm',
						cls:'atm-title-item'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',								
						title: 'insuranceadd',
						cls: 'button-icon',
						iconCls: 'button-icon-addnew'
						//iconCls: 'add2'
					}
				]
			},
			{
				xtype:'tab_atm_insurancelist',
				scrollable: false,
			}
		]
    }
 });   