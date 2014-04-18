Ext.define('MyApp.view.tab.atm.SavingAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_savingadd',
    requires: [
    	 
    ],
    config: {
    	title: 'Thêm sổ tiết kiệm',
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
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'numberfield',
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
						name: 'reminder'
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
						title: 'savingaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'savingaddcancelbutton'
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
	addSaving: function(callback) {
		var me = this;
		var name = this._nameTF.getValue();
		var bank = this._bankTF.getValue();
		var amount = this._amountTF.getValue();
		var rate = this._rateTF.getValue();
		var period = this._periodTF.getValue();
		var createdDate = this._dateField.getValue();
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
			created_date: createdDate,
			status: AppUtil.STATUS_IN_USE,
			time: now.getTime(),
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
		this._nameTF.setValue('');
		this._bankTF.setValue('');
		this._amountTF.setValue('');
		this._rateTF.setValue('');
		this._periodTF.setValue('');
		this.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {		
		//this._selectedDate = date;
		if (!this._selectedDate) this._selectedDate = new Date();
		this._selectedDate.setDate(date.getDate());
		this._selectedDate.setMonth(date.getMonth());
		this._selectedDate.setFullYear(date.getFullYear());
		this._dateField.setValue(date.shortDateFormat());
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
		if (!this._rateTF) {
			this._rateTF = this.down('numberfield[name = "rate"]');
		}
		if (!this._periodTF) {
			this._periodTF = this.down('selectfield[name = "period"]');
		}
		if (!this._dateField) {
			this._dateField = this.down('textfield[name = "created_date"]');
		}
	}
 });   