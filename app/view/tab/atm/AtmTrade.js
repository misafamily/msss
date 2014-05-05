Ext.define('MyApp.view.tab.atm.AtmTrade', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_atmtrade',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Giao dịch',
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
			                    autoComplete: false,
			                    autoCorrect: false,
			                    //readOnly: true,
			                    clearIcon: false
			                },
			                items: [
			                	{
			                		xtype: 'label',
			                		html: 'Giao dịch',
			                		style: {
										'margin-left': '15px',
										'margin-bottom': '5px'
									}
			                	},
			                	 {
			                        xtype: 'textfield',
			                        name: 'tradedate',
			                        //label: 'Ngân hàng ',
			                        cls:'savingadd-createddate',
			                        //placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
			                        autoCapitalize: false,
			                        clearIcon:false
			                  },
			                    {
			                        xtype: 'selectfield',
			                        name: 'tradetype',
			                        //label: 'Ngân hàng ',
			                        cls:'savingadd-period',
			     
				                    options: [			
				                    	{text: 'Rút tiền',  value: 'rut_tien'},																		
				                    	{text: 'Nhận tiền chuyển khoản (lương)',  value: 'nhan_luong'},											
										{text: 'Chuyển khoản, mua sắm qua thẻ',  value: 'chuyen_khoan'},
										{text: 'Nạp tiền',  value: 'nap_tien'}
									]
			                    },
			                     
			                     {
			                        xtype: 'numberfield',
			                        name: 'amounttrade',
			                        placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount'
			                        //label: 'Số tiền hiện có  '
			                    }
			                ]    
			           },
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
			                		html: 'Thông tin thẻ',
			                		style: {
										'margin-left': '15px',
										'margin-bottom': '5px'
									}	
			                	},
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
			                        xtype: 'textfield',
			                        name: 'amount',
			                        //placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount'
			                        //label: 'Số tiền hiện có  '
			                    }
			                ]    
			           }
						/*,
			          
			           {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[					
								{
									xtype: 'button',
									text: 'Đồng ý',
									cls:'button-submit',
									flex: 1,
									title: 'atmtradesubmitbutton'
								},
								{
									xtype: 'button',
									text: 'Hủy',
									cls:'button-cancel',
									flex: 1,
									title: 'atmtradecancelbutton'
								}
							]	
						}*/
						
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
	
	updateAtmModel2: function() {
		var me = this;
		if (!me.getAtmModel()) return;
		
		me._nameTF.setValue(me.getAtmModel().data.username);
		me._bankTF.setValue(me.getAtmModel().data.bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(me.getAtmModel().data.amount));
		
		//me.resetView();
		//me.updateRecentStore();
		
	},
	
	doTrade: function() {
		var me = this;
		var type = me._tradeTypeTF.getValue();
		var m = me._tradeAmountTF.getValue(); 
		//AppUtil.log('amount: ' + m);
		switch (type) {
			case AppUtil.TYPE_ATM_NAP_TIEN:
				return me.pushInMoney(m);
				break;
			case AppUtil.TYPE_ATM_RUT_TIEN:
				return me.pushOutMoney(m);
				break;
			case AppUtil.TYPE_ATM_NHAN_LUONG:
				return me.checkInMoney(m);
				break;
			case AppUtil.TYPE_ATM_CHUYEN_KHOAN:
				return me.checkOutMoney(m);
				break;
		}
		return false;
	},
	
	pushInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = parseInt(me.getAtmModel().data.amount);//me._amountTF.getValue();
		
		if (!AppUtil.canGetCash(m)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHIN,AppUtil.getCashFormat()));
			return false;
		}
		
		amount += m;		
		var now = me._selectedDate;
		var atmModel = me.getAtmModel();
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		
		var hisId = 'history_' + Ext.Date.now();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashMinus(m);
			//AppUtil.saveExpenseModel('nap_tien', m, atmModel.data.atm_id, 'Tiền nạp', 'tien_mat', atmModel.data.bank + '-' + atmModel.data.username, now  );
			AppUtil.saveExpenseModel('nap', m, hisId, 'Nạp tiền', 'tien_mat', atmModel.data.atm_id , now, 
								'ATM ' +  atmModel.data.username.toUpperCase() + ', ngân hàng ' +  atmModel.data.bank.toUpperCase(), 'atm'  );
			
			//
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
				atm_id: atmModel.data.atm_id,
				history_id: hisId,
				description: me._tradeTypeTF._value.data.text,//'Nạp tiền',
				type: AppUtil.TYPE_ATM_NAP_TIEN,
				amount: m,
				moneycard:amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			//var f = me.getCallbackFunc();
				//f();
			//me.updateRecentStore();
			//me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHIN, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
		});
		return true;
	},
	
	pushOutMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = parseInt(me.getAtmModel().data.amount);//me._amountTF.getValue();
		var now = me._selectedDate;
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = me.getAtmModel();
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			var hisId = 'history_' + Ext.Date.now();
			atmModel.save(function(){
				//plus cash
				AppUtil.cashPlus(m);
				//AppUtil.saveExpenseModel('rut_tien', m, atmModel.data.atm_id, 'Tiền rút', 'tien_mat', atmModel.data.bank + '-' + atmModel.data.username, now  );
				AppUtil.saveExpenseModel('rut', m, hisId, me._tradeTypeTF._value.data.text, 'tien_mat', 
								atmModel.data.atm_id, now, 
								'ATM ' +  atmModel.data.username.toUpperCase() + ', ngân hàng ' +  atmModel.data.bank.toUpperCase(), 'atm');
				
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					history_id: hisId,
					description: me._tradeTypeTF._value.data.text,//'Rút tiền',
					type: AppUtil.TYPE_ATM_RUT_TIEN,
					amount: m,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				//var f = me.getCallbackFunc();
				//f();
				//me.updateRecentStore();
				//me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
				//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHOUT, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
			});	
			return true;
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHOUT,AppUtil.formatMoneyWithUnit(amount + m)));
			
		}
		return false;
		
	},
	
	checkInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = parseInt(me.getAtmModel().data.amount);//me._amountTF.getValue();
		amount += m;		
		var now = me._selectedDate;
		var atmModel = me.getAtmModel();
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		var hisId = 'history_' + Ext.Date.now();
		atmModel.save(function(){
			
			AppUtil.saveExpenseModel('thu', m, hisId, 'Nhận tiền chuyển khoản', 'atm', atmModel.data.atm_id, now, 
								'ATM ' +  atmModel.data.username.toUpperCase() + ', ngân hàng ' +  atmModel.data.bank.toUpperCase() , 'atm' );
			
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
				atm_id: atmModel.data.atm_id,
				history_id: hisId,
				description: me._tradeTypeTF._value.data.text,//'Nhận tiền chuyển khoản, lương',
				type: AppUtil.TYPE_ATM_NHAN_LUONG,
				amount: m,
				moneycard:amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			//var f = me.getCallbackFunc();
			//f();
			//me.updateRecentStore();
			//me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKIN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_CHECKIN, AppUtil.formatMoneyWithUnit(m)));			
		});
		return true;
	},
	
	checkOutMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = parseInt(me.getAtmModel().data.amount);//me._amountTF.getValue();
		var now = me._selectedDate;
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = me.getAtmModel();
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			var hisId = 'history_' + Ext.Date.now();
			atmModel.save(function(){
				
				AppUtil.saveExpenseModel('chi', m, hisId, 'Chuyển khoản, mua sắm bằng thẻ', 'atm', atmModel.data.atm_id, now, 
								'ATM ' +  atmModel.data.username.toUpperCase() + ', ngân hàng ' +  atmModel.data.bank.toUpperCase(), 'atm' );
				
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					history_id: hisId,
					description: me._tradeTypeTF._value.data.text,//'Chuyển khoản, mua sắm bằng thẻ',
					type: AppUtil.TYPE_ATM_CHUYEN_KHOAN,
					amount: m,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				//var f = me.getCallbackFunc();
				//f();
				//me.updateRecentStore();
				//me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
				//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_CHECKOUT, AppUtil.formatMoneyWithUnit(m)));			
			});	
			return true;
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKOUT, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_CHECKOUT,AppUtil.formatMoneyWithUnit(amount + m)));
			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_CHECKOUT, AppUtil.MESSAGE_FAILED_CHECKOUT);
		}
		return false;
	},
	
	resetView: function(){
		var me = this;
		//me._nameTF.setValue('');
		//me._bankTF.setValue('');
		//me._amountTF.reset();
		me._tradeTypeTF.setValue('rut_tien');
		me._tradeAmountTF.reset();
		me.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {	
		var me = this;	
		me._selectedDate = new Date(date.getTime());
		//if (!this._selectedDate) this._selectedDate = new Date();
		//this._selectedDate.setDate(date.getDate());
		//this._selectedDate.setMonth(date.getMonth());
		//this._selectedDate.setFullYear(date.getFullYear());
		me._tradeDateTF.setValue(date.shortDateFormat());
	},
	
	getSelectedDate: function() {
		return this._selectedDate;
	},
	
	assignFields: function() {
		var me = this;
		if (!me._nameTF) {
			me._nameTF = me.down('textfield[name = "name"]');
		}
		if (!me._bankTF) {
			me._bankTF = me.down('textfield[name = "bank"]');
		}
		if (!me._amountTF) {
			me._amountTF = me.down('textfield[name = "amount"]');
		}
		if (!me._tradeTypeTF) {
			me._tradeTypeTF = me.down('selectfield[name = "tradetype"]');
		}
		if (!me._tradeAmountTF) {
			me._tradeAmountTF = me.down('numberfield[name = "amounttrade"]');
		}
		if (!me._tradeDateTF) {
			me._tradeDateTF = me.down('textfield[name = "tradedate"]');
		}
	}
 });   