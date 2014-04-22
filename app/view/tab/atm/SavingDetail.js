Ext.define('MyApp.view.tab.atm.SavingDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_savingdetail',
    requires: [
    	 
    ],
    config: {
    	savingModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết sổ',
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
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'textfield',
                        name: 'rate',
                        placeHolder:'Lãi suất (%/năm) (vd: 7)',
                        cls:'savingadd-interestrate',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'selectfield',
                        name: 'period',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [													
							{text: 'Kỳ hạn 1 tháng',  value: '30'},
	                        {text: 'Kỳ hạn 3 tháng',  value: '90'},
							{text: 'Kỳ hạn 6 tháng',  value: '180'},
							{text: 'Kỳ hạn 9 tháng',  value: '270'},
							{text: 'Kỳ hạn 12 tháng',  value: '360'},
							{text: 'Kỳ hạn 24 tháng',  value: '720'},
							{text: 'Kỳ hạn 36 tháng',  value: '1080'},
							{text: 'Không kỳ hạn',  value: '0'},	//minute
							{text: 'Kỳ hạn 1 ngày',  value: '1'},	//minute
							{text: 'Kỳ hạn 2 ngày',  value: '2'},	//minute
							{text: 'Kỳ hạn 3 ngày',  value: '3'},	//minute
							{text: 'Kỳ hạn 6 ngày',  value: '6'},	//minute
							{text: 'Kỳ hạn 7 ngày',  value: '7'},	//minute
						],	
                    },
                    {
						xtype: 'selectfield',
	                    //label: 'Nhắc nhở',//Add reminder
	                 
						cls: 'savingadd-reminder',
	                    options: [						
	                    	{text: 'Lĩnh lãi 1 tháng/lần',  value: '1'},	//minute
							{text: 'Lĩnh lãi 2 tháng/lần',  value: '2'},	//minute
							{text: 'Lĩnh lãi 3 tháng/lần',  value: '3'},
	                        {text: 'Lĩnh lãi 6 tháng/lần',  value: '6'},
							{text: 'Lĩnh lãi 9 tháng/lần',  value: '9'},
							{text: 'Lĩnh lãi 12 tháng/lần',  value: '12'},
							{text: 'Lĩnh lãi theo ngày',  value: '0'},
						],	
						style: {
							//'margin-top': '100px',
							//'font-size': '14px',
							//'margin-left': '-12px'
						},
						name: 'interest_paid'
					},
                     {
                        xtype: 'textfield',
                        name: 'created_date',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-createddate',
                        readOnly: true,
                        //placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
                        autoCapitalize: false,
                        clearIcon:false
                    },
                    {
	                    xtype: 'textareafield',
						label: '',
	                    //placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3			                    
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
						text: 'Lĩnh lãi',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpaidbutton'
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
						text: 'Nạp tiền',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpushinbutton'
					},	
					{
						xtype: 'button',
						text: 'Rút tiền',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpushoutbutton'
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
						title: 'savingdetaileditbutton'
					},
					{
						xtype: 'button',
						text: 'Đóng sổ',
						cls:'button-delete',
						flex: 1,
						title: 'savingdetaildeletebutton'
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
						
						title: 'savingdetailhistorybutton'
					}
				]
			},
			{
				xclass: 'MyApp.view.component.AppList',
				store: 'SavingHistories_Recent',
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
								'<div class="amounticon {type}"></div>',
								'<div class="amount {type}">{amount:this.format}</div>',
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
    },
	initialize: function() {
		this.callParent(arguments);
		this.assignFields();
	},
	
	updateSavingModel: function() {
		var me = this;
		if (!me.getSavingModel()) return;		
		
		var m = me.getSavingModel();
		
		me._nameTF.setValue(m.data.username);
		me._bankTF.setValue(m.data.bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(m.data.amount));
		me._rateTF.setValue(AppUtil.formatRateWithUnit(m.data.interest_rate));
		me._periodTF.setValue(m.data.period);
		me._noteField.setValue(m.data.note);
		me._paidField.setValue(m.data.interest_paid);
		me._dateField.setValue(m.data.created_date);
		me.updateRecentStore();
		
	},
	
	updateRecentStore: function() {
		var me = this;
		var recentHisStore = me._list.getStore();
		//if (!recentHisStore) recentHisStore = Ext.getStore('SavingHistories_Recent');
		if (recentHisStore) {
			recentHisStore.removeAll();
			AppUtil.offline.updateStoreQuery(recentHisStore, 'SavingHistories_Recent', {saving_id: me.getSavingModel().data.saving_id});
			recentHisStore.load(function(records) {
				//console.log('recentHisStore lenght: ', records.length)
				me._list.setHeight(142*records.length);
			});
		}
	},
	
	paid: function(money) {
		var me = this;
		if (money == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return;
		}
		var now = new Date();
		var atmModel = me.getSavingModel();
		//atmModel.data.amount = amount;
		var paidIndex = parseInt(atmModel.data.interest_paid_index) + 1;
		atmModel.data.time = now.getTime();
		atmModel.data.interest_paid_index = paidIndex.toString();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashPlus(money);
			//
			var atmHis = Ext.create('MyApp.model.SavingHistory', {
				saving_id: atmModel.data.saving_id,
				description: 'Lĩnh lãi lần ' + paidIndex.toString(),
				type: AppUtil.TYPE_ATM_LINH_LAI,
				amount: money,
				moneycard:atmModel.data.amount,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			//var f = me.getCallbackFunc();
				//f();
			me.updateRecentStore();
			//me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_LINHLAI, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_LINHLAI, AppUtil.formatMoneyWithUnit(money), AppUtil.getCashFormat()));			
		});
	},
	
	pushInMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return;
		}
		
		if (!AppUtil.canGetCash(m)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHIN,AppUtil.getCashFormat()));
			return;
		}
				
		var now = new Date();
		var atmModel = me.getSavingModel();
		var amount = parseInt(atmModel.data.amount);//this._amountTF.getValue();
		amount += m;
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		
		atmModel.save(function(){
			//minus cash
			AppUtil.cashMinus(m);
			//
			var atmHis = Ext.create('MyApp.model.SavingHistory', {
				saving_id: atmModel.data.saving_id,
				description: 'Nạp tiền vào sổ',
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
			me.updateRecentStore();
			me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHIN, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
		});
	},
	
	pushOutMoney: function(m) {
		var me = this;
		if (m == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		var amount = parseInt(me.getSavingModel().data.amount);//me._amountTF.getValue();
		var now = new Date();
		
		amount -= m;
		
		if (amount >= 0) {
			var atmModel = me.getSavingModel();
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			atmModel.save(function(){
				//plus cash
				AppUtil.cashPlus(m);
				
				var atmHis = Ext.create('MyApp.model.SavingHistory', {
					saving_id: atmModel.data.saving_id,
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
				
			
				//var f = me.getCallbackFunc();
				//f();
				me.updateRecentStore();
				me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_PUSHOUT, AppUtil.formatMoneyWithUnit(m), AppUtil.getCashFormat()));			
			});	
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_PUSHOUT,AppUtil.formatMoneyWithUnit(amount + m)));
		}
		
	},
	
	resetView: function(){
		var me = this;
		me._nameTF.setValue('');
		me._bankTF.setValue('');
		me._amountTF.reset();
		me._rateTF.reset();
		me._periodTF.setValue('30');
		me._noteField.setValue('');
		me._paidField.setValue('1');
		me.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {	
		var me = this;	
		me._selectedDate = new Date(date.getTime());
		//if (!this._selectedDate) this._selectedDate = new Date();
		//this._selectedDate.setDate(date.getDate());
		//this._selectedDate.setMonth(date.getMonth());
		//this._selectedDate.setFullYear(date.getFullYear());
		me._dateField.setValue(date.shortDateFormat());
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
		if (!me._periodTF) {
			me._periodTF = me.down('selectfield[name = "period"]');
		}
		if (!me._dateField) {
			me._dateField = me.down('textfield[name = "created_date"]');
		}
		if (!me._noteField) {
			me._noteField = me.down('textareafield[name = "note"]');
		}
		if (!me._paidField) {
			me._paidField = me.down('selectfield[name = "interest_paid"]');
		}
		if (!me._list) {
			me._list = me.down('list');
		}
	}
 });   