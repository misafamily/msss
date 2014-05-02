Ext.define('MyApp.view.tab.atm.CashDetail', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_cashdetail',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết',
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
			                    clearIcon: false
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
			                        xtype: 'textfield',
			                        name: 'amount',
			                        //placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount'
			                        //label: 'Số tiền hiện có  '
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
												'<div class="shoppingicon {buyingtype}"></div>',
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
					       	)
						}
					]
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
	},
	
	/*hide: function() {
		var recentHisStore = me._list.getStore();
		if (recentHisStore) {
			recentHisStore.removeAll();
		}
	},*/
	
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
	editAtm: function(name, bank, amount) {		
		var me = this;
		
		me._nameTF.setValue(name);
		me._bankTF.setValue(bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
		
		var atmModel = me.getAtmModel();
		
		var now = new Date();
		
		if (atmModel.data.username != name || atmModel.data.bank != bank || atmModel.data.amount != amount) {
			
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Cập nhật thông tin thẻ ATM',
					type: AppUtil.TYPE_ATM_SUA_THONG_TIN,
					amount: amount,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
			});				
			//if (atmModel.data.amount != amount) {
				atmHis.save();	
			//}			
			
			
			atmModel.data.username = name;
			atmModel.data.bank = bank;
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			
			
			atmModel.save(function(){
				//var f = me.getCallbackFunc();
				//f();
				me.updateRecentStore();
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_SUCCESS_EDIT);			
			});
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_FAILED_EDIT);
		}
		
	},
	
	deleteAtm: function() {
		var me = this;
		//var amount = me._amountTF.getValue();
		var atmModel = me.getAtmModel();
		var now = new Date();
		atmModel.data.status = AppUtil.STATUS_CLOSED;
		atmModel.save(function(){
	
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Đóng tài khoản ATM',
					type: AppUtil.TYPE_ATM_DONG,
					amount: 0,
					moneycard:atmModel.data.amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				var f = me.getCallbackFunc();
				f();
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ATM_DELETE, AppUtil.MESSAGE_SUCCESS_DELETE);
			}
		);
	},
	resetView: function(){
		var me = this;
		//me._nameTF.setValue('');
		//me._bankTF.setValue('');
		me._amountTF.setValue(AppUtil.getCashFormat());
		me.updateRecentStore();
	},
	
	assignFields: function() {
		var me = this;
		if (!me._amountTF) {
			me._amountTF = me.down('textfield[name = "amount"]');
		}
		if (!me._list) {
			me._list = me.down('list');
		}
	}
 });   