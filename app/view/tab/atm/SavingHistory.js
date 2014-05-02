Ext.define('MyApp.view.tab.atm.SavingHistory', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_savinghistory',
    requires: [
    	 
    ],
    config: {
    	emptyListOnHide: true,
    	savingModel: null,
    	title: 'Lịch sử giao dịch',
        layout:{
			type:'vbox'
		},
		//cls:'atm-form-container',
		items:[
			
           {
				xclass:'MyApp.view.component.AppListPull',
				cls: 'atm-atmhistory',
				store: 'SavingHistories',  	
		       	itemTpl: new Ext.XTemplate(
		       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
							['<div class="info">',
								'<div class="dateinfo">',
									'<div class="dateicon"></div>',
									'<div class="datetime">{time:this.formatDateTime}</div>', //Tên: 
								'</div>',	
								'<div class="actioninfo">',
									'<div class="actionicon {type}"></div>',
									'<div class="description">{description}</div>',  //Ngân hàng: 
								'</div>',	
							'</div>',
							'<div class="amountinfo">',
								'<div class="amounticon {type}"></div>',
								'<div class="amount {type}">{amount:this.format}</div>',
							'</div>',		
							'<div class="moneycardinfo">',
								'<div class="moneycardicon"></div>',
								'<div class="moneycard">{moneycard:this.format}</div>',
							'</div>'		
							].join(''),
							{
								formatDateTime:function(time) {
									return AppUtil.formatDateTime(new Date(time));
								},
								format: function(amount) {
									return AppUtil.formatMoneyWithUnit(amount);
								}	
							}
		       		)
			}
           
		]
    },
	
	loadData: function(atmModel) {
		var me = this;
		//me.setSavingModel(atmModel);
		
		if (!me._list) me._list = me.down('list');
		
		//me._list.getScrollable().getScroller().scrollToTop();
		var store = me._list.getStore();
		//store.removeAll();
		
		AppUtil.offline.updateStoreQuery(store, 'SavingHistories', {saving_id: atmModel.data.saving_id});
		store.loadPage(1);
	}
	
	
 });   