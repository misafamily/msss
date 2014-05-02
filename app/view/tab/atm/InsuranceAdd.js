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
	                       {text: 'Khác',  value: 'khac'}
						]
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
						name: 'period'
					},
					 {
                        xtype: 'numberfield',
                        name: 'amountpaid',
                        placeHolder:'Số tiền đã đóng (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền đóng mỗi lần (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                        //label: 'Số tiền hiện có  '
                    },
                     {
                        xtype: 'textfield',
                        name: 'created_date',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-createddate',
                        readOnly: true,
                        placeHolder:'Ngày bắt đầu 1 Th5 2014',
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
		this.assignFields();
	},
	
	//call from Controller
	addInsurance: function(callback) {
		var me = this;
		var name = me._nameTF.getValue();
		var bank = me._bankTF.getValue();
		var amount = me._amountTF.getValue();
		var amountpaid = me._amountpaidTF.getValue();
		var type = me._typeTF.getValue();
		var typetext = me._typeTF._value.data.text;
		var period = me._periodTF.getValue();
		var note = me._noteField.getValue();
		var createdDate = me._dateField.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		
		
		if (!name || !bank) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_NOT_FILLED_INPUT);
			return false;
		}
		if (amount == null || amountpaid == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}		
		
		name = name.trim();
		bank = bank.trim();
		amount = parseInt(amount).toString();
		amountpaid = parseInt(amountpaid).toString();

		var now = new Date();
		var atm_id = 'insurance_' + now.getTime();
		var atmModel = Ext.create('MyApp.model.Insurance', {
			username: name,
			bank: bank,
			amountpaid: amountpaid,
			amount: amount,
			insurancetype: type,
			insurancetext: typetext,
			period: period,
			note: note,
			created_date: createdDate,
			status: AppUtil.STATUS_IN_USE,
			time: me._selectedDate.getTime(),
			last_paid_time: me._selectedDate.getTime(),
			last_info: '',
			insurance_id: atm_id
		});		
		atmModel.save({
			success: function(savedrecord){
				//savo to AtmHistory		
				var atmHis = Ext.create('MyApp.model.InsuranceHistory', {
					insurance_id: atm_id,
					description: 'Tạo sổ mới',
					type: AppUtil.TYPE_ATM_TAO_MOI,
					amount: amount,
					//moneycard:amount,
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
		me._nameTF.setValue('');
		me._bankTF.setValue('');
		me._amountpaidTF.reset();
		me._amountTF.reset();
		me._periodTF.setValue('1');
		me._noteField.reset();
		me._typeTF.setValue('nhan_tho');
		me.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {		
		var me = this;
		me._selectedDate = new Date(date.getTime());
		//if (!this._selectedDate) this._selectedDate = new Date();
		//this._selectedDate.setDate(date.getDate());
		//this._selectedDate.setMonth(date.getMonth());
		//this._selectedDate.setFullYear(date.getFullYear());
		me._dateField.setValue('Ngày bắt đầu ' + date.shortDateFormat());
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
		if (!me._amountpaidTF) {
			me._amountpaidTF = me.down('numberfield[name = "amountpaid"]');
		}
		if (!me._amountTF) {
			me._amountTF = me.down('numberfield[name = "amount"]');
		}
		if (!me._typeTF) {
			me._typeTF = me.down('selectfield[name = "insurancetype"]');
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
	}
 });   