Ext.define('MyApp.view.tab.atm.AtmDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmdetail',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết tài khoản',
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
			                    required: true,
			                    autoComplete: false,
			                    autoCorrect: false
			                },
			                items: [
			                    {
			                        xtype: 'textfield',
			                        name: 'name',
			                        //label: 'Tên tài khoản ',
			                        cls:'atmadd-accountname',
			                        //placeHolder:'Tên chủ thẻ (vd: NGUYEN VAN A)',
			                        autoCapitalize: false
			                    },
			                     {
			                        xtype: 'textfield',
			                        name: 'bank',
			                        //label: 'Ngân hàng ',
			                        cls:'atmadd-bank',
			                        //placeHolder:'Ngân hàng (vd: VCB, HSBC, ACB ...)',
			                        autoCapitalize: false
			                    },
			                     {
			                        xtype: 'numberfield',
			                        name: 'amount',
			                        //placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount',
			                        //label: 'Số tiền hiện có  '
			                    },
			                ]    
			           },
			          
			           {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[					
								{
									xtype: 'button',
									text: 'Chuyển tiền',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailpushinbutton'
								},
								{
									xtype: 'button',
									text: 'Rút tiền',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailpushoutbutton'
								}
							]	
						},
						 {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[					
								{
									xtype: 'button',
									text: 'Nhận c.khoản',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailsalarybutton'
								},
								{
									xtype: 'button',
									text: 'Chuyển khoản',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailtransferbutton'
								}
							]	
						},
						  {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[				
								
								{
									xtype: 'button',
									text: 'Sửa thông tin',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetaileditbutton'
								},
								{
									xtype: 'button',
									text: 'Xóa t.khoản',
									cls:'button-delete',
									flex: 1,
									title: 'atmdetaildeletebutton'
								}
							]	
						},
						{
							xtype: 'container',
							style: {
								'margin-left': '10px',
								'margin-top': '10px',
							},
							layout: {
								type: 'hbox',
								pack: 'center',
								align:'center'
							},
							items: [
								{
									xtype: 'label',
									html: 'GIAO DỊCH GẦN NHẤT',
									flex: 1,
								},
								
								{
									xtype: 'button',
									text: 'Xem hết',
									cls:'button-submit small',
									
									title: 'atmdetailhistorybutton'
								}
							]
						},
						{
							xclass: 'MyApp.view.component.AppList',
							store: 'AtmHistories_Recent',
							cls: 'atm-atmhistory',
							scrollable: false,
							itemTpl: new Ext.XTemplate(
					       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
										['<div class="info">',
											'<div class="dateinfo">',
												'<div class="dateicon"></div>',
												'<div class="datetime">{time:this.formatDateTime}</div>', //Tên: 
											'</div>',	
											'<div class="actioninfo">',
												'<div class="actionicon {type}"></div>',
												'<div class="description">{description}</div>',  //Ngân hàng: 
											'</div>',	
										'</div>',
										'<div class="amountinfo">',
											'<div class="amounticon"></div>',
											'<div class="amount">{amount:this.format}</div>',
										'</div>',		
										'<div class="moneycardinfo">',
											'<div class="moneycardicon"></div>',
											'<div class="moneycard">{moneycard:this.format}</div>',
										'</div>',			
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
		this.callParent(arguments);
		this.assignFields();
	},
	
	updateAtmModel: function() {
		
		this._nameTF.setValue(this.getAtmModel().data.username);
		this._bankTF.setValue(this.getAtmModel().data.bank);
		this._amountTF.setValue(this.getAtmModel().data.amount);
		
		this.updateRecentStore();
		
	},
	
	updateRecentStore: function() {
		var me = this;
		var recentHisStore = this._list.getStore();
		if (!recentHisStore) recentHisStore = Ext.create('AtmHistories_Recent', {atm_id: this.getAtmModel().data.atm_id});
		if (recentHisStore) {
			recentHisStore.removeAll();
			AppUtil.offline.updateStoreQuery(recentHisStore, 'AtmHistories_Recent', {atm_id: this.getAtmModel().data.atm_id});
			recentHisStore.load(function(records) {
				//console.log('recentHisStore lenght: ', records.length)
				me._list.setHeight(142*records.length);
			});
		}
	},
	//call from Controller
	editAtm: function() {		
		var me = this;
		var name = this._nameTF.getValue();
		var bank = this._bankTF.getValue();
		var amount = this._amountTF.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		
		
		if (!name || !bank) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_NOT_FILLED_INPUT);
			return false;
		}
		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		name = name.trim();
		bank = bank.trim();
		amount = amount.toString().trim().split('.').join('');
		amount = parseInt(amount).toString();
		this._amountTF.setValue(amount);
		
		var atmModel = this.getAtmModel();
		var now = new Date();
		
		if (atmModel.data.username != name || atmModel.data.bank != bank || atmModel.data.amount != amount) {
			
			if (atmModel.data.amount != amount) {
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Cập nhật tài khoản',
					type: AppUtil.TYPE_ATM_SUA_THONG_TIN,
					amount: amount,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				
				atmHis.save();
			}
			
			atmModel.data.username = name;
			atmModel.data.bank = bank;
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			
			
			atmModel.save(function(){
				var f = me.getCallbackFunc();
				f();
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_SUCCESS_EDIT);			
			});
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_FAILED_EDIT);
		}
		
	},
	
	pushInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = this._amountTF.getValue();
		
		if (!AppUtil.canGetCash(m)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, AppUtil.MESSAGE_FAILED_PUSHIN);
			return;
		}
		
		amount += m;		
		var now = new Date();
		var atmModel = this.getAtmModel();
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashMinus(m);
			//
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
				atm_id: atmModel.data.atm_id,
				description: 'Chuyển tiền mặt vào tài khoản',
				type: AppUtil.TYPE_ATM_CHUYEN_TIEN,
				amount: m,
				moneycard:amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			var f = me.getCallbackFunc();
				f();
			me._amountTF.setValue(amount);
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHIN, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
		});
	},
	
	pushOutMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = this._amountTF.getValue();
		var now = new Date();
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = this.getAtmModel();
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			atmModel.save(function(){
				//plus cash
				AppUtil.cashPlus(m);
				
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Rút tiền',
					type: AppUtil.TYPE_ATM_RUT_TIEN,
					amount: m,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				var f = me.getCallbackFunc();
				f();
				me._amountTF.setValue(amount);
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHOUT, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
			});	
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, AppUtil.MESSAGE_FAILED_PUSHOUT);
		}
		
	},
	
	checkInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = this._amountTF.getValue();
		amount += m;		
		var now = new Date();
		var atmModel = this.getAtmModel();
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		
		atmModel.save(function(){
	
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
				atm_id: atmModel.data.atm_id,
				description: 'Nhận tiền chuyển khoản (lương)',
				type: AppUtil.TYPE_ATM_NHAN_LUONG,
				amount: m,
				moneycard:amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			var f = me.getCallbackFunc();
			f();
			me._amountTF.setValue(amount);
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKIN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_CHECKIN, AppUtil.formatMoneyWithUnit(m)));			
		});
	},
	
	checkOutMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = this._amountTF.getValue();
		var now = new Date();
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = this.getAtmModel();
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			atmModel.save(function(){
	
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Chuyển khoản cho người khác',
					type: AppUtil.TYPE_ATM_CHUYEN_KHOAN,
					amount: m,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				var f = me.getCallbackFunc();
				f();
				me._amountTF.setValue(amount);
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_CHECKOUT, AppUtil.formatMoneyWithUnit(m)));			
			});	
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKOUT, AppUtil.MESSAGE_FAILED_CHECKOUT);
		}
		
	},
	
	deleteAtm: function() {
		var me = this;
		var amount = this._amountTF.getValue();
		var atmModel = this.getAtmModel();
		var now = new Date();
		atmModel.data.status = AppUtil.STATUS_DELETED;
		atmModel.save(function(){
	
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Xóa tài khoản',
					type: AppUtil.TYPE_ATM_XOA,
					amount: 0,
					moneycard:amount,
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
		this._nameTF.setValue('');
		this._bankTF.setValue('');
		this._amountTF.setValue('');
	},
	
	assignFields: function() {
		if (!this._nameTF) {
			this._nameTF = this.down('textfield[name = "name"]');
		}
		if (!this._bankTF) {
			this._bankTF = this.down('textfield[name = "bank"]');
		}
		if (!this._amountTF) {
			this._amountTF = this.down('numberfield[name = "amount"]');
		}
		if (!this._list) {
			this._list = this.down('list');
		}
	}
 });   