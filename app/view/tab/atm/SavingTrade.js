Ext.define('MyApp.view.tab.atm.SavingTrade', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_savingtrade',
    requires: [
    	 
    ],
    config: {
    	savingModel: null,
    	callbackFunc: null,
    	title: 'Giao dịch',
        layout:{
			type:'vbox'
		},
		cls:'atm-form-container',
		scrollable: true,
		items:[
			{
                xtype: 'container',
                //title: 'Thông tin tài khoản:',
                //instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
                defaults: {
                    //required: true,
                    autoComplete: false,
                    autoCorrect: false,
                    readOnly: true
                },
                items: [
                	{
                		xtype: 'label',
                		html: 'Thông tin sổ',
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
                        placeHolder:'Tên chủ sổ (vd: NGUYEN VAN A)',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'textfield',
                        name: 'bank',
                        //label: 'Ngân hàng ',
                        cls:'atmadd-bank',
                        placeHolder:'Ngân hàng (vd: VCB, HSBC, ACB ...)',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'textfield',
                        name: 'amount',
                        placeHolder:'Số tiền gởi (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'textfield',
                        name: 'rate',
                        placeHolder:'Lãi suất (%/năm) (vd: 7)',
                        cls:'savingadd-interestrate'
                        //label: 'Số tiền hiện có  '
                    },
                   
                     {
                        xtype: 'textfield',
                        name: 'created_date',
                        //label: 'Ngân hàng ',
                        readOnly: true,
                        cls:'savingadd-createddate',
                        readOnly: true,
                        //placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
                        autoCapitalize: false,
                        clearIcon:false
                    }
                   
	                
                ]    
          },
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
	                    	{text: 'Lĩnh lãi',  value: 'linh_lai'},
	                    	{text: 'Rút tiền',  value: 'rut_tien'},									
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
						title: 'savingtradesubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'savingtradecancelbutton'
					}
				]	
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		this.assignFields();
	},
	
	updateSavingModel2: function() {
		var me = this;
		if (!me.getSavingModel()) return;		
		
		var m = me.getSavingModel();
		
		me._nameTF.setValue(m.data.username);
		me._bankTF.setValue(m.data.bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(m.data.amount));
		me._rateTF.setValue(AppUtil.formatRateWithUnit(m.data.interest_rate));
		me._dateField.setValue(m.data.created_date);
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
			case AppUtil.TYPE_ATM_LINH_LAI:
				return me.paid(m);
				break;
		}
		return false;
	},
	
	paid: function(money) {
		var me = this;
		if (money == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var now = me._selectedDate;
		var atmModel = me.getSavingModel();
		var lastpaidtime = atmModel.data.last_paid_time;
		
		var lastpaidtimeDate = new Date(lastpaidtime);
		if (lastpaidtime > now.getTime() || lastpaidtimeDate.sameDateWith(now)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_DATE);
			return false;
		}
		//atmModel.data.amount = amount;
		var paidIndex = parseInt(atmModel.data.interest_paid_index) + 1;
		//atmModel.data.time = now.getTime();
		atmModel.data.interest_paid_index = paidIndex.toString();
		atmModel.data.last_paid_time = now.getTime();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashPlus(money);
			
			AppUtil.saveExpenseModel('thu', money, atmModel.data.saving_id, 'Lĩnh lãi', 'tien_mat', atmModel.data.bank + '-' + atmModel.data.username, now );
			//
			var atmHis = Ext.create('MyApp.model.SavingHistory', {
				saving_id: atmModel.data.saving_id,
				description: 'Lĩnh lãi lần ' + paidIndex.toString(),
				type: AppUtil.TYPE_ATM_LINH_LAI,
				amount: money,
				moneycard:atmModel.data.amount,
				time: now.getTime(),
				last_paid_time: lastpaidtime,
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();

			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_LINHLAI, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_LINHLAI, AppUtil.formatMoneyWithUnit(money), AppUtil.getCashFormat()));			
		});
		
		return true;
	},
	
	pushInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		
		if (!AppUtil.canGetCash(m)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHIN,AppUtil.getCashFormat()));
			return false;
		}
				
		var now = me._selectedDate;
		var atmModel = me.getSavingModel();
		var amount = parseInt(atmModel.data.amount);//this._amountTF.getValue();
		amount += m;
		atmModel.data.amount = amount;
		//atmModel.data.time = now.getTime();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashMinus(m);
			AppUtil.saveExpenseModel('nap_tien', m, atmModel.data.saving_id, 'Tiền nạp', 'tien_mat', atmModel.data.bank + '-' + atmModel.data.username, now  );
			AppUtil.saveExpenseModel('nap', m, atmModel.data.saving_id, 'Nạp tiền', 'saving', atmModel.data.bank + '-' + atmModel.data.username, now  );
			
			//
			var atmHis = Ext.create('MyApp.model.SavingHistory', {
				saving_id: atmModel.data.saving_id,
				description: me._tradeTypeTF._value.data.text,
				type: AppUtil.TYPE_ATM_NAP_TIEN,
				amount: m,
				moneycard:amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();

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
		var amount = parseInt(me.getSavingModel().data.amount);//me._amountTF.getValue();
		var now = me._selectedDate;
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = me.getSavingModel();
			atmModel.data.amount = amount;
			//atmModel.data.time = now.getTime();
			
			atmModel.save(function(){
				//plus cash
				AppUtil.cashPlus(m);
				AppUtil.saveExpenseModel('rut_tien', m, atmModel.data.saving_id, 'Tiền rút', 'tien_mat', atmModel.data.bank + '-' + atmModel.data.username, now  );
				AppUtil.saveExpenseModel('rut', m, atmModel.data.saving_id, me._tradeTypeTF._value.data.text, 'saving', atmModel.data.bank + '-' + atmModel.data.username, now  );
				
				var atmHis = Ext.create('MyApp.model.SavingHistory', {
					saving_id: atmModel.data.saving_id,
					description: me._tradeTypeTF._value.data.text,
					type: AppUtil.TYPE_ATM_RUT_TIEN,
					amount: m,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
				//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHOUT, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));
				
							
			});	
			return true;
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHOUT,AppUtil.formatMoneyWithUnit(amount + m)));
			return false;
		}
		
	},
	
	resetView: function(){
		var me = this;
		me._tradeTypeTF.setValue('linh_lai');
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
		if (!me._rateTF) {
			me._rateTF = me.down('textfield[name = "rate"]');
		}
		if (!me._dateField) {
			me._dateField = me.down('textfield[name = "created_date"]');
		}
		if (!me._tradeTypeTF) {
			me._tradeTypeTF = me.down('selectfield[name = "tradetype"]');
		}
		if (!me._tradeDateTF) {
			me._tradeDateTF = me.down('textfield[name = "tradedate"]');
		}
		if (!me._tradeAmountTF) {
			me._tradeAmountTF = me.down('numberfield[name = "amounttrade"]');
		}
	}
 });   