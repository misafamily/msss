Ext.define('MyApp.view.tab.atm.SavingEdit', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_savingedit',
    requires: [
    	 
    ],
    config: {
    	savingModel: null,
    	title: 'Sửa thông tin sổ',
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
                    autoCorrect: false
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
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền gởi (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'numberfield',
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
	                    placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3			                    
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
						text: 'Cập nhật',
						cls:'button-submit',
						flex: 1,
						title: 'savingeditsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'savingeditcancelbutton'
					}
					
				]	
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		this.assignFields();
	},
	
	updateSavingInfo: function(atm) {
		var me = this;
		me.setSavingModel(atm);
		me._nameTF.setValue(atm.data.username);
		me._bankTF.setValue(atm.data.bank);
		me._amountTF.setValue(atm.data.amount);
		me._rateTF.setValue(atm.data.interest_rate);
		
		me._periodTF.setValue(atm.data.period);
		me._paidField.setValue(atm.data.interest_paid);
		if (atm.data.note != '' && atm.data.note != null) me._noteField.setValue(atm.data.note);
		else me._noteField.reset();
		
		//me.updateRecentStore();
		me.updateSelectedDate(new Date(atm.data.time));
	},
	//call from Controller
	checkFields: function(callback) {
		var me = this;
		var name = me._nameTF.getValue();
		var bank = me._bankTF.getValue();
		var amount = me._amountTF.getValue();
		var rate = me._rateTF.getValue();
		var period = me._periodTF.getValue();
		var paid = me._paidField.getValue();
		var note = me._noteField.getValue();
		var createdDate = me._dateField.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		
		
		if (!name || !bank || !rate || !period) {
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
		
		rate = rate.toString();
		
		var now = me._selectedDate.getTime();
		//var atm_id = 'saving_' + now.getTime();
		var savingData = {
			username: name,
			bank: bank,
			amount: amount,
			interest_rate: rate,
			period: period,
			interest_paid: paid,
			//interest_paid_index: '0',
			note: note,
			created_date: createdDate,
			//status: AppUtil.STATUS_IN_USE,
			time: now
			//saving_id: atm_id
		};		
		
		callback(savingData);
		return true;
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
		me._dateField.setValue('Gởi ngày ' + date.shortDateFormat());
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
			me._amountTF = me.down('numberfield[name = "amount"]');
		}
		if (!me._rateTF) {
			me._rateTF = me.down('numberfield[name = "rate"]');
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
	}
 });   