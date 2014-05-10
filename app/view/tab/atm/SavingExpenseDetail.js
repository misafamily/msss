Ext.define('MyApp.view.tab.atm.SavingExpenseDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_savingexpensedetail',
    requires: [
    	 
    ],
    config: {
    	expenseModel: null,
    	editMode: false,
    	title: 'Chi tiết',
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
                    readOnly: true,
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
                        xtype: 'numberfield',
                        name: 'amount',
                        placeHolder:'Số tiền (đ) (vd: 1000000)',
                        cls:'atmadd-amount',
                        hidden: true,
                        readOnly: false
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'textfield',
                        name: 'amounttf',
                        placeHolder:'Số tiền (đ) (vd: 1000000)',
                        cls:'atmadd-amount'
                    }/*,
                    {
	                    xtype: 'textareafield',
						label: '',
	                    placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3,
						disabled: true			                    
	                }*/
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
	editCash: function() {
		var me = this;
		//var typebuying = me._typeTF.getValue();
		var amount = me._amountTF.getValue();
		//var typeText = me._typeTF._value.data.text;
		//var note = me._noteTF.getValue();
		//console.log(amount);
		//if (amount == '' || amount == null) amount = 0;		

		if (amount == null) {
			MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR_INPUT, AppUtil.MESSAGE_WRONG_NUMBER_INPUT);
			return -1;
		}

		amount = parseInt(amount);
		var m = me.getExpenseModel();
		var prevAmount = parseInt(m.data.amount);
		var prevDate = new Date(m.data.time);
		if (amount != prevAmount || !prevDate.sameDateWith(me._selectedDate)) {
			var amount_change = amount - prevAmount;
			var type = m.data.type;
		
			if (type == 'rut_tien') { //from atm history
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(-amount_change)));
						return -1;
					}
				}
				
	
				var targetModel;
				var hisModel;
				if (m.data.saving_id) { // is Saving
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount - amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_SAVING, AppUtil.formatMoneyWithUnit(currentamount), AppUtil.formatMoneyWithUnit(currentamount-newamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update expense 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
					hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
						if (records.length > 0) {
							var foundModel = records[0];
							foundModel.data.amount = amount.toString();
							foundModel.data.time = me._selectedDate.getTime();
							foundModel.data.dd = me._selectedDate.getDate();
							foundModel.data.mm = me._selectedDate.getMonth();
							foundModel.data.yy = me._selectedDate.getFullYear();
							
							foundModel.save(function() {
								MyApp.app.fireEvent('expense_changed', me._selectedDate);
							});
						}
					});
						
				}
				
				
			} else if (type == 'linh_lai') { //from atm history

				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(-amount_change)));
						return -1;
					}
				}
				
	
				var targetModel;
				var hisModel;
				if (m.data.saving_id) { // is Saving
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					if (targetModel.data.last_paid_history_id == m.data.history_id)
						targetModel.data.last_paid_time = me._selectedDate.getTime();
					//targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update expense 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
					hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
						if (records.length > 0) {
							var foundModel = records[0];
							foundModel.data.amount = amount.toString();
							foundModel.data.time = me._selectedDate.getTime();
							foundModel.data.dd = me._selectedDate.getDate();
							foundModel.data.mm = me._selectedDate.getMonth();
							foundModel.data.yy = me._selectedDate.getFullYear();
							
							foundModel.save(function() {
								MyApp.app.fireEvent('expense_changed', me._selectedDate);
							});
						}
					});
						
				}
				
				
			} else if (type == 'nap_tien') { //from atm history
				
				if (amount_change > 0) {
					if (!AppUtil.canGetCash(amount_change)) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount_change)));
						return -1;
					}
				}

				var targetModel;
				var hisModel;
				if (m.data.saving_id) { // is ATM
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount + amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_ATM, AppUtil.formatMoneyWithUnit(currentamount), AppUtil.formatMoneyWithUnit(currentamount-newamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update expense 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
					hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {
						if (records.length > 0) {
							var foundModel = records[0];
							foundModel.data.amount = amount.toString();
							foundModel.data.time = me._selectedDate.getTime();
							foundModel.data.dd = me._selectedDate.getDate();
							foundModel.data.mm = me._selectedDate.getMonth();
							foundModel.data.yy = me._selectedDate.getFullYear();
							
							foundModel.save(function() {
								MyApp.app.fireEvent('expense_changed', me._selectedDate);
							});
						}
					});
						
				}
				//invert amount_change
				amount_change = -amount_change;
				
			} else if (type == 'tao_moi') { //from atm history
				
				var targetModel;
				var hisModel;
				if (m.data.saving_id) { // is ATM
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount + amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_SAVING, AppUtil.formatMoneyWithUnit(currentamount), AppUtil.formatMoneyWithUnit(currentamount-newamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					//targetModel.data.time = me._selectedDate.getTime();
					//targetModel.data.created_date = 'Gởi ngày ' + me._selectedDate.shortDateFormat();
					/*var interest_paid_index = parseInt(targetModel.data.interest_paid_index);
					if (interest_paid_index < 1) {
						targetModel.data.last_paid_history_id = '';
					}*/
					targetModel.save();
						
				}
				//invert amount_change
				//amount_change = -amount_change;
				
			} else {
				alert(type + ' does not support');
				return 0;
			}
			
			me._amountEditTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			
			m.data.amount = amount.toString();
			m.data.time = me._selectedDate.getTime();
			m.data.dd = me._selectedDate.getDate();
			m.data.mm = me._selectedDate.getMonth();
			m.data.yy = me._selectedDate.getFullYear();
			
			m.save(function() {
				if (type == 'rut_tien' || type == 'nap_tien' || type == 'linh_lai') {
					AppUtil.cashPlus(amount_change);				
				}
				MyApp.app.fireEvent('saving_changed', m.data.saving_id);
			});
			
			return 1;
			
			
			
			
		} else return 0;
		
		
	},
	
	erase: function(callback) {
		var me = this;
		var m = me.getExpenseModel();
		var amount = parseInt(m.data.amount);
		var type = m.data.type;
		if (type == 'linh_lai') {
			if (!AppUtil.canGetCash(amount)) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount)));
				return false;
			}
			var targetModel;
			var hisModel;
			//return money to ATM
			targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
			if (!targetModel) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
				return false;
			}
			//check for prev or next linh_lai
			m.getProxy().findRecord('last_paid_history_id', m.data.history_id, function(record1s){
				if (record1s.length > 0) {//ko xoa vi chua phai linh lai sau cung
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_DELETE_DENY, AppUtil.MESSAGE_FAILED_SAVING_PAID_DELETE);
					return false;
				}
				
				//tim lan linh lai truoc do de cap nhat linh lai sau cung
				m.getProxy().findRecord('history_id', m.data.last_paid_history_id, function(record2s){
					if (record2s.length > 0) {
						var prevRec = record2s[0];
						
						targetModel.data.last_paid_history_id = prevRec.data.history_id;
						targetModel.data.last_paid_time = prevRec.data.time;
						targetModel.data.interest_paid_index = (parseInt(targetModel.data.interest_paid_index) - 1).toString();

					} else {
						targetModel.data.last_paid_history_id = '';
						targetModel.data.last_paid_time = targetModel.data.time;
						targetModel.data.interest_paid_index = '0';
					}
					targetModel.save();
						
					//remove expense history
					hisModel = Ext.ModelManager.getModel('MyApp.model.Expense'); 
					hisModel.getProxy().findRecord('external_id', m.data.history_id, function(record3s) {	
						if (record3s.length > 0) {
							var foundModel = record3s[0];
							foundModel.erase(function() {
								MyApp.app.fireEvent('expense_changed', me._selectedDate);
							});
						}
					});
					
					m.erase(function() {
						MyApp.app.fireEvent('saving_changed', m.data.saving_id);
						AppUtil.cashMinus(amount);
						callback();
					});
					
				});
			});
			
			
			
		} else if (type == 'chuyen_khoan') {
			var targetModel;
			var hisModel;
			//return money to ATM
			targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.atm_id);
			if (!targetModel) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
				return false;
			}
			var currentamount = parseInt(targetModel.data.amount);
			var newamount = currentamount + amount;
			targetModel.data.amount = newamount.toString();
			targetModel.save();
			//remove expense history
			hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
			hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
				if (records.length > 0) {
					var foundModel = records[0];
					foundModel.erase(function() {
						MyApp.app.fireEvent('expense_changed', me._selectedDate);
					});
				}
			});
			
			m.erase(function() {
				MyApp.app.fireEvent('atm_changed', m.data.atm_id);
				callback();
			});
		} else if (type == 'rut_tien') {
			if (!AppUtil.canGetCash(amount)) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount)));
				return false;
			}
			
			var targetModel;
			var hisModel;
			//return money to ATM
			targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
			if (!targetModel) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
				return false;
			}
			var currentamount = parseInt(targetModel.data.amount);
			var newamount = currentamount + amount;
			targetModel.data.amount = newamount.toString();
			targetModel.save();
			//remove expense history
			hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
			hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
				if (records.length > 0) {
					var foundModel = records[0];
					foundModel.erase(function() {
						MyApp.app.fireEvent('expense_changed', me._selectedDate);
					});
				}
			});
			
			m.erase(function() {
				MyApp.app.fireEvent('saving_changed', m.data.saving_id);
				AppUtil.cashMinus(amount);
				callback();
			});
		} else if (type == 'nap_tien') {

			var targetModel;
			var hisModel;
				//return money to ATM
			targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.saving_id);
			if (!targetModel) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
				return false;
			}
			var currentamount = parseInt(targetModel.data.amount);
			var newamount = currentamount - amount;
			
			if (newamount < 0) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_SAVING, AppUtil.formatMoneyWithUnit(currentamount), AppUtil.formatMoneyWithUnit(currentamount-newamount)));
				return -1;
			}
				
			targetModel.data.amount = newamount.toString();
			targetModel.save();
			//remove expense history
			hisModel = Ext.ModelManager.getModel('MyApp.model.Expense');
			hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
				if (records.length > 0) {
					var foundModel = records[0];
					foundModel.erase(function() {
						MyApp.app.fireEvent('expense_changed', me._selectedDate);
					});
				}
			});
			
			m.erase(function() {
				MyApp.app.fireEvent('saving_changed', m.data.saving_id);
				AppUtil.cashPlus(amount);
				callback();
			});
		} else {
			alert(type + ' does not support');
			return false;
		}
		return false;
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
		me.exitEditMode();
		var m = me.getExpenseModel();
		var type = m.data.type;
		var amount = parseInt(m.data.amount);
		me._amountTF.setValue(amount);
		me._amountEditTF.setValue(AppUtil.formatMoneyWithUnit(amount));
		//me._noteTF.setValue(m.data.note);
		me.updateSelectedDate(new Date(m.data.time));
		//setup title
		me.setTitle(m.data.description);
	},
	
	enterEditMode: function() {
		var me = this;
		var m = me.getExpenseModel();
		me.setEditMode(true);
		me._amountTF.show();
		me._amountEditTF.hide();
		//me._noteTF.setReadOnly(false);
		//me._noteTF.setDisabled(false);
	},
	
	exitEditMode: function() {
		var me = this;
		me.setEditMode(false);
		me._amountTF.hide();
		me._amountEditTF.show();
		//me._noteTF.setReadOnly(true);
		//me._noteTF.setDisabled(true);
	},


	assignFields: function() {
		var me = this;
		if (!me._dateTF) me._dateTF = me.down('textfield[name = "todaydate"]');
		//if (!me._buyingtypeTF) me._buyingtypeTF = me.down('selectfield[name = "buyingtype"]');
		if (!me._amountTF) me._amountTF = me.down('numberfield[name = "amount"]');
		if (!me._amountEditTF) me._amountEditTF = me.down('textfield[name = "amounttf"]');
		//if (!me._noteTF) me._noteTF = me.down('textareafield[name = "note"]');
	}
 });   