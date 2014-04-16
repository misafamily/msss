Ext.define('MyApp.view.App', {
    extend: 'Ext.Container',
    xtype: 'app',
    requires: [
    	//'MyApp.view.AppLogin',	
    	'MyApp.view.AppMain'	     
    ],
    config: {
        layout:{
			type:'card',
			animation:{type:'fade'}
		},
		items:[
			{
				xtype:'appmain'
			}
		]
    }
 });   