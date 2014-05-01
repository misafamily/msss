Ext.define('MyApp.view.tab.atm.CashAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_cashadd',
    requires: [
    	 
    ],
    config: {
    	title: 'Thêm tiền mặt',
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
                        xtype: 'selectfield',
                        name: 'tradetype',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [			
	                    	{text: 'Lương',  value: 'nhan_luong'},									
							{text: 'Bảo hiểm',  value: 'bao_hiem'},
	                    	{text: 'Khác',  value: 'khac'}
						],	
                    },
                     {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền (đ) (vd: 1000000)',
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
						text: 'Thêm',
						cls:'button-submit',
						flex: 1,
						title: 'cashaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'cashaddcancelbutton'
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
	addCash: function() {
		var me = this;
		var type = me._typeTF.getValue();
		var amount = me._amountTF.getValue();
		var typeText = me._typeTF._value.data.text;
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		

		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}

		amount = parseInt(amount);
		
		AppUtil.cashPlus(amount);
		AppUtil.saveExpenseModel('thu', amount, '', typeText, 'tien_mat', '' );
		MyApp.app.fireEvent('show_alert', AppUtil.TITLE_THEMTIEN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_THEMTIEN, AppUtil.formatMoneyWithUnit(amount), AppUtil.getCashFormat()));	
		
		return true;
	},
	
	resetView: function(){
		var me = this;
		me._typeTF.setValue('nhan_luong');
		me._amountTF.reset();
	},
	
	assignFields: function() {
		var me = this;
		if (!me._typeTF) {
			me._typeTF = me.down('selectfield[name = "tradetype"]');
		}
		if (!me._amountTF) {
			me._amountTF = me.down('numberfield[name = "amount"]');
		}
	}
 });   