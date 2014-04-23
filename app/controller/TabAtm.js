Ext.define('MyApp.controller.TabAtm', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.atm.AtmAdd',
		'MyApp.view.tab.atm.AtmDetail',
		'MyApp.view.tab.atm.AtmHistory',		
		'MyApp.view.tab.atm.AtmEdit',
		
		'MyApp.view.tab.atm.SavingAdd',
		'MyApp.view.tab.atm.SavingDetail',
		'MyApp.view.tab.atm.SavingEdit',
		'MyApp.view.tab.atm.SavingHistory'
	],
    config: {
        refs: {		
			thisTab: 'tab_atm',
			thisMenuButton: 'tab_atm button[iconCls = "toolbar-icon-menu"]',
			thisAtmAdd: 'tab_atm_atmadd',
			thisAtmList: 'tab_atm_atmlist',
			thisSavingAdd: 'tab_atm_savingadd',
			thisSavingList: 'tab_atm_savinglist'
        },//end refs
        control: {
			thisTab: {
				initialize: 'onTabInit',
				push: function(me, view) {
					this.getThisMenuButton().hide();
				},
				pop: function(me, view, level) {
					if (level < 3) this.getThisMenuButton().show();
				},
			},
			'tab_atm_atm button[title = "atmadd"]': {
				tap: function() {
					//console.log('tap tap');
					var atmAddView = this.getAtmAddView();
					atmAddView.resetView();
					this.getThisTab().push(atmAddView);
				}
			},
			'tab_atm_saving button[title = "savingadd"]': {
				tap: function() {
					//console.log('tap tap');
					var atmAddView = this.getSavingAddView();
					atmAddView.resetView();
					this.getThisTab().push(atmAddView);
				}
			},
			//AtmList
			'tab_atm_atmlist': {
				itemtap: function(view, index, item, e) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var atmDetail = this.getAtmDetailView();
					//atmDetail.setAtmModel(null);
					atmDetail.setAtmModel(rec);
					atmDetail.setCallbackFunc(function() {
							//console.log('callback delete');
							me.getThisAtmList().updateStore();
							//atmDetail.updateRecentStore();
						});
					me.getThisTab().push(atmDetail);
				}				
			},
			//SavingList
			'tab_atm_savinglist': {
				itemtap: function(view, index, item, e) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var savingDetail = this.getSavingDetailView();
					//atmDetail.setAtmModel(null);
					savingDetail.setSavingModel(rec);
					savingDetail.setCallbackFunc(function() {
							me.getThisSavingList().updateStore();							
						});
					me.getThisTab().push(savingDetail);
				}				
			},
			//AtmEdit
			'tab_atm_atmedit button[title = "atmeditcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_atmedit button[title = "atmeditsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getAtmEditView().checkFields(
						function(name, bank, amount) {
							me.getAtmDetailView().editAtm(name, bank, amount);
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			//end AtmEdit
			//SavingEdit
			'tab_atm_savingedit button[title = "savingeditcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_savingedit button[title = "savingeditsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getSavingEditView().checkFields(
						function(data) {
							me.getSavingDetailView().editSaving(data);
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			'tab_atm_savingedit textfield[name = "created_date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var savingEditView = this.getSavingEditView();
					var dp = this.getDatePicker(savingEditView.getSelectedDate(), savingEditView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//end SavingEdit
			//AtmAdd
			'tab_atm_atmadd button[title = "atmaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_atmadd button[title = "atmaddsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getThisAtmAdd().addAtm(
						function() {
							me.getThisAtmList().updateStore();
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			//end AtmAdd
			//SavingAdd
			'tab_atm_savingadd button[title = "savingaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_savingadd button[title = "savingaddsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getThisSavingAdd().addSaving(
						function() {
							me.getThisSavingList().updateStore();
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			'tab_atm_savingadd textfield[name = "created_date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var savingAddView = this.getThisSavingAdd();
					var dp = this.getDatePicker(savingAddView.getSelectedDate(), savingAddView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//end SavingAdd
			
			//AtmDetail
			'tab_atm_atmdetail button[title = "atmdetailcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetaileditbutton"]': {
				tap: function() {
					var atmEdit = this.getAtmEditView();
					atmEdit.updateAtmInfo(this.getAtmDetailView().getAtmModel());
					this.getThisTab().push(atmEdit);	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailpushinbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					//atmDetail.editAtm();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_PUSHIN, function(money){
						//console.log('NAP: ', money);
						atmDetail.pushInMoney(money);
					});	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailpushoutbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_PUSHOUT, function(money){
						atmDetail.pushOutMoney(money);
					});	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailhistorybutton"]': {
				tap: function() {
					var atmHistory = this.getAtmHistoryView();
					var atmDetail = this.getAtmDetailView();
					atmHistory.loadData(atmDetail.getAtmModel());
					this.getThisTab().push(atmHistory);
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailsalarybutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_CHECKIN, function(money){
						atmDetail.checkInMoney(money);
					});	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailtransferbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_CHECKOUT, function(money){
						atmDetail.checkOutMoney(money);
					});	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetaildeletebutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					var me = this;
					this.getApplication().fireEvent('show_confirm', AppUtil.CONFIRM_ATM_DELETE, function(){
						atmDetail.deleteAtm();
						me.getThisTab().onBackButtonTap();
					});	
				}				
			},			
			//end AtmDetail
			//SavingDetail
			'tab_atm_savingdetail button[title = "savingdetailpaidbutton"]': {
				tap: function() {
					var sDetail = this.getSavingDetailView();
					var me = this;
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_LINHLAI, function(money){
						sDetail.paid(money);
					});	
				}				
			},		
			'tab_atm_savingdetail button[title = "savingdetailpushinbutton"]': {
				tap: function() {
					var sDetail = this.getSavingDetailView();
					//atmDetail.editAtm();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_PUSHIN, function(money){
						//console.log('NAP: ', money);
						sDetail.pushInMoney(money);
					});	
				}				
			},
			'tab_atm_savingdetail button[title = "savingdetailpushoutbutton"]': {
				tap: function() {
					var sDetail = this.getSavingDetailView();
					this.getApplication().fireEvent('show_moneyinputpopup', AppUtil.TITLE_PUSHOUT, function(money){
						sDetail.pushOutMoney(money);
					});	
				}				
			},
			'tab_atm_savingdetail button[title = "savingdetaileditbutton"]': {
				tap: function() {
					var sEdit = this.getSavingEditView();
					sEdit.updateSavingInfo(this.getSavingDetailView().getSavingModel());
					this.getThisTab().push(sEdit);	
				}				
			},
			'tab_atm_savingdetail button[title = "savingdetaildeletebutton"]': {
				tap: function() {
					var sEdit = this.getSavingDetailView();
					var me = this;
					this.getApplication().fireEvent('show_confirm', AppUtil.CONFIRM_SAVING_DELETE, function(){
						sEdit.deleteSaving();
						me.getThisTab().onBackButtonTap();
					});	
				}				
			},	
			'tab_atm_savingdetail button[title = "savingdetailhistorybutton"]': {
				tap: function() {
					var atmHistory = this.getSavingHistoryView();
					var atmDetail = this.getSavingDetailView();
					atmHistory.loadData(atmDetail.getSavingModel());
					this.getThisTab().push(atmHistory);
				}				
			},
			//end SavingDetail
		}
    },
	
	onTabInit: function() {		
		
	},
	
	getAtmAddView: function() {
		var me = this;	
		if (!me._atmAddView) {
			me._atmAddView = Ext.create('MyApp.view.tab.atm.AtmAdd');
		}
		return me._atmAddView;
	},
	getSavingAddView: function() {
		var me = this;	
		if (!me._savingAddView) {
			me._savingAddView = Ext.create('MyApp.view.tab.atm.SavingAdd');
		}
		return me._savingAddView;
	},
	getAtmDetailView: function() {
		var me = this;	
		if (!me._atmDetailView) {
			me._atmDetailView = Ext.create('MyApp.view.tab.atm.AtmDetail');
		}
		return me._atmDetailView;
	},
	getSavingDetailView: function() {
		var me = this;	
		if (!me._savingDetailView) {
			me._savingDetailView = Ext.create('MyApp.view.tab.atm.SavingDetail');
		}
		return me._savingDetailView;
	},
	getAtmEditView: function() {
		var me = this;	
		if (!me._atmEditView) {
			me._atmEditView = Ext.create('MyApp.view.tab.atm.AtmEdit');
		}
		return me._atmEditView;
	},
	getSavingEditView: function() {
		var me = this;	
		if (!me._savingEditView) {
			me._savingEditView = Ext.create('MyApp.view.tab.atm.SavingEdit');
		}
		return me._savingEditView;
	},
	getAtmHistoryView: function() {
		var me = this;	
		if (!me._atmHistoryView) {
			me._atmHistoryView = Ext.create('MyApp.view.tab.atm.AtmHistory');
		}
		return me._atmHistoryView;
	},
	getSavingHistoryView: function() {
		var me = this;	
		if (!me._savingHistoryView) {
			me._savingHistoryView = Ext.create('MyApp.view.tab.atm.SavingHistory');
		}
		return me._savingHistoryView;
	},
	getDatePicker: function(date, view, tf) {
		var me = this;	
		if (!me._datepicker) {
			me._datepicker = Ext.create('Ext.picker.Date', {
				 //doneButton: 'Xong',
	       		 //cancelButton: 'Hủy' 
			});			
		}
		me._datepicker.setValue(date);
		me._datepicker.un('change', me.onDatePickerDone, me);
		me._datepicker.on('change', me.onDatePickerDone, me, {view: view, tf: tf});
		return me._datepicker;
	},
	onDatePickerDone: function(dp, date, opts) {
		//console.log('onDatePickerDone: ' + date.format('dd/mm/yyyy'));
		if (opts) {
			//opts.tf.setValue(date.format('dd/mm/yyyy'));
			opts.view.updateSelectedDate(date);
		}
	}
});