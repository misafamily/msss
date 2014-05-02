Ext.define('MyApp.view.tab.atm.SavingDetail', {
    extend: 'MyApp.view.component.AppContainer',
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
							{text: 'Kỳ hạn 7 ngày',  value: '7'}	//minute
						]
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
							{text: 'Lĩnh lãi theo ngày',  value: '0'}
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
	                }
	                
                ]    
           },
          /* {
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
					},
					{
						xtype: 'button',
						text: 'Ước tính tiền lãi',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailestimatebutton'
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
			},*/
			{
        		xtype: 'label',
        		//html: 'Tiền lãi ước tính từ ngày {0}',
        		style: {
					'margin-left': '2px',
					'margin-bottom': '5px',
					'margin-top': '5px'
				},
				name: 'estimatelabel'
        	},
        	 {
                xtype: 'textfield',
                name: 'estimateamount',
                //placeHolder:'Số tiền gởi (đ) (vd: 1000000)',
                cls:'savingadd-reminder',
                readOnly: true
                //label: 'Số tiền hiện có  '
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
						html: 'GIAO DỊCH GẦN NHẤT',
						flex: 1
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
		if (m.data.note != '' && m.data.note != null) me._noteField.setValue(m.data.note);
		else {
			me._noteField.reset();
		}
		me._paidField.setValue(m.data.interest_paid);
		me._dateField.setValue(m.data.created_date);
		me.updateRecentStore();
		me.estimate();
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
		
	estimate: function() {
		var me = this;
		var m = 0;
		var atmModel = me.getSavingModel();
		var now = new Date();
		var lastPaid = new Date(atmModel.data.last_paid_time);	
		m = parseInt(atmModel.data.amount) * parseFloat(atmModel.data.interest_rate)/100;
		var diff = Ext.Date.diff(lastPaid, now, Ext.Date.DAY);	
		m *= diff/360;	
		m = Math.round(m);
		
		var paidIndex = parseInt(atmModel.data.interest_paid_index);
		var s = paidIndex == 0 ? 'gởi' : 'lĩnh lãi lần ' + paidIndex;
		
		me._estimateLabel.setHtml(Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_UOCTINH_LAI, s, lastPaid.shortDateFormat()));
		me._estimateAmountField.setValue(AppUtil.formatMoneyWithUnit(m));
		//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_UOCTINH_LAI, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_UOCTINH_LAI, s, lastPaid.shortDateFormat(), AppUtil.formatMoneyWithUnit(m)));
	},
	
	editSaving: function(data) {		
		var me = this;
		
		var atmModel = me.getSavingModel();
		
		var now = new Date();
		
		if (atmModel.data.username != data.username || atmModel.data.bank != data.bank || atmModel.data.amount != data.amount ||
			atmModel.data.interest_rate != data.interest_rate || atmModel.data.period != data.period ||
			atmModel.data.interest_paid != data.interest_paid || atmModel.data.created_date != data.created_date || 
			atmModel.data.note != data.note || atmModel.data.time != data.time) {
			
			atmModel.data.username = data.username;
			atmModel.data.bank = data.bank;
			atmModel.data.amount = data.amount;
			atmModel.data.interest_rate = data.interest_rate;
			atmModel.data.period = data.period;
			atmModel.data.interest_paid = data.interest_paid;
			atmModel.data.note = data.note;
			atmModel.data.created_date = data.created_date;
			atmModel.data.time = data.time;
			var interest_paid_index = parseInt(atmModel.data.interest_paid_index);
			if (interest_paid_index < 1) {
				atmModel.data.last_paid_time = data.time;
			}

			me._nameTF.setValue(atmModel.data.username);
			me._bankTF.setValue(atmModel.data.bank);
			me._amountTF.setValue(AppUtil.formatMoneyWithUnit(atmModel.data.amount));
			me._rateTF.setValue(AppUtil.formatRateWithUnit(atmModel.data.interest_rate));
			me._periodTF.setValue(atmModel.data.period);
			if (atmModel.data.note != '' && atmModel.data.note != null) me._noteField.setValue(atmModel.data.note);
			else me._noteField.reset();
			
			me._paidField.setValue(atmModel.data.interest_paid);
			me._dateField.setValue(atmModel.data.created_date);
			
			var atmHis = Ext.create('MyApp.model.SavingHistory', {
					saving_id: atmModel.data.saving_id,
					description: 'Cập nhật thông tin sổ',
					type: AppUtil.TYPE_ATM_SUA_THONG_TIN,
					amount: data.amount,
					moneycard:data.amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
			});				
			//if (atmModel.data.amount != amount) {
				atmHis.save();	
			//}			
					
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
	
	deleteSaving: function() {
		var me = this;
		//var amount = me._amountTF.getValue();
		var atmModel = me.getSavingModel();
		var now = new Date();
		atmModel.data.status = AppUtil.STATUS_CLOSED;
		atmModel.save(function(){
	
				var atmHis = Ext.create('MyApp.model.SavingHistory', {
					saving_id: atmModel.data.saving_id,
					description: 'Đóng sổ',
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
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_SAVING_DELETE, AppUtil.MESSAGE_SUCCESS_DELETE);
			}
		);
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
		if (!me._estimateAmountField) {
			me._estimateAmountField = me.down('textfield[name = "estimateamount"]');
		}
		if (!me._estimateLabel) {
			me._estimateLabel = me.down('label[name = "estimatelabel"]');
		}
		
	}
 });   