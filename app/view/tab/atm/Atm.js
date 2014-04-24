Ext.define('MyApp.view.tab.atm.Atm', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atm',
    requires: [
    	'MyApp.view.tab.atm.AtmList'		     
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
						src: 'resources/images/coloricons/Credit-Card-icon.png',					
						cls:'atm-title-item-icon'
					},
					{
						xtype: 'label',
						html:'Thẻ ATM',
						cls:'atm-title-item'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',								
						title: 'atmadd',
						cls: 'button-icon',
						iconCls: 'button-icon-addnew'
						//iconCls: 'add2'
					}
				]
			},
			{
				xtype:'tab_atm_atmlist',
				scrollable: false,
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		//this.assignFields(true, true);
	}
 });   