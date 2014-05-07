Ext.define('MyApp.controller.TabAtm', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.atm.AtmAdd',
		'MyApp.view.tab.atm.AtmDetail',
		'MyApp.view.tab.atm.AtmHistory',		
		'MyApp.view.tab.atm.AtmEdit',
		'MyApp.view.tab.atm.AtmTrade',
		'MyApp.view.tab.atm.AtmExpenseDetail',	
		'MyApp.view.tab.atm.SavingAdd',
		'MyApp.view.tab.atm.SavingDetail',
		'MyApp.view.tab.atm.SavingEdit',
		'MyApp.view.tab.atm.SavingHistory',
		'MyApp.view.tab.atm.SavingTrade',	
		'MyApp.view.tab.atm.SavingExpenseDetail',
		'MyApp.view.tab.atm.CashAdd',
		'MyApp.view.tab.atm.CashDetail',
		'MyApp.view.tab.atm.CashHistory',
		'MyApp.view.tab.expense.ExpenseDetail',
		'MyApp.view.tab.atm.InsuranceAdd',
		'MyApp.view.tab.atm.FundAdd',	
		'MyApp.view.tab.atm.LendBookAdd',		
		'MyApp.view.tab.atm.PaidBookAdd'
	],
    config: {
        refs: {		
			thisTab: 'tab_atm',
			thisMenuButton: 'tab_atm button[iconCls = "toolbar-icon-menu"]',
			thisAtmAdd: 'tab_atm_atmadd',
			thisAtmDetail: 'tab_atm_atmdetail',
			thisAtmTrade: 'tab_atm_atmtrade',
			thisAtmList: 'tab_atm_atmlist',
			thisSavingAdd: 'tab_atm_savingadd',
			thisSavingDetail: 'tab_atm_savingdetail',
			thisSavingList: 'tab_atm_savinglist',
			thisSavingTrade: 'tab_atm_savingtrade',
			thisInsuranceList: 'tab_atm_insurancelist'
        },//end refs
        control: {
			thisTab: {
				initialize: 'onTabInit',
				push: function(mee, view) {
					var me = this;
					me.getThisMenuButton().hide();
					mee.hideRightButtons();
					
					if (view.getId().indexOf('tab_atm_atmdetail') > -1 || 
						view.getId().indexOf('tab_atm_savingdetail') > -1) {
						mee.showRightButtons();
						
					} else if (view.getId().indexOf('tab_atm_cashadd') > -1 || 
						view.getId().indexOf('tab_atm_atmadd') > -1 ||
						view.getId().indexOf('tab_atm_savingadd') > -1||
						view.getId().indexOf('tab_atm_atmtrade') > -1 ||
						view.getId().indexOf('tab_atm_savingtrade') > -1||
						view.getId().indexOf('tab_atm_atmedit') > -1||
						view.getId().indexOf('tab_atm_savingedit') > -1) {
						mee.showDoneButton();
						
					} else if (view.getId().indexOf('tab_expense_expensedetail') > -1 ||
								view.getId().indexOf('tab_atm_atmexpensedetail') > -1||
								view.getId().indexOf('tab_atm_savingexpensedetail') > -1) {
						mee.showEditDeleteButtons();
					} else if (view.getId().indexOf('tab_atm_cashdetail') > -1) {
						mee.showEditButton();
					}
					if (!me._viewIdStack) me._viewIdStack = [];
					me._viewIdStack.push(view.getId());
				},
				pop: function(mee, view, level) {
					var me = this;
					if (level < 3) this.getThisMenuButton().show();							
					if (me._viewIdStack) Ext.Array.erase(me._viewIdStack, me._viewIdStack.length-1, 1);
				},
				
				back: function(mee, opts) {
					var me = this;
					mee.hideRightButtons();
					if (me._viewIdStack.length > 0) {
						var viewid = me._viewIdStack[me._viewIdStack.length-1];
						if (viewid.indexOf('tab_atm_atmdetail') > -1||
							viewid.indexOf('tab_atm_savingdetail') > -1	) {
							mee.showTradeEditDeleteButtons();
						} else if (viewid.indexOf('tab_atm_cashdetail') > -1) {
							mee.showEditButton();
						}
					} 
				}
			},
			//tab segmentbuttons
			'tab_atm segmentedbutton': {
				toggle: function(container, button, pressed){
					var me = this;
        			if (pressed == true) {
        				me.getThisTab().showTabAtIndex(button.config.viewIndex);					
					}
					                    
                }//end toogle
			},
			
			//bar buttons
			'tab_atm button[title="done"]': {
				tap: function() {
					var me = this;
					if (me._viewIdStack) {
						if (me._viewIdStack.length > 0) {
							var currentViewId = me._viewIdStack[me._viewIdStack.length-1];
							//AppUtil.log('trade tapped view id: ' + currentViewId);
							if (currentViewId.indexOf('tab_atm_cashadd') > -1) {
								var cashAddView = me.getCashAddView();
								if (cashAddView.addCash()) {
									me.getThisTab().onBackButtonTap();
								}	
							} else if (currentViewId.indexOf('tab_atm_atmadd') > -1) {
							
								if (me.getThisAtmAdd().addAtm(
									function() {
										me.getThisAtmList().updateStore();
									})
								) {						
									me.getThisTab().onBackButtonTap();	
								}		
								
							} else if (currentViewId.indexOf('tab_atm_savingadd') > -1) {
								if (me.getThisSavingAdd().addSaving(
									function() {
										me.getThisSavingList().updateStore();
									})
								) {						
									me.getThisTab().onBackButtonTap();	
								}	
							}  else if (currentViewId.indexOf('tab_atm_atmtrade') > -1) {
								var atmTradeView = me.getAtmTradeView();
								var atmDetail = me.getAtmDetailView();
								
								if (atmTradeView.doTrade()) {
									atmDetail.updateAtmModel();
									var m = atmTradeView.getAtmModel();
									m = m.copy();
									m = null;
									me.getThisTab().onBackButtonTap();	
								}
							}  else if (currentViewId.indexOf('tab_atm_savingtrade') > -1) {
								var atmTradeView = me.getSavingTradeView();
								var atmDetail = me.getSavingDetailView();
								
								if (atmTradeView.doTrade()) {
									atmDetail.updateSavingModel();
									var m = atmTradeView.getSavingModel();
									m = m.copy();
									m = null;
									this.getThisTab().onBackButtonTap();	
								}
							}  else if (currentViewId.indexOf('tab_atm_atmedit') > -1) {
								if (me.getAtmEditView().checkFields(
									function(name, bank, amount) {
										me.getAtmDetailView().editAtm(name, bank, amount);
									})
								) {						
									me.getThisTab().onBackButtonTap();	
								}	
							} else if (currentViewId.indexOf('tab_atm_savingedit') > -1) {
								if (me.getSavingEditView().checkFields(
									function(data) {
										me.getSavingDetailView().editSaving(data);
									})
								) {						
									me.getThisTab().onBackButtonTap();	
								}	
							} else if (currentViewId.indexOf('tab_expense_expensedetail') > -1) {
								var view = me.getExpenseDetailView();
								var r = view.editCash();
								if (r >= 0) {
									view.exitEditMode();
									me.getThisTab().hideRightButtons();
									me.getThisTab().showEditDeleteButtons();
								}	
							} else if (currentViewId.indexOf('tab_atm_atmexpensedetail') > -1) {
								var view = me.getAtmExpenseDetailView();
								var r = view.editCash();
								if (r >= 0) {
									view.exitEditMode();
									me.getThisTab().hideRightButtons();
									me.getThisTab().showEditDeleteButtons();
								}	
							} else if (currentViewId.indexOf('tab_atm_savingexpensedetail') > -1) {
								var view = me.getSavingExpenseDetailView();
								var r = view.editCash();
								if (r >= 0) {
									view.exitEditMode();
									me.getThisTab().hideRightButtons();
									me.getThisTab().showEditDeleteButtons();
								}	
							} else if (currentViewId.indexOf('tab_atm_cashdetail') > -1) {
								var view = me.getCashDetailView();
								var r = view.editCash();
								if (r >= 0) {
									view.exitEditMode();
									me.getThisTab().hideRightButtons();
									me.getThisTab().showEditButton();
								}	
							}
						}						
					}
				}
			},
			'tab_atm button[title="trade"]': {
				tap: function() {
					var me = this;
					if (me._viewIdStack) {
						if (me._viewIdStack.length > 0) {
							var currentViewId = me._viewIdStack[me._viewIdStack.length-1];
							//AppUtil.log('trade tapped view id: ' + currentViewId);
							if (currentViewId.indexOf('tab_atm_atmdetail') > -1) {
								var atmTradeView = me.getAtmTradeView();
								var atmDetail = me.getAtmDetailView();
								atmTradeView.resetView();
								atmTradeView.setAtmModel(atmDetail.getAtmModel());
								atmTradeView.updateAtmModel2();
								me.getThisTab().push(atmTradeView);
								
							} else if (currentViewId.indexOf('tab_atm_savingdetail') > -1) {
								var atmTradeView = me.getSavingTradeView();
								var atmDetail = me.getSavingDetailView();
								atmTradeView.resetView();
								atmTradeView.setSavingModel(atmDetail.getSavingModel());
								atmTradeView.updateSavingModel2();
								me.getThisTab().push(atmTradeView);
							} 
						}						
					}
				}
			},
			'tab_atm button[title="edit"]': {
				tap: function() {
					var me = this;
					if (me._viewIdStack) {
						if (me._viewIdStack.length > 0) {
							var currentViewId = me._viewIdStack[me._viewIdStack.length-1];
							//AppUtil.log('trade tapped view id: ' + currentViewId);
							if (currentViewId.indexOf('tab_atm_atmdetail') > -1) {
								var atmEdit = this.getAtmEditView();
								atmEdit.updateAtmInfo(this.getAtmDetailView().getAtmModel());
								this.getThisTab().push(atmEdit);	
							} else if (currentViewId.indexOf('tab_atm_savingdetail') > -1) {
								var savingEdit = this.getSavingEditView();
								savingEdit.updateSavingInfo(this.getSavingDetailView().getSavingModel());
								this.getThisTab().push(savingEdit);
								
							} else if (currentViewId.indexOf('tab_expense_expensedetail') > -1) {
								var view = this.getExpenseDetailView();
								view.enterEditMode();
								me.getThisTab().hideRightButtons();
								me.getThisTab().showDoneButton();
							} else if (currentViewId.indexOf('tab_atm_atmexpensedetail') > -1) {
								var view = this.getAtmExpenseDetailView();
								view.enterEditMode();
								me.getThisTab().hideRightButtons();
								me.getThisTab().showDoneButton();
							} else if (currentViewId.indexOf('tab_atm_savingexpensedetail') > -1) {
								var view = this.getSavingExpenseDetailView();
								view.enterEditMode();
								me.getThisTab().hideRightButtons();
								me.getThisTab().showDoneButton();
							} else if (currentViewId.indexOf('tab_atm_cashdetail') > -1) {
								var view = this.getCashDetailView();
								view.enterEditMode();
								me.getThisTab().hideRightButtons();
								me.getThisTab().showDoneButton();
							} 
							
							
						}						
					}
				}
			},
			'tab_atm button[title="delete"]': {
				tap: function() {
					//AppUtil.log('delete tapped');
					var me = this;
					if (me._viewIdStack) {
						if (me._viewIdStack.length > 0) {
							var currentViewId = me._viewIdStack[me._viewIdStack.length-1];
							//AppUtil.log('trade tapped view id: ' + currentViewId);
							if (currentViewId.indexOf('tab_atm_atmdetail') > -1) {
								var atmDetail = this.getAtmDetailView();
								var me = this;
								this.getApplication().fireEvent('show_confirm', AppUtil.CONFIRM_ATM_DELETE, function(){
									atmDetail.deleteAtm();
									me.getThisTab().onBackButtonTap();
								});	
							} else if (currentViewId.indexOf('tab_atm_savingdetail') > -1) {
								var atmDetail = this.getSavingDetailView();
								var me = this;
								this.getApplication().fireEvent('show_confirm', AppUtil.CONFIRM_ATM_DELETE, function(){
									atmDetail.deleteSaving();
									me.getThisTab().onBackButtonTap();
								});	
							} else if (currentViewId.indexOf('tab_expense_expensedetail') > -1) {
								var view = this.getExpenseDetailView();
								var me = this;
								var title = '';
								if (view.getExpenseModel().data.type == 'thu') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_THU;
								} else if (view.getExpenseModel().data.type == 'chi') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_CHI;
								} else if (view.getExpenseModel().data.type == 'rut' || view.getExpenseModel().data.type == 'rut_tien') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_RUT;
								} else if (view.getExpenseModel().data.type == 'nap' || view.getExpenseModel().data.type == 'nap_tien') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_NAP;
								} 
								this.getApplication().fireEvent('show_confirm', title, function(){
									view.erase(function() {
										me.getThisTab().onBackButtonTap();
									});
									
								});	
							} else if (currentViewId.indexOf('tab_atm_atmexpensedetail') > -1) {
								var view = this.getAtmExpenseDetailView();
								var me = this;
								var title = '';
								if (view.getExpenseModel().data.type == 'rut_tien') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_RUT;
								} else if (view.getExpenseModel().data.type == 'nap_tien') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_NAP;
								} else if (view.getExpenseModel().data.type == 'nhan_luong') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_ATM_NHAN_LUONG;
								} else if (view.getExpenseModel().data.type == 'chuyen_khoan') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_ATM_CHUYEN_KHOAN;
								} else if (view.getExpenseModel().data.type == 'tao_moi') {
									title = AppUtil.CONFIRM_CASH_DETAIL_DELETE_ATM_CHUYEN_KHOAN;
									
									this.getApplication().fireEvent('show_alert', AppUtil.TITLE_DELETE_DENY, AppUtil.MESSAGE_CAN_NOT_DELETE);
									return;
								
								}
								this.getApplication().fireEvent('show_confirm', title, function(){
									view.erase(function() {
										me.getThisTab().onBackButtonTap();
									});
									
								});	
							}
						}						
					}
					
				}
			},
			//tab
			'tab_atm button[title = "moneyadd"]': {
				tap: function() {
					//console.log('tap tap');
					var me = this;
					var cashAddView = me.getCashAddView();
					cashAddView.resetView();
					me.getThisTab().push(cashAddView);
				}
			},
			'tab_atm button[title = "moneydetail"]': {
				tap: function() {
					//console.log('tap tap');
					var me = this;
					var cashDetailView = me.getCashDetailView();
					cashDetailView.resetView();
					me.getThisTab().push(cashDetailView);
				}
			},
			
			//CashDetail
			'tab_atm_cashdetail button[title = "cashdetailhistorybutton"]': {
				tap: function() {
					var atmHistory = this.getCashHistoryView();
					atmHistory.loadData();
					this.getThisTab().push(atmHistory);
				}				
			},
			'tab_atm_atmtrade textfield[name = "tradedate"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var savingAddView = this.getThisAtmTrade();
					var dp = this.getDatePicker(savingAddView.getSelectedDate(), savingAddView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//SavingTrade
			'tab_atm_savingtrade textfield[name = "tradedate"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var savingAddView = this.getThisSavingTrade();
					var dp = this.getDatePicker(savingAddView.getSelectedDate(), savingAddView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//Atm
			'tab_atm_atm button[title = "atmadd"]': {
				tap: function(btn, e) {
					//console.log('tap tap');
					var atmAddView = this.getAtmAddView();
					atmAddView.resetView();
					this.getThisTab().push(atmAddView);
					e.preventDefault();
					return false;
				}
			},
			'tab_atm_saving button[title = "savingadd"]': {
				tap: function(btn, e) {
					//console.log('tap tap');
					var atmAddView = this.getSavingAddView();
					atmAddView.resetView();
					this.getThisTab().push(atmAddView);
					e.preventDefault();
					return false;
				}
			},
			//AtmList
			'tab_atm_atmlist': {
				itemtap: function(view, index, item, e) {
				//disclose: function( view, record, target, index, e, eOpts ) {
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
				//disclose: function( view, record, target, index, e, eOpts ) {
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
			//SavingEdit
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
			
			//CASH ADD
			'tab_atm_cashadd textfield[name = "todaydate"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var addView = this.getCashAddView();
					var dp = this.getDatePicker(addView.getSelectedDate(), addView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//CASH DETAIL
			'tab_atm_cashdetail list': {
				itemtap: function(view, index, item, e) {
				//disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var cHisDetail = this.getExpenseDetailView();				
					cHisDetail.setExpenseModel(rec);
					cHisDetail.resetView();
					me.getThisTab().push(cHisDetail);
				}				
			},
			//CASH HISTORY DETAIL
			'tab_expense_expensedetail textfield[name = "todaydate"]' : {
				focus: function(tf) {
					var view = this.getExpenseDetailView();
					if (view.getEditMode()) {
						var dp = this.getDatePicker(view.getSelectedDate(), view, tf);
						Ext.Viewport.add(dp);
						dp.show();
					}			
				}
			},
			//ATM EXPENSE DETAIL
			'tab_atm_atmexpensedetail textfield[name = "todaydate"]' : {
				focus: function(tf) {
					var view = this.getAtmExpenseDetailView();
					if (view.getEditMode()) {
						var dp = this.getDatePicker(view.getSelectedDate(), view, tf);
						Ext.Viewport.add(dp);
						dp.show();
					}			
				}
			},
			'tab_atm_savingexpensedetail textfield[name = "todaydate"]' : {
				focus: function(tf) {
					var view = this.getSavingExpenseDetailView();
					if (view.getEditMode()) {
						var dp = this.getDatePicker(view.getSelectedDate(), view, tf);
						Ext.Viewport.add(dp);
						dp.show();
					}			
				}
			},
			//CASH HISTORY
			'tab_atm_cashhistory list': {
				itemtap: function(view, index, item, e) {
				//disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var cHisDetail = this.getExpenseDetailView();				
					cHisDetail.setExpenseModel(rec);
					cHisDetail.resetView();
					me.getThisTab().push(cHisDetail);
				}				
			},
			//SavingAdd
			'tab_atm_savingadd textfield[name = "created_date"]' : {
				focus: function(tf) {
					var savingAddView = this.getThisSavingAdd();
					var dp = this.getDatePicker(savingAddView.getSelectedDate(), savingAddView, tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			//end SavingAdd
			
			//AtmDetail
			'tab_atm_atmdetail button[title = "atmdetailhistorybutton"]': {
				tap: function() {
					var atmHistory = this.getAtmHistoryView();
					var atmDetail = this.getAtmDetailView();
					atmHistory.loadData(atmDetail.getAtmModel());
					this.getThisTab().push(atmHistory);
				}				
			},
			'tab_atm_atmdetail list': {
				itemtap: function(view, index, item, e) {
				//disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var cHisDetail = this.getAtmExpenseDetailView();				
					cHisDetail.setExpenseModel(rec);
					cHisDetail.resetView();
					me.getThisTab().push(cHisDetail);
				}				
			},
			//end AtmDetail
			//SavingDetail
			'tab_atm_savingdetail button[title = "savingdetailhistorybutton"]': {
				tap: function() {
					var atmHistory = this.getSavingHistoryView();
					var atmDetail = this.getSavingDetailView();
					atmHistory.loadData(atmDetail.getSavingModel());
					this.getThisTab().push(atmHistory);
				}				
			},
			'tab_atm_savingdetail list': {
				itemtap: function(view, index, item, e) {
				//disclose: function( view, record, target, index, e, eOpts ) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var cHisDetail = this.getSavingExpenseDetailView();				
					cHisDetail.setExpenseModel(rec);
					cHisDetail.resetView();
					me.getThisTab().push(cHisDetail);
				}			
			},
			//end SavingDetail
			
			//INSURANCE
			'tab_atm_insurance button[title="insuranceadd"]': {
				tap: function() {
					var addView = this.getInsuranceAddView();
					addView.resetView();
					this.getThisTab().push(addView);
				}
			},
			//INSURANCE ADD
			'tab_atm_insuranceadd button[title="insuranceaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();
				}
			},
			'tab_atm_insuranceadd button[title="insuranceaddsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getInsuranceAddView().addInsurance(
						function() {
							me.getThisInsuranceList().updateStore();
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}	
				}
			},
			
			//FUND
			'tab_atm_fund button[title="fundadd"]': {
				tap: function() {
					var addView = this.getFundAddView();
					addView.resetView();
					this.getThisTab().push(addView);
				}
			},
			//FUND ADD
			'tab_atm_fundadd button[title="fundaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();
				}
			},
			'tab_atm_fundadd button[title="fundaddsubmitbutton"]': {
				tap: function() {
					
				}
			},
			
			//LENDBOOK
			'tab_atm_lendbook button[title="lendbookadd"]': {
				tap: function() {
					var addView = this.getLendBookAddView();
					addView.resetView();
					this.getThisTab().push(addView);
				}
			},
			//LENDBOOK ADD
			'tab_atm_lendbookadd button[title="lendbookaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();
				}
			},
			'tab_atm_lendbookadd button[title="lendbookaddsubmitbutton"]': {
				tap: function() {
					
				}
			},
			
			//PAIDBOOK
			'tab_atm_paidbook button[title="paidbookadd"]': {
				tap: function() {
					var addView = this.getPaidBookAddView();
					addView.resetView();
					this.getThisTab().push(addView);
				}
			},
			//PAIDBOOK ADD
			'tab_atm_paidbookadd button[title="paidbookaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();
				}
			},
			'tab_atm_paidbookadd button[title="paidbookaddsubmitbutton"]': {
				tap: function() {
					
				}
			}
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
	getAtmTradeView: function() {
		var me = this;	
		if (!me._atmTradeView) {
			me._atmTradeView = Ext.create('MyApp.view.tab.atm.AtmTrade');
		}
		return me._atmTradeView;
	},
	getSavingTradeView: function() {
		var me = this;	
		if (!me._savingTradeView) {
			me._savingTradeView = Ext.create('MyApp.view.tab.atm.SavingTrade');
		}
		return me._savingTradeView;
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
	getCashAddView: function() {
		var me = this;	
		if (!me._cashAddView) {
			me._cashAddView = Ext.create('MyApp.view.tab.atm.CashAdd');
		}
		return me._cashAddView;
	},
	getCashDetailView: function() {
		var me = this;	
		if (!me._cashDetailView) {
			me._cashDetailView = Ext.create('MyApp.view.tab.atm.CashDetail');
		}
		return me._cashDetailView;
	},
	getCashHistoryView: function() {
		var me = this;	
		if (!me._cashHisView) {
			me._cashHisView = Ext.create('MyApp.view.tab.atm.CashHistory');
		}
		return me._cashHisView;
	},
	getExpenseDetailView: function() {
		var me = this;	
		if (!me._cashHisDetailView) {
			me._cashHisDetailView = Ext.create('MyApp.view.tab.expense.ExpenseDetail');
		}
		return me._cashHisDetailView;
	},
	getAtmExpenseDetailView: function() {
		var me = this;	
		if (!me._atmHisDetailView) {
			me._atmHisDetailView = Ext.create('MyApp.view.tab.atm.AtmExpenseDetail');
		}
		return me._atmHisDetailView;
	},
	getSavingExpenseDetailView: function() {
		var me = this;	
		if (!me._savingHisDetailView) {
			me._savingHisDetailView = Ext.create('MyApp.view.tab.atm.SavingExpenseDetail');
		}
		return me._savingHisDetailView;
	},
	getInsuranceAddView: function() {
		var me = this;	
		if (!me._insuranceAddView) {
			me._insuranceAddView = Ext.create('MyApp.view.tab.atm.InsuranceAdd');
		}
		return me._insuranceAddView;
	},
	getFundAddView: function() {
		var me = this;	
		if (!me._fundAddView) {
			me._fundAddView = Ext.create('MyApp.view.tab.atm.FundAdd');
		}
		return me._fundAddView;
	},
	getLendBookAddView: function() {
		var me = this;	
		if (!me._lendbookAddView) {
			me._lendbookAddView = Ext.create('MyApp.view.tab.atm.LendBookAdd');
		}
		return me._lendbookAddView;
	},
	getPaidBookAddView: function() {
		var me = this;	
		if (!me._paidbookAddView) {
			me._paidbookAddView = Ext.create('MyApp.view.tab.atm.PaidBookAdd');
		}
		return me._paidbookAddView;
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
			var now = new Date();
			date.setMinutes(now.getMinutes());
			date.setHours(now.getHours());
			opts.view.updateSelectedDate(Ext.Date.clone(date));
		}
	}
});