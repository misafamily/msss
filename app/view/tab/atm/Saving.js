Ext.define('MyApp.view.tab.atm.Saving', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_saving',
    requires: [
    	'MyApp.view.tab.atm.SavingList'		     
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
						src: 'resources/images/coloricons/dollar-folder-icon.png',					
						cls:'atm-title-item-icon'
					},
					{
						xtype: 'label',
						html:'Sổ tiết kiệm',
						cls:'atm-title-item'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',								
						title: 'savingadd',
						cls: 'button-icon',
						iconCls: 'button-icon-addnew'
					}
				]
			},
			{
				xtype:'tab_atm_savinglist',
				scrollable: false
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		//this.assignFields(true, true);
	}
 });   