Ext.define('MyApp.view.tab.Atm', {
    extend: 'MyApp.view.component.NavigationViewBase',
    xtype: 'tab_atm',
    requires: [
		'MyApp.view.tab.atm.Atm',
		'MyApp.view.tab.atm.Saving',
		'MyApp.view.tab.atm.Insurance',
		'MyApp.view.tab.atm.Fund',
		'MyApp.view.tab.atm.LendBook',
		'MyApp.view.tab.atm.PaidBook'
	],
    config: {      
    	title:'Két sắt',		
		iconCls:'tabbar-icon-ketsat',	
		items:[
			{			
				title:'Quản lý két sắt',
				xtype: 'container',
				scrollable:{
					direction: 'vertical'
				},
				cls: 'atm-container',
				flex: 1,
				items:[
					{
						xtype:'container',
						title: 'ATM',	
						flex: 1,			
						items:[
							{
								xtype:'container',
								cls: 'atm-cash-container',
								items:[
									{
										xtype:'container',
										layout: {
											type: 'hbox',
											align: 'center',
											pack: 'center'
										},
										cls:'atm-title-container cash',
										
										items:[
											{
												xtype: 'image',			
												src: 'resources/images/coloricons/money-wallet-icon.png',					
												cls:'atm-title-item-icon'
											},
											{
												xtype: 'label',
												html:'Tiền mặt',
												cls:'atm-title-item'
											},
											{
												xtype: 'spacer'
											},
																	
											{
												xtype: 'button',								
												title: 'moneyadd',
												cls: 'button-icon',
												iconCls: 'button-icon-addnew'
											}
										]
									},
									{
										xtype:'container',
										layout: {
											type: 'hbox',
											align: 'center'
										},
										style: {
											'height': '40px',
											'margin-left': '20px'
										},							
										items:[
											{
												xtype: 'label',
												html:'Tổng cộng:',
												//cls:'atm-tienmat-amount'
											},	
											{
												xtype: 'label',
												html:'100.000 (đ)',
												cls:'atm-tienmat-amount'
											},
											{
												xtype: 'spacer'
											},
											{
												xtype: 'button',
												cls: 'button-icon app-disclosure',
												title: 'moneydetail'
											}
												
										]
										
									},
								]
							},
							
							{
								xtype: 'segmentedbutton',
								defaults: {
									xtype:'button',
									flex: 1
								},
								items: [
									{
										text: 'Thẻ ATM,<br/>Sổ tiết kiệm',
										pressed: true,		
										viewIndex: 0							
									},
									{
										text: 'Bảo hiểm,<br/>Quỹ',		
										viewIndex: 1
									},
									{
										text: 'Sổ cho vay,<br/>Sổ nợ',		
										viewIndex: 2
									}
								],
								style: {
									//'margin-bottom': '1px'
								}
							},
							{
								xtype:'container',
								layout: {
									type:'vbox'
								},		
								cls: 'atm-segment-container',		
								flex: 1,
								items:[
									/*{
										xtype: 'tab_atm_atm'
									},
									{
										xtype: 'tab_atm_saving'
									}*/
								]
							}
							
						]
					}
				]
			}
			
		]			
   },
   
   initialize: function() {
   		var me = this;
   		me.callParent(arguments);
   		MyApp.app.on('cash_changed', me.onCashChanged, me);
   		
   		me.initView();
   },
   
   initView: function() {
   		var me = this;
   		me.onCashChanged();
   		if (!me._segmentContainer) {
   			me._segmentContainer = me.down('container[cls = "atm-segment-container"]');
   		}
   		if (!me._atm) me._atm = Ext.create('MyApp.view.tab.atm.Atm');
   		if (!me._saving) me._saving = Ext.create('MyApp.view.tab.atm.Saving');
   		if (!me._insurance) me._insurance = Ext.create('MyApp.view.tab.atm.Insurance');
   		if (!me._fund) me._fund = Ext.create('MyApp.view.tab.atm.Fund');
   		if (!me._lendbook) me._lendbook = Ext.create('MyApp.view.tab.atm.LendBook');
   		if (!me._paidbook) me._paidbook = Ext.create('MyApp.view.tab.atm.PaidBook');
   		
   		me.showTabAtIndex(0);
   		//me.hideRightButtons();
   },
   
   showTabAtIndex: function(tabIndex) {
   		var me = this;
   		me._segmentContainer.removeAll(false);
   		switch (tabIndex) {
   			case 0:
   				me._segmentContainer.add(me._atm);
   				me._segmentContainer.add(me._saving);
   				break;
   			case 1:
   				me._segmentContainer.add(me._insurance);
   				me._segmentContainer.add(me._fund);
   				break;
   			case 2:
   				me._segmentContainer.add(me._lendbook);
   				me._segmentContainer.add(me._paidbook);
   				break;
   		}
   },
   
   onCashChanged: function(cash, amount) {
   		var me = this;
   		if (!me._amountLabel) {
   			me._amountLabel = me.down('label[cls = "atm-tienmat-amount"]');
   		}
   		
   		me._amountLabel.setHtml(AppUtil.getCashFormat());
   }
});

