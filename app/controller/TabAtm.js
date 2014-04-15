Ext.define('MyApp.controller.TabAtm', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.atm.AtmAdd',
		'MyApp.view.tab.atm.AtmDetail',
		'MyApp.view.tab.atm.AtmHistory'
	],
    config: {
        refs: {		
			thisTab: 'tab_atm',
			thisMenuButton: 'tab_atm button[iconCls = "toolbar-icon-menu"]',
			thisAtmAdd: 'tab_atm_atmadd',
			thisAtmList: 'tab_atm_atmlist'
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
			//AtnList
			'tab_atm_atmlist': {
				itemtap: function(view, index, item, e) {
					var me = this;
					var rec = view.getStore().getAt(index);
					var atmDetail = this.getAtmDetailView();
					atmDetail.setAtmModel(rec);
					atmDetail.setCallbackFunc(function() {
							me.getThisAtmList().updateStore();
						});
					me.getThisTab().push(atmDetail);
				}				
			},
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
			
			//AtmDetail
			'tab_atm_atmdetail button[title = "atmdetailcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetaileditbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					atmDetail.editAtm();	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailpushinbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					//atmDetail.editAtm();
					this.getApplication().fireEvent('show_moneyinputpopup', 'Chuyển tiền mặt vào tài khoản', function(money){
						//console.log('NAP: ', money);
						atmDetail.pushInMoney(money);
					});	
				}				
			},
			'tab_atm_atmdetail button[title = "atmdetailpushoutbutton"]': {
				tap: function() {
					var atmDetail = this.getAtmDetailView();
					//atmDetail.editAtm();
					this.getApplication().fireEvent('show_moneyinputpopup', 'Rút tiền từ tài khoản', function(money){
						//console.log('RUT: ', money);
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
	getAtmDetailView: function() {
		if (!this._atmDetailView) {
			this._atmDetailView = Ext.create('MyApp.view.tab.atm.AtmDetail');
		}
		return this._atmDetailView;
	},
	getAtmHistoryView: function() {
		if (!this._atmHistoryView) {
			this._atmHistoryView = Ext.create('MyApp.view.tab.atm.AtmHistory');
		}
		return this._atmHistoryView;
	}
});