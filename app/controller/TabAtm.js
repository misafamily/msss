Ext.define('MyApp.controller.TabAtm', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.atm.AtmAdd',
		'MyApp.view.tab.atm.AtmDetail',
		'MyApp.view.tab.atm.AtmHistory',		
		'MyApp.view.tab.atm.AtmEdit',
		
		'MyApp.view.tab.atm.SavingAdd',
		'MyApp.view.tab.atm.SavingDetail'
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
		}
    },
	
	onTabInit: function() {		
		
	},
	
	getAtmAddView: function() {
		if (!this._atmAddView) {
			this._atmAddView = Ext.create('MyApp.view.tab.atm.AtmAdd');
		}
		return this._atmAddView;
	},
	getSavingAddView: function() {
		if (!this._savingAddView) {
			this._savingAddView = Ext.create('MyApp.view.tab.atm.SavingAdd');
		}
		return this._savingAddView;
	},
	getAtmDetailView: function() {
		if (!this._atmDetailView) {
			this._atmDetailView = Ext.create('MyApp.view.tab.atm.AtmDetail');
		}
		return this._atmDetailView;
	},
	getSavingDetailView: function() {
		if (!this._savingDetailView) {
			this._savingDetailView = Ext.create('MyApp.view.tab.atm.SavingDetail');
		}
		return this._savingDetailView;
	},
	getAtmEditView: function() {
		if (!this._atmEditView) {
			this._atmEditView = Ext.create('MyApp.view.tab.atm.AtmEdit');
		}
		return this._atmEditView;
	},
	getAtmHistoryView: function() {
		if (!this._atmHistoryView) {
			this._atmHistoryView = Ext.create('MyApp.view.tab.atm.AtmHistory');
		}
		return this._atmHistoryView;
	},
	getDatePicker: function(date, view, tf) {
		if (!this._datepicker) {
			this._datepicker = Ext.create('Ext.picker.Date', {
				 //doneButton: 'Xong',
	       		 //cancelButton: 'Hủy' 
			});			
		}
		this._datepicker.setValue(date);
		this._datepicker.un('change', this.onDatePickerDone, this);
		this._datepicker.on('change', this.onDatePickerDone, this, {view: view, tf: tf});
		return this._datepicker;
	},
	onDatePickerDone: function(dp, date, opts) {
		//console.log('onDatePickerDone: ' + date.format('dd/mm/yyyy'));
		if (opts) {
			//opts.tf.setValue(date.format('dd/mm/yyyy'));
			opts.view.updateSelectedDate(date);
		}
	}
});