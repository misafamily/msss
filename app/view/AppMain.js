Ext.define('MyApp.view.AppMain', {
    extend: 'Ext.Container',
    xtype: 'appmain',
    requires: [
    	'MyApp.view.AppTab',
		//'MyApp.view.tab.menu.About',
		//'MyApp.view.tab.menu.Settings',
		//'MyApp.view.tab.menu.Terms'	     
    ],
    config: {
        layout:{
			type:'card'
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