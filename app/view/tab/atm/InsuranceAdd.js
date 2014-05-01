Ext.define('MyApp.view.tab.atm.InsuranceAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_insuranceadd',
    requires: [
    	 
    ],
    config: {
    	title: 'Thêm sổ bảo hiểm',
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
                        placeHolder:'Cty bảo hiểm (vd: Bảo Việt, Prudential ...)',
                        autoCapitalize: false
                    },
                    {
                        xtype: 'selectfield',
                        name: 'insurancetype',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [													
							{text: 'Bảo hiểm nhân thọ',  value: 'nhan_tho'},
	                       {text: 'Bảo hiểm sức khỏe',  value: 'suc_khoe'},
	                       {text: 'Bảo hiểm ô tô',  value: 'o_to'},
	                       {text: 'Bảo hiểm du lịch quốc tế',  value: 'du_lich'},
	                       {text: 'Khác',  value: 'khac'},
						],	
                    },
                    {
						xtype: 'selectfield',
	                    //label: 'Nhắc nhở',//Add reminder
	                 
						cls: 'savingadd-reminder',
	                    options: [						
	                    	{text: 'Thời hạn 1 năm',  value: '1'},	//name
							{text: 'Thời hạn 2 năm',  value: '2'},	//name
							{text: 'Thời hạn 3 năm',  value: '3'},	//name
							{text: 'Thời hạn 4 năm',  value: '4'},	//name
							{text: 'Thời hạn 5 năm',  value: '5'},	//name
							{text: 'Thời hạn 6 năm',  value: '6'},	//name
							{text: 'Thời hạn 7 năm',  value: '7'},	//name
							{text: 'Thời hạn 8 năm',  value: '8'},	//name
							{text: 'Thời hạn 9 năm',  value: '9'},	//name
							{text: 'Thời hạn 10 năm',  value: '10'},	//name
							{text: 'Thời hạn 11 năm',  value: '11'},	//name
							{text: 'Thời hạn 12 năm',  value: '12'},	//name
							{text: 'Thời hạn 13 năm',  value: '13'},	//name
							{text: 'Thời hạn 14 năm',  value: '14'},	//name
							{text: 'Thời hạn 15 năm',  value: '15'},	//name
							{text: 'Khác',  value: '16'}
						],	
						style: {
							//'margin-top': '100px',
							//'font-size': '14px',
							//'margin-left': '-12px'
						},
						name: 'interest_paid'
					},
					 {
						xtype: 'selectfield',
	                    //label: 'Nhắc nhở',//Add reminder
	                 
						cls: 'savingadd-reminder',
	                    options: [						
	                    	{text: 'Đóng tiền từng tháng',  value: 'thang'},	//name
							{text: 'Đóng tiền từng quý',  value: 'quy'},	//name
							{text: 'Đóng tiền từng năm',  value: 'nam'}
						],	
						style: {
							//'margin-top': '100px',
							//'font-size': '14px',
							//'margin-left': '-12px'
						},
						name: 'interest_paid'
					},
					 {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền đã đóng (đ) (vd: 1000000)',
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền đóng mỗi lần (đ) (vd: 1000000)',
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
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
	                    placeHolder:'Ghi chú thêm: tên người thu tiền, số điện thoại liên lạc',//Note on required pre-tests	                  
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
						text: 'Thêm',
						cls:'button-submit',
						flex: 1,
						title: 'insuranceaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'insuranceaddcancelbutton'
					}
					
				]	
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		//this.assignFields();
	},
	
	//call from Controller
	addSaving: function(callback) {
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
		
		var now = new Date();
		var atm_id = 'saving_' + now.getTime();
		var atmModel = Ext.create('MyApp.model.Saving', {
			username: name,
			bank: bank,
			amount: amount,
			interest_rate: rate,
			period: period,
			interest_paid: paid,
			interest_paid_index: '0',
			note: note,
			created_date: createdDate,
			status: AppUtil.STATUS_IN_USE,
			time: me._selectedDate.getTime(),
			last_paid_time: me._selectedDate.getTime(),
			last_info: '',
			saving_id: atm_id
		});		
		atmModel.save({
			success: function(savedrecord){
				//savo to AtmHistory		
				var atmHis = Ext.create('MyApp.model.SavingHistory', {
					saving_id: atm_id,
					description: 'Tạo sổ mới',
					type: AppUtil.TYPE_ATM_TAO_MOI,
					amount: amount,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				
				atmHis.save();
				//
				callback();
			}	
		});
		
		return true;
	},
	
	resetView: function(){
		var me = this;
		/*me._nameTF.setValue('');
		me._bankTF.setValue('');
		me._amountTF.reset();
		me._rateTF.reset();
		me._periodTF.setValue('30');
		me._noteField.setValue('');
		me._paidField.setValue('1');
		me.updateSelectedDate(new Date());*/
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