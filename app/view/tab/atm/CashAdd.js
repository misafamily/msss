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
                        xtype: 'textfield',
                        name: 'todaydate',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-createddate',
                        readOnly: true,
                        //placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
                        autoCapitalize: false,
                        clearIcon:false
                    },
                     {
                        xtype: 'selectfield',
                        name: 'tradetype',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [			
	                    	{text: 'Lương',  value: 'nhan_luong'},									
							{text: 'Bảo hiểm',  value: 'bao_hiem'},
	                    	{text: 'Khác',  value: 'khac'}
						]
                    },
                     {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                        //label: 'Số tiền hiện có  '
                    },
                    {
	                    xtype: 'textareafield',
						label: '',
	                    placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3			                    
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
		var note = me._noteTF.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		

		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}

		amount = parseInt(amount);
		
		AppUtil.cashPlus(amount);
		AppUtil.saveExpenseModel('thu', amount, '', typeText, 'tien_mat', 'Lĩnh tiền mặt', me._selectedDate,  note);
		//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_THEMTIEN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_THEMTIEN, AppUtil.formatMoneyWithUnit(amount), AppUtil.getCashFormat()));	
		
		return true;
	},

	updateSelectedDate: function(date) {		
		var me = this;
		me._selectedDate = date;
		me._dateTF.setValue(me._selectedDate.dateShortFormatWithoutTime());
	},
	
	getSelectedDate: function() {
		return this._selectedDate;
	},
	
	resetView: function(){
		var me = this;
		//me._dateTF.setValue('');
		me._typeTF.setValue('nhan_luong');
		me._amountTF.reset();
		me._noteTF.reset();
		me.updateSelectedDate(new Date());
	},

	assignFields: function() {
		var me = this;
		if (!me._typeTF) {
			me._typeTF = me.down('selectfield[name = "tradetype"]');
		}
		if (!me._dateTF) me._dateTF = me.down('textfield[name = "todaydate"]');
		if (!me._buyingtypeTF) me._buyingtypeTF = me.down('selectfield[name = "buyingtype"]');
		if (!me._amountTF) me._amountTF = me.down('numberfield[name = "amount"]');
		if (!me._noteTF) me._noteTF = me.down('textareafield[name = "note"]');
	}
 });   