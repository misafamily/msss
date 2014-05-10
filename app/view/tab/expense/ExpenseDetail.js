Ext.define('MyApp.view.tab.expense.ExpenseDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_expense_expensedetail',
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
                        xtype: 'selectfield',
                        name: 'tradetype',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [			
	                    	{text: 'Lương',  value: 'nhan_luong'},									
							{text: 'Bảo hiểm',  value: 'bao_hiem'},
							{text: 'Cho thuê nhà, mặt bằng',  value: 'cho_thue_nha'},
	                    	{text: 'Khác',  value: 'khac'}
						],
						hidden: true
                    },
                     {
                        xtype: 'selectfield',
                        name: 'buyingtype',
                        //label: 'Ngân hàng ',
                        cls:'expenseadd-buyingtype',    
	                    options: [													
							{text: 'Đi chợ hàng ngày',  value: 'di_cho'},
	                        {text: 'Thực phẩm sữa, bánh kẹo, rượu beer',  value: 'thuc_pham_sua'},
							{text: 'Y tế, chăm sóc sức khỏe',  value: 'y_te'},
							{text: 'Điện, nước, gas',  value: 'dien_nuoc_ga'},
							{text: 'Giao dịch ngân hàng, cước phí',  value: 'giao_dich'},
							{text: 'Xe cộ, di chuyển, xăng',  value: 'xe_xang'},
							{text: 'Phí nhà ở, thuê người',  value: 'thue_nha'},
							{text: 'Đồ dùng  sinh hoạt gia đình',  value: 'sinh_hoat'},
							{text: 'Đồ nội - ngoại thất',  value: 'noi_ngoai_that'},
							{text: 'Quần áo, giày dép, mỹ phẩm',  value: 'quanao_giaydep'},	//minute
							{text: 'Ăn uống, giải trí, tiêu vặt',  value: 'an_uong'},	//minute
							//{text: 'Cá nhân: thể thao, làm tóc, cước đt',  value: 'ca_nhan'},	//minute
							{text: 'Du lịch, dã ngoại',  value: 'du_lich'},	//minute
							{text: 'Học hành, sách vở, báo chí',  value: 'hoc_hanh'},	//minute
							{text: 'Đám, tiệc, biếu xén, thăm nom',  value: 'tiec_tung'},	//minute
							{text: 'Đồ em bé: tã, khăn, đồ chơi',  value: 'do_em_be'},	//minute
							{text: 'Khác',  value: 'khac'}
						],
						hidden: true
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
                    },
                    {
	                    xtype: 'textareafield',
						label: '',
	                    placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3,
						disabled: true			                    
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
	editCash: function() {
		var me = this;
		var typebuying = me._typeTF.getValue();
		var amount = me._amountTF.getValue();
		var typeText = me._typeTF._value.data.text;
		var note = me._noteTF.getValue();
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
		if (amount != prevAmount || typebuying != m.data.frombank || note != m.data.note || !prevDate.sameDateWith(me._selectedDate)) {
			var amount_change = amount - prevAmount;
			var type = m.data.type;
			
			if (type == 'thu') {//from expense
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(-amount_change)));
						return -1;
					}
				}
			} else if (type == 'chi') {//from expense
				if (amount_change > 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount_change)));
						return -1;
					}	
				}
				amount_change = -amount_change;
				typebuying = me._buyingtypeTF.getValue();
				typeText = me._buyingtypeTF._value.data.text;
				
			} else if (type == 'linh_lai') {//from saving
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount_change)));
						return -1;
					}	
				}
				
				if (m.data.source == 'saving') {
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					targetModel.data.last_paid_time = me._selectedDate.getTime();
					//targetModel.data.amount = (parseInt(targetModel.data.amount) + amount_change).toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
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
								MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
							});
						}
					});
				} else {
					alert(type + ' does not support');
					return 0;
				}
				//amount_change = -amount_change;
				
			} else if (type == 'nap') {//from expense
				if (amount_change > 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount_change)));
						return -1;
					}			
				}

				var targetModel;
				var hisModel;
				if (m.data.source == 'atm') {
					//update atm 1st
					targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
						return -1;
					}
					targetModel.data.amount = (parseInt(targetModel.data.amount) + amount_change).toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.AtmHistory');
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
				} else if (m.data.source == 'saving') {
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
						return -1;
					}
					targetModel.data.amount = (parseInt(targetModel.data.amount) + amount_change).toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
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
								MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
							});
						}
					});
				} else {
					alert(type + ' does not support');
					return 0;
				}
				//invert amount_change
				amount_change = -amount_change;
				
			} else if (type == 'rut') { //from expense
				if (amount_change < 0) {
					if (!AppUtil.canGetCash(Math.abs(amount_change))) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(-amount_change)));
						return -1;
					}
				}
				
	
				var targetModel;
				var hisModel;
				if (m.data.source == 'atm') {
					//update atm 1st
					targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
					if (!targetModel) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
						return -1;
					}
					var currentamount = parseInt(targetModel.data.amount);
					var newamount = currentamount - amount_change;
					if (newamount < 0) {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH_ATM, AppUtil.formatMoneyWithUnit(currentamount), AppUtil.formatMoneyWithUnit(currentamount-newamount)));
						return -1;
					}
					
					targetModel.data.amount = newamount.toString();
					targetModel.save();
					//update atm history 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.AtmHistory');
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
				} else if (m.data.source == 'saving') {
					//update atm 1st
					targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
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
					//update atm history 2nd			
					hisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
					//AppUtil.log('find record ' +  m.data.external_id);
					hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
						//AppUtil.log('found records');					
						AppUtil.log(records);
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
								MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
							});
						}
					});
				}  else {
					alert(type + ' does not support');
					return 0;
				}
				
				
			}  else {
				alert(type + ' does not support');
				return 0;
			}
			
			me._amountEditTF.setValue(AppUtil.formatMoneyWithUnit(amount));
			
			//m.data.buyingtype = buyingtype;
			if (type == 'thu' || type == 'chi') {
				m.data.buyingwhat = typeText;
				m.data.frombank = typebuying;
				m.data.note = note;
			}
			
			m.data.amount = amount.toString();
			m.data.time = me._selectedDate.getTime();
			m.data.dd = me._selectedDate.getDate();
			m.data.mm = me._selectedDate.getMonth();
			m.data.yy = me._selectedDate.getFullYear();
			if (m.data.week) m.data.week = Ext.Date.getWeekOfYear(me._selectedDate);
			
			m.save(function() {
				AppUtil.cashPlus(amount_change);
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
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
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount)));
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
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount)));
				return false;
			}
			
			var targetModel;
			var hisModel;
			if (m.data.source == 'atm') {
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
				hisModel = Ext.ModelManager.getModel('MyApp.model.AtmHistory');
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
						});
					}
				});
			} else if (m.data.source == 'saving') {
				//return money to ATM
				targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
				if (!targetModel) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
					return false;
				}
				var currentamount = parseInt(targetModel.data.amount);
				var newamount = currentamount + amount;
				targetModel.data.amount = newamount.toString();
				targetModel.save();
				//remove atm history
				hisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
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
			if (m.data.source == 'atm') {
				//return money to ATM
				targetModel = Ext.getStore('Atms').findRecord('atm_id', m.data.frombank);
				if (!targetModel) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_ATM_NOT_FOUND);
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
				//remove atm history
				hisModel = Ext.ModelManager.getModel('MyApp.model.AtmHistory');
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('atm_changed', foundModel.data.atm_id);
						});
					}
				});
			} else if (m.data.source == 'saving') {
				//return money to ATM
				targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
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
				//remove atm history
				hisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
						});
					}
				});
			}
			m.erase(function() {
				MyApp.app.fireEvent('expense_changed', me._selectedDate);
				AppUtil.cashPlus(amount);
				callback();
			});
		} else if (type == 'linh_lai') {
			if (!AppUtil.canGetCash(amount)) {
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, Ext.util.Format.format(AppUtil.MESSAGE_FAILED_EDIT_CASH, AppUtil.getCashFormat(), AppUtil.formatMoneyWithUnit(amount)));
				return false;
			}
			var targetModel;
			var hisModel;
			if (m.data.source == 'saving') {
				//return money to ATM
				targetModel = Ext.getStore('Savings').findRecord('saving_id', m.data.frombank);
				if (!targetModel) {
					MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_SAVING_NOT_FOUND);
					return false;
				}
				//find saving history
				var savinghisModel = Ext.ModelManager.getModel('MyApp.model.SavingHistory');
				savinghisModel.getProxy().findRecord('history_id', m.data.external_id, function(record1s){
					if (record1s.length > 0) {
						var foundModel = record1s[0];
						//check for prev or next linh_lai
						savinghisModel.getProxy().findRecord('last_paid_history_id', foundModel.data.history_id, function(record2s){
							if (record2s.length > 0) {//ko xoa vi chua phai linh lai sau cung
								MyApp.app.fireEvent('show_alert', AppUtil.TITLE_DELETE_DENY, AppUtil.MESSAGE_FAILED_SAVING_PAID_DELETE);
								return false;
							}
							
							//tim lan linh lai truoc do de cap nhat linh lai sau cung
							savinghisModel.getProxy().findRecord('history_id', foundModel.data.last_paid_history_id, function(record3s){
								if (record3s.length > 0) {
									var prevRec = record3s[0];
									
									targetModel.data.last_paid_history_id = prevRec.data.history_id;
									targetModel.data.last_paid_time = prevRec.data.time;
									targetModel.data.interest_paid_index = (parseInt(targetModel.data.interest_paid_index) - 1).toString();
			
								} else {
									targetModel.data.last_paid_history_id = '';
									targetModel.data.last_paid_time = targetModel.data.time;
									targetModel.data.interest_paid_index = '0';
								}
								targetModel.save();
									
								foundModel.erase(function() {
									MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
								});
								
								m.erase(function() {
									MyApp.app.fireEvent('expense_changed', me._selectedDate);
									AppUtil.cashMinus(amount);
									callback();
								});
								
							});
						});
					} else {
						MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ERROR, AppUtil.MESSAGE_FAILED_DELETE);
					return false;
					}
				});
				//targetModel.save();
				//remove atm history
				/*hisModel = new MyApp.model.SavingHistory();
				hisModel.getProxy().findRecord('history_id', m.data.external_id, function(records) {	
					if (records.length > 0) {
						var foundModel = records[0];
						foundModel.erase(function() {
							MyApp.app.fireEvent('saving_changed', foundModel.data.saving_id);
						});
					}
				});
				m.erase(function() {
					MyApp.app.fireEvent('expense_changed', me._selectedDate);
					AppUtil.cashMinus(amount);
					callback();
				});
				* */
			} else {
				alert(m.data.source + ' does not support');
				return false;
			}
			
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
		me._typeTF.hide();
		me._buyingtypeTF.hide();
		if (type == 'thu') {			
			me._typeTF.setValue(m.data.frombank);
			me._typeTF.show();
		} else if (type == 'chi') {
			me._buyingtypeTF.setValue(m.data.frombank);
			me._buyingtypeTF.show();
		}
		var amount = parseInt(m.data.amount);
		me._amountTF.setValue(amount);
		me._amountEditTF.setValue(AppUtil.formatMoneyWithUnit(amount));
		me._noteTF.setValue(m.data.note);
		me.updateSelectedDate(new Date(m.data.time));
		//setup title
		if (type == 'rut' || type == 'nap' || type == 'linh_lai') {
			me.setTitle(m.data.buyingwhat);
		} else me.setTitle('Chi tiết');
	},
	
	enterEditMode: function() {
		var me = this;
		var m = me.getExpenseModel();
		me.setEditMode(true);
		me._amountTF.show();
		me._amountEditTF.hide();
		me._typeTF.setReadOnly(false);
		me._buyingtypeTF.setReadOnly(false);
		
		if (m.data.type == 'thu' || m.data.type == 'chi') {
			me._noteTF.setReadOnly(false);
			me._noteTF.setDisabled(false);
		}	
	},
	
	exitEditMode: function() {
		var me = this;
		me.setEditMode(false);
		me._amountTF.hide();
		me._amountEditTF.show();
		me._typeTF.setReadOnly(true);
		me._buyingtypeTF.setReadOnly(true);
		me._noteTF.setReadOnly(true);
		me._noteTF.setDisabled(true);
	},


	assignFields: function() {
		var me = this;
		if (!me._typeTF) {
			me._typeTF = me.down('selectfield[name = "tradetype"]');
		}
		if (!me._dateTF) me._dateTF = me.down('textfield[name = "todaydate"]');
		if (!me._buyingtypeTF) me._buyingtypeTF = me.down('selectfield[name = "buyingtype"]');
		if (!me._amountTF) me._amountTF = me.down('numberfield[name = "amount"]');
		if (!me._amountEditTF) me._amountEditTF = me.down('textfield[name = "amounttf"]');
		if (!me._noteTF) me._noteTF = me.down('textareafield[name = "note"]');
	}
 });   