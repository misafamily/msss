Ext.define('MyApp.view.tab.atm.AtmAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmadd',
    requires: [
    	 
    ],
    config: {
    	title: 'Thêm tài khoản',
        layout:{
			type:'vbox'
		},
		cls:'atm-form-container',
		items:[
			{
                xtype: 'container',
                title: 'Thông tin tài khoản:',
                instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
                defaults: {
                    required: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        //label: 'Tên tài khoản ',
                        cls:'atmadd-accountname',
                        placeHolder:'Tên chủ thẻ (vd: NGUYEN VAN A)',
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
                        placeHolder:'Số tiền  đ (vd: 1000000)',
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
						text: 'THÊM',
						cls:'button-submit',
						flex: 1,
						title: 'atmaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'TRỞ VỀ',
						cls:'button-cancel',
						flex: 1,
						title: 'atmaddcancelbutton'
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
	addAtm: function(callback) {
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
		
		var now = new Date();
		var atm_id = 'atm_' + now.getTime();
		var atmModel = Ext.create('MyApp.model.Atm', {
			username: name,
			bank: bank,
			amount: amount,
			status: AppUtil.STATUS_IN_USE,
			time: now.getTime(),
			atm_id: atm_id
		});		
		atmModel.save({
			success: function(savedrecord){
				//savo to AtmHistory		
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atm_id,
					description: 'Tạo mới tài khoản',
					type: AppUtil.TYPE_ATM_TAO_MOI,
					amount: amount,
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