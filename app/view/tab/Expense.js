Ext.define('MyApp.view.tab.Expense', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_expense',
    requires: [
		
	],
    config: {      
		scrollable:true,
		iconCls:'tabbar-icon-home',
		navigationBar:{
			 backButton: {
	            iconCls: 'app-nav-back-icon',
	            ui: 'plain'
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		{
					iconCls:'toolbar-icon-menu',
					align: 'left',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    }
				},
				{
					iconCls:'toolbar-icon-add',
					align: 'right',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    },
					title: 'toolbar_tabexpense_add_button'
				}
			]
       },
		items:[
			{
				xtype:'container',
				title: 'Chi tiêu',
				items:[
					{
						xtype:'container',
						layout:'vbox',
						items:[
							{
								xtype: 'label',
								html:'Hôm nay, 17 - 09 - 2014',
								cls:'today-title'
							}
						]
					}
				]
			}
		]			
   },
   
   initialize: function() {
   		this.callParent(arguments);
   }
});

