Ext.define('MyApp.view.tab.atm.CashDetail', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_cashdetail',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Tiền mặt',
		scrollable: {
			direction: 'vertical'
		},
		cls:'atm-form-container',
		items:[
			{
				xtype:'container',
				layout: {
					type:'vbox'
				},
				flex: 1,
				items:[
						{
			                xtype: 'container',
			                //title: 'Thông tin tài khoản:',
			                //instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
			                defaults: {
			                    //required: true,
			                    //autoComplete: false,
			                    //autoCorrect: false
			                    readOnly: true,
			                    clearIcon: true
			                },
			                items: [
			                    {
			                		xtype: 'label',
			                		html: 'Tiền mặt hiện có',
			                		style: {
										'margin-left': '15px',
										'margin-bottom': '5px'
									}	
			                	},
			                     {
			                        xtype: 'numberfield',
			                        name: 'amount',
			                        //placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount',
			                        readOnly: false,
			                        hidden: true
			                        //label: 'Số tiền hiện có  '
			                    },
			                    {
			                        xtype: 'textfield',
			                        name: 'amounttf',
			                        placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount'
			                    }
			                ]    
			          },
						{
							xtype: 'container',
							style: {
								'margin-left': '10px',
								'margin-top': '10px'
							},
							layout: {
								type: 'hbox',
								pack: 'center',
								align:'center'
							},
							items: [
								{
									xtype: 'label',
									html: 'THU CHI GẦN NHẤT',
									flex: 1
								},
								
								{
									xtype: 'button',
									text: 'Xem hết',
									cls:'button-submit small',
									
									title: 'cashdetailhistorybutton'
								}
							]
						},
						{
							xclass: 'MyApp.view.component.AppList',
							store: 'Cashs_Recent',
							cls: 'atm-atmlist',
							scrollable: false,
							itemTpl: new Ext.XTemplate(
					       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
										['<div class="info">',
											'<div class="usernameinfo">',
												'<div class="dateicon"></div>',
												'<div class="username">{time:this.formatDateTime}</div>',  //Ngân hàng: 
											'</div>',	
											'<div class="usernameinfo">',
												'<div class="shoppingicon {source}"></div>',
												'<div class="username">{buyingwhat}</div>', //Tên: 
											'</div>',
											'<div class="usernameinfo">',
												'<div class="amounticon cash {type}"></div>',
												'<div class="username {type}">{amount:this.format}</div>', //Tên: 
											'</div>',		
										'</div>'
										].join(''),
										{
											formatDateTime:function(time) {
												return AppUtil.formatDateTime(new Date(time));
											},
											format: function(amount) {
												return AppUtil.formatMoneyWithUnit(amount);
											}	
										}
					       ),
					       onItemDisclosure: true
						}
					]
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
		
		MyApp.app.on('cash_changed', me.resetView, me);
		MyApp.app.on('chi_changed', me.resetView, me);
	},
	
	editCash: function() {
		var me = this;
		var amount = me._amountTF.getValue();
	
		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return -1;
		}

		amount = parseInt(amount);
		var prevAmount = AppUtil.CASH;
		if (amount != prevAmount) {
			AppUtil.cashEdit(amount);
			return 1;
		} else return 0;
		
		
	},
	
	updateRecentStore: function() {
		var me = this;
		var recentHisStore = me._list.getStore();
		if (recentHisStore) {
			recentHisStore.removeAll();
			AppUtil.offline.updateStoreQuery(recentHisStore, 'Cashs_Recent');
			recentHisStore.load(function(records) {
				//AppUtil.log(records);
				me._list.setHeight(142*records.length);
			});
		}
	},
	//call from Controller
	
	enterEditMode: function() {
		var me = this;
		me._amountTF.show();
		me._amountEditTF.hide();
	},
	
	exitEditMode: function() {
		var me = this;
		me._amountTF.hide();
		me._amountEditTF.show();
	},
	
	resetView: function(){
		var me = this;
		me.exitEditMode();
		//me._nameTF.setValue('');
		//me._bankTF.setValue('');
		me._amountTF.setValue(AppUtil.CASH);
		me._amountEditTF.setValue(AppUtil.getCashFormat());
		me.updateRecentStore();
	},
	
	assignFields: function() {
		var me = this;
		if (!me._amountTF) {
			me._amountTF = me.down('numberfield[name = "amount"]');
		}
		if (!me._amountEditTF) {
			me._amountEditTF = me.down('textfield[name = "amounttf"]');
		}
		if (!me._list) {
			me._list = me.down('list');
		}
	}
 });   