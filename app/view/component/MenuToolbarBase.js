Ext.define('MyApp.view.component.MenuToolbarBase',{
	extend: 'Ext.Toolbar',
	xtype:'component_menutoolbarbase',
	
	config: {		
		cls: 'menu-toolbar',
		
		items: [
			{
				xtype: 'button',
				iconCls:'toolbar-icon-menu',
				align: 'left'
			}
		]
	}
});
