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
		cls:'atm-popup-container',
		items:[
			{
                xtype: 'fieldset',
                title: 'Thông tin tài khoản:',
                instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
                defaults: {
                    required: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Tên tài khoản ',
                        placeHolder:'Tên chủ thẻ',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'textfield',
                        name: 'bank',
                        label: 'Ngân hàng ',
                        placeHolder:'VCB, HSBC, ACB ...',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'0 (đ)',
                        label: 'Số tiền hiện có  '
                    },
                ]    
           },
           {
				xtype:'container',
				layout:'hbox',
				items:[
					{
						xtype: 'button',
						text: 'HỦY',
						cls:'button-cancel',
						flex: 1,
						title: 'atmaddcancelbutton'
					},
					{
						xtype: 'button',
						text: 'THÊM',
						cls:'button-submit',
						flex: 1,
						title: 'atmaddsubmitbutton'
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
		var name = this._nameTF.getValue();
		var bank = this._bankTF.getValue();
		var amount = this._amountTF.getValue();
		
		if (amount == '' || amount == null) amount = '0';		
		
		if (!name || !bank) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_NOT_FILLED_INPUT);
			return false;
		}
		name = name.trim();
		bank = bank.trim();
		//amount = amount.trim();
		
		console.log(name, bank, amount);
		
		var atmModel = Ext.create('MyApp.model.Atm', {
			username: name,
			bank: bank,
			amount: amount,
			status: AppUtil.STATUS_IN_USE
		});
		
		atmModel.save(function(){
			callback();
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
			this._amountTF = this.down('textfield[name = "amount"]');
		}
	}
 });   