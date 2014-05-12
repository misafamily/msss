Ext.define('MyApp.view.tab.Home', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_home',
    requires: [
		'MyApp.view.tab.home.HomeChart'
	],
    config: {      
		//scrollable:true,
		iconCls:'tabbar-icon-home',//tabbar-icon-home
		title: 'Trang chủ',
		items:[
			{
				xtype:'container',
				title: 'Trang chủ',
				flex: 1,
				layout: {
					type: 'vbox'
				},
				style: {
					'background-color': '#e3e3e3'
				},
				items:[
					{
						xtype:'container',
						flex: 1,
						scrollable: true,
						layout: {
							type: 'vbox'
						},
						style: {
							'margin': '5px',
							'margin-bottom': '0px'
						},
						items:[
							{
								xtype: 'label',
								html: 'Tháng 5, 2014',
								style: {
									'margin-bottom': '10px',
									'color': '#000',
									'font-size': '18px'
								}
							},
							{
								xtype: 'tab_home_homechart',
								style: {
									'background-color': '#fff'
								},
								flex:1,
								minHeight: 220
							},{
								xtype: 'container',
								style: {
									'background-color': '#fff',
									'margin-top': '10px'
								},
								html: '<div id="home_tong"><div id="home_tongthu"></div><div id="home_tongchi"></div>',
								height: 30
							},{
								xtype: 'container',
								style: {
									'background-color': '#fff'
								},
								layout: 'hbox',
								items:[
									{
										xtype: 'label',
										title:'chilbl',
										html: '',
										style: {
											'margin': '5px',
											'color': '#cd4447'
										}
									},
									{
										xtype: 'spacer'
									},
									{
										xtype: 'label',
										title:'sodulbl',
										html: '',
										style: {
											'margin': '5px',
											'color': '#007f63'
										}
									},
									{
										xtype: 'spacer'
									},
									{
										xtype: 'label',
										title:'thulbl',
										html: '',
										style: {
											'margin': '5px',
											'color': '#4f834f'
										}
									}
								],
								height: 30
							}
						]
					}, {
						xtype:'container',
						layout: {
							type: 'hbox',
							align: 'center',
							pack: 'center'
						},
						cls: 'container-with-bottom-bar',
						items:[{
							xtype:'button',
							title: 'homeaddbutton',
							cls: 'button-icon button-home-add'
						}]
					}
				]
			}
		]			
   },
   
   initialize: function() {
   		var me = this;
   		me.callParent(arguments);
   		
   		MyApp.app.on('expense_changed', me.onExpenseChanged, me);
   		MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
	},
	onThuChiChanged: function(thu, chi) {
		var me = this;
		if (!me._thuLbl) me._thuLbl = me.down('label[title="thulbl"]');
		if (!me._chiLbl) me._chiLbl = me.down('label[title="chilbl"]');
		if (!me._soduLbl) me._soduLbl = me.down('label[title="sodulbl"]');
		if (!me._chiDiv) me._chiDiv = Ext.get('home_tongchi');
		
		me._thuLbl.setHtml('(+) ' + AppUtil.formatShortMoney(thu));
		me._chiLbl.setHtml('(-) ' +AppUtil.formatShortMoney(chi));
		me._soduLbl.setHtml('(=) ' + AppUtil.formatShortMoney(thu - chi));
		
		if (thu == 0) thu = 1;
		var percent = Math.round(chi*100/thu);
		me._chiDiv.setWidth(percent + '%');
		
	},
	onExpenseChanged: function(date) {
		var me = this;
		if (date.sameMonthWith(new Date()))
			me.showHomeChart();
	},

   showHomeChart: function() {
   		var me = this;
   		if (!me._homeChart) me._homeChart = me.down('tab_home_homechart');
   		me._homeChart.showChart();
   }
});