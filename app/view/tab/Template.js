Ext.define('MyApp.view.tab.Home', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_home',
    requires: [
		
	],
    config: {      
		scrollable:true,
		html: 'This is Home view'			
   },
   
   initialize: function() {
   		this.callParent(arguments);
   }
});
