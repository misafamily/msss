Ext.define('MyApp.view.tab.atm.AtmEdit', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmedit',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	title: 'Sửa thông tin thẻ',
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
						text: 'Cập nhật',
						cls:'button-submit',
						flex: 1,
						title: 'atmeditsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'atmeditcancelbutton'
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
	
	updateAtmInfo: function(atm) {
		var me = this;
		me.setAtmModel(atm);
		me._nameTF.setValue(atm.data.username);
		me._bankTF.setValue(atm.data.bank);
		me._amountTF.setValue(atm.data.amount);
		
		//me.updateRecentStore();
		
	},
	
	//call from Controller
	checkFields: function(callback) {
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
		
		callback(name, bank, amount);
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