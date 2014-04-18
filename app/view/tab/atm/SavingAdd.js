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
                        placeHolder:'Số tiền (đ) (vd: 1000000)',
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'numberfield',
                        name: 'rate',
                        placeHolder:'Lãi suất tb (%) (vd: 7, 6.5)',
                        cls:'savingadd-interestrate',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'textfield',
                        name: 'period',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
                        placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
                        autoCapitalize: false
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
			this._periodTF = this.down('textfield[name = "period"]');
		}
		if (!this._dateField) {
			this._dateField = this.down('textfield[name = "created_date"]');
		}
	}
 });   