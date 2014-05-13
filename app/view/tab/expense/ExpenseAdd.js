Ext.define('MyApp.view.tab.expense.ExpenseAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_expenseadd',
    requires: [
    	    
    ],
    config: {
    	title: 'Thêm chi tiêu',
    	cls:'atm-form-container',
        layout:{
			type:'vbox'
		},
		items:[
			{
				xtype:'container',
				//cls:'atm-title-container',
				defaults: {
                    //required: true,
                    autoComplete: false,
                    autoCorrect: false
                },
				items:[
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
                        name: 'buyingtype',
                        //label: 'Ngân hàng ',
                        cls:'expenseadd-buyingtype',    
	                    options: AppConfig.expenseType
                    },
                     {
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền (đ) (vd: 100000)',
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
			}/*,
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
						title: 'expenseaddsubmitbutton'
					},
					{
						xtype: 'button',
						text: 'Hủy',
						cls:'button-cancel',
						flex: 1,
						title: 'expenseaddcancelbutton'
					}
					
				]	
			}*/
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
		
	},
	
	assignFields: function() {
		var me = this;
		if (!me._dateTF) me._dateTF = me.down('textfield[name = "todaydate"]');
		if (!me._buyingtypeTF) me._buyingtypeTF = me.down('selectfield[name = "buyingtype"]');
		if (!me._amountTF) me._amountTF = me.down('numberfield[name = "amount"]');
		if (!me._noteTF) me._noteTF = me.down('textareafield[name = "note"]');
		
		//me.showToday();
	},
	
	showToday: function() {
		var me = this;
		//me._selectedDate = new Date();
		me.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {		
		var me = this;
		me._selectedDate = new Date(date.getTime());
		me._dateTF.setValue(me._selectedDate.dateShortFormatWithoutTime());
	},
	
	getSelectedDate: function() {
		return this._selectedDate;
	},
	
	resetView: function(date){
		var me = this;
		me._dateTF.setValue('');
		me._buyingtypeTF.setValue('di_cho');
		me._amountTF.reset();
		me._noteTF.reset();
		me.updateSelectedDate(date);
	},
	
	addExpense: function(callback) {
		var me = this;
		var what = me._buyingtypeTF._value.data.text;
		var type = me._buyingtypeTF.getValue();
		var amount = me._amountTF.getValue();
		var note = me._noteTF.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		
		
		/*if (!amount) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_NOT_FILLED_INPUT);
			return false;
		}*/
		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return false;
		}
		if (!AppUtil.canGetCash(amount)) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EXPENSE, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EXPENSE,AppUtil.getCashFormat()));
			return;
		}
		
		AppUtil.cashMinus(amount);
		amount = parseInt(amount).toString();
		
		var now = me._selectedDate;
		var expenseId = 'expensive_' + now.getTime();
		var expenseData = {
			expense_id: expenseId,
			amount: amount,
			type: 'chi',
			buyingwhat: what,
			buyingtype: 'tien_mat',
			frombank: type,
			note: note,
			time: now.getTime(),
			week: Ext.Date.getWeekOfYear(now),
			dd: now.getDate(),
			mm: now.getMonth(),
			yy: now.getFullYear()
		};
		
		var model = Ext.create('MyApp.model.Expense', expenseData);
		model.save(function(){
			MyApp.app.fireEvent('chi_changed');
			
			callback(now);
		});
		
		return true;
	}
 });   