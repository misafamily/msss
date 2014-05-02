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
                        placeHolder:'Tiền hiện có (đ) (vd: 1000000)',
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
						text: 'Thêm',
						cls:'button-submit',
						flex: 1,
						title: 'atmaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'atmaddcancelbutton'
					}
					
				]	
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
	},
	
	//call from Controller
	addAtm: function(callback) {
		var me = this;
		var name = me._nameTF.getValue();
		var bank = me._bankTF.getValue();
		var amount = me._amountTF.getValue();
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
		amount = parseInt(amount).toString();
		
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
					description: 'Tạo mới thẻ ATM',
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
		me._nameTF.setValue('');
		me._bankTF.setValue('');
		me._amountTF.reset();
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
	}
 });   