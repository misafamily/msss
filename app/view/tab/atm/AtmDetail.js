Ext.define('MyApp.view.tab.atm.AtmDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmdetail',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết tài khoản',
        layout:{
			type:'vbox'
		},
		scrollable: {
			direction: 'vertical'
		},
		cls:'atm-form-container',
		items:[
			{
                xtype: 'container',
                //title: 'Thông tin tài khoản:',
                //instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
                defaults: {
                    required: true
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
                        //placeHolder:'Số tiền  đ (vd: 1000000)',
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
						text: 'Sửa thông tin',
						cls:'button-submit',
						flex: 1,
						title: 'atmdetaileditbutton'
					},
					{
						xtype: 'button',
						text: 'Lịch sử GD',
						cls:'button-submit',
						flex: 1,
						title: 'atmdetailhistorybutton'
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
						text: 'Xóa t.khoản',
						cls:'button-delete',
						flex: 1,
						title: 'atmdetaildeletebutton'
					},
					{
						xtype: 'button',
						text: 'Trở về',
						cls:'button-cancel',
						flex: 1,
						title: 'atmdetailcancelbutton'
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
		
		var atmModel = this.getAtmModel();
		var now = new Date();
		
		if (atmModel.data.username != name || atmModel.data.bank != bank || atmModel.data.amount != amount) {
			
			if (atmModel.data.amount != amount) {
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Sửa tài khoản',
					type: AppUtil.TYPE_ATM_SUA_THONG_TIN,
					amount: amount,
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
				me.getCallbackFunc();
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
		
		amount += m;
		
		var now = new Date();
		var atmModel = this.getAtmModel();
		atmModel.data.amount = amount;
		atmModel.data.time = now.getTime();
		
		atmModel.save(function(){
			
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
				atm_id: atmModel.data.atm_id,
				description: 'Chuyển tiền mặt vào tài khoản',
				type: AppUtil.TYPE_ATM_CHUYEN_TIEN,
				amount: m,
				time: now.getTime(),
				dd: now.getDate(),
				mm: now.getMonth(),
				yy: now.getFullYear()
			});
			
			atmHis.save();
				
			me.getCallbackFunc();
			me._amountTF.setValue(amount);
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, AppUtil.MESSAGE_SUCCESS_PUSHIN);			
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
				
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Rút thành tiền mặt',
					type: AppUtil.TYPE_ATM_RUT_TIEN,
					amount: m,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				me.getCallbackFunc();
				me._amountTF.setValue(amount);
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHIN, AppUtil.MESSAGE_SUCCESS_PUSHOUT);			
			});	
		} else {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_PUSHOUT, AppUtil.MESSAGE_FAILED_PUSHIN);
		}
		
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
	}
 });   