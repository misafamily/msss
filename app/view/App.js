Ext.define('MyApp.view.App', {
    extend: 'Ext.Container',
    xtype: 'app',
    requires: [
    	//'MyApp.view.AppLogin',	
    	'MyApp.view.AppTab'	     
    ],
    config: {
        layout:{
			type:'card',
			animation:{type:'fade'}
		},
		items:[
			{
				xtype:'apptab'
			}/*,
			{
				xtype: 'tab_menu_about'
			},
			{
				xtype: 'tab_menu_settings'
			},
			{
				xtype: 'tab_menu_terms'
			}*/
		]
    }
 });   