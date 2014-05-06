Ext.define('MyApp.view.tab.Expense', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_expense',
    requires: [
		'MyApp.view.tab.expense.Day',
		'MyApp.view.tab.expense.Week',
		'MyApp.view.tab.expense.Month'
	],
    config: {      
    	title: 'Thu chi',
		//scrollable:true,
		flex: 1,
		iconCls:'tabbar-icon-shopping',
		navigationBar:{
			 backButton: {
	            iconCls: 'back',
	            //ui: 'plain',
	            style: {
	            	'margin-left': '10px'
	            }
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		{
					iconCls:'toolbar-icon-menu',
					align: 'left',
					hideAnimation:null,
                    showAnimation:null,
                    title: 'toolbar_tabexpense_menu_button'
				},
				{
					iconCls:'toolbar-icon-add',
					align: 'right',
					hideAnimation:null,
                    showAnimation:null,
					title: 'toolbar_tabexpense_add_button'
				},
				{
					iconCls:'toolbar-icon-done',
					style: {
						'padding-right': '8px',
						'padding-left': '0px'
					},
					align: 'right',
					hideAnimation:null,
                    showAnimation:null,
                    title: 'done',
                    hidden: true
				}
			]
       },
		items:[
			{
				xtype:'container',
				title: 'Quản lý thu chi',
				cls: 'atm-container',
				height: '100%',
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
								viewIndex: 0							
							},
							{
								text: 'Tuần',		
								viewIndex: 1
							},
							{
								text: 'Tháng',		
								viewIndex: 2
							}
						],
						style: {
							//'margin-bottom': '1px'
						}
					},
					{
						xtype: 'container',
						cls: 'segment-container',
						layout: {
							type: 'card'
						},
						height: '90%',
						items:[
							{
								xtype: 'tab_expense_day'
							},
							{
								xtype: 'tab_expense_week'
							},
							{
								xtype: 'tab_expense_month'
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

