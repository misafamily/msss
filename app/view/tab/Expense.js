Ext.define('MyApp.view.tab.Expense', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_expense',
    requires: [
		'MyApp.view.tab.expense.Day'
	],
    config: {      
    	title: 'Chi tiêu',
		//scrollable:true,
		flex: 1,
		iconCls:'tabbar-icon-shopping',
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
				title: 'Quản lý chi tiêu',
				cls: 'atm-container',
				items:[
					{
						xtype: 'segmentedbutton',
						defaults: {
							xtype:'button',
							flex: 1
						},
						items: [
							{
								text: 'Ngày',
								pressed: true,									
							},
							{
								text: 'Tuần'
							},
							{
								text: 'Tháng'
							}
						],
						style: {
							//'margin-bottom': '1px'
						}
					},
					{
						xtype: 'container',
						layout: {
							//type: 'card'
						},
						flex: 1,
						items:[
							{
								xtype: 'tab_expense_day'
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

