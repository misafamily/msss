Ext.define('MyApp.view.tab.atm.AtmExpenseDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmexpensedetail',
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
			
			/*if (type == 'thu') {//from expense
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
						return -1;
					}
				}
			} else if (type == 'chi') {//from expense
				if (amount_change > 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
						return -1;
					}	
				}
				amount_change = -amount_change;
				typebuying = me._buyingtypeTF.getValue();
				typeText = me._buyingtypeTF._value.data.text;
				
			} else if (type == 'nap') {//from expense
				if (amount_change > 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
						return -1;
					}			
				}

				var targetModel;
				var hisModel;
				if (m.data.frombank.indexOf('atm') > -1) {
					//update atm 1st
					targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
						return -1;
					}
					targetModel.data.amount = (parseInt(targetModel.data.amount) + amount_change).toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = new MyApp.model.AtmHistory();
					//AppUtil.log('find record ' +  m.data.external_id);
					hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
						//AppUtil.log('found records');					
						//AppUtil.log(records);
						if (records.length > 0) {
							var foundModel = records[0];
							//var moneycard = parseInt(foundModel.data.moneycard) - parseInt(foundModel.data.amount) + amount;
							
							//foundModel.data.moneycard = moneycard.toString();
							foundModel.data.amount = amount.toString();
							foundModel.data.time = me._selectedDate.getTime();
							foundModel.data.dd = me._selectedDate.getDate();
							foundModel.data.mm = me._selectedDate.getMonth();
							foundModel.data.yy = me._selectedDate.getFullYear();
							
							foundModel.save(function() {
								MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
							});
						}
					});
				}
				//invert amount_change
				amount_change = -amount_change;
				
			} else if (type == 'rut') { //from expense
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
						return -1;
					}
				}
				
	
				var targetModel;
				var hisModel;
				if (m.data.frombank.indexOf('atm') > -1) {
					//update atm 1st
					targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount - amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_ATM, AppUtil.formatMoneyWithUnit(currentamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = new MyApp.model.AtmHistory();
					//AppUtil.log('find record ' +  m.data.external_id);
					hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
						//AppUtil.log('found records');					
						//AppUtil.log(records);
						if (records.length > 0) {
							var foundModel = records[0];
							//var moneycard = parseInt(foundModel.data.moneycard) + parseInt(foundModel.data.amount) - amount;
							
							//foundModel.data.moneycard = moneycard.toString();
							foundModel.data.amount = amount.toString();
							foundModel.data.time = me._selectedDate.getTime();
							foundModel.data.dd = me._selectedDate.getDate();
							foundModel.data.mm = me._selectedDate.getMonth();
							foundModel.data.yy = me._selectedDate.getFullYear();
							
							foundModel.save(function() {
								MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
							});
						}
					});
				}
				
				
			} else */
			if (type == 'rut_tien') { //from atm history
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
						return -1;
					}
				}
				
	
				var targetModel;
				var hisModel;
				if (m.data.atm_id) { // is ATM
					//update atm 1st
					targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.atm_id);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount - amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_ATM, AppUtil.formatMoneyWithUnit(currentamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update expense 2nd			
					hisModel = new MyApp.model.Expense();
					//AppUtil.log('find record ' +  m.data.external_id);
					hisModel.getProxy().findRecord('external_id', m.data.history_id, function(records) {	
						//AppUtil.log('found records');					
						//AppUtil.log(records);
						if (records.length > 0) {
							var foundModel = records[0];
							//var moneycard = parseInt(foundModel.data.moneycard) + parseInt(foundModel.data.amount) - amount;
							
							//foundModel.data.moneycard = moneycard.toString();
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
				AppUtil.cashPlus(amount_change);
				MyApp.app.fireEvent('atm_changed', m.data.atm_id);
			});
			//AppUtil.saveExpenseModel('thu', amount, '', typeText, 'tien_mat', 'Lĩnh tiền mặt', me._selectedDate,  note);
			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_THEMTIEN, Ext.util.Format.format(AppUtil.MESSAGE_SUCCESS_THEMTIEN, AppUtil.formatMoneyWithUnit(amount), AppUtil.getCashFormat()));	
			
			return 1;
			
			
			
			
		} else return 0;
		
		
	},
	
	erase: function(callback) {
		var me = this;
		var m = me.getExpenseModel();
		var amount = parseInt(m.data.amount);
		var type = m.data.type;
		if (type == 'thu') {
			if (!AppUtil.canGetCash(amount)) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
				return false;
			}
			m.erase(function() {
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
				AppUtil.cashMinus(amount);
				callback();
			});
		} else if (type == 'chi') {
			m.erase(function() {
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
				AppUtil.cashPlus(amount);
				callback();
			});
		} else if (type == 'rut') {
			if (!AppUtil.canGetCash(amount)) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat()));
				return false;
			}
			
			var targetModel;
			var hisModel;
			if (m.data.frombank.indexOf('atm') > -1) {
				//return money to ATM
				targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
				if (!targetModel) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
					return false;
				}
				var currentamount = parseInt(targetModel.data.amount);
				var newamount = currentamount + amount;
				targetModel.data.amount = newamount.toString();
				targetModel.save();
				//remove atm history
				hisModel = new MyApp.model.AtmHistory();
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
						});
					}
				});
			}
			m.erase(function() {
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
				AppUtil.cashMinus(amount);
				callback();
			});
		} else if (type == 'nap') {

			var targetModel;
			var hisModel;
			if (m.data.frombank.indexOf('atm') > -1) {
				//return money to ATM
				targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
				if (!targetModel) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
					return false;
				}
				var currentamount = parseInt(targetModel.data.amount);
				var newamount = currentamount - amount;
				
				if (newamount < 0) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_ATM, AppUtil.formatMoneyWithUnit(currentamount)));
					return -1;
				}
					
				targetModel.data.amount = newamount.toString();
				targetModel.save();
				//remove atm history
				hisModel = new MyApp.model.AtmHistory();
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
						});
					}
				});
			}
			m.erase(function() {
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
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