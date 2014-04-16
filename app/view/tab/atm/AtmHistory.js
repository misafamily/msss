Ext.define('MyApp.view.tab.atm.AtmHistory', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_atmhistory',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	title: 'Lịch sử giao dịch',
        layout:{
			type:'vbox'
		},
		//cls:'atm-form-container',
		items:[
			
           {
				xclass:'MyApp.view.component.AppList',
				cls: 'atm-atmhistory',
				store: 'AtmHistories',  	
		       	itemTpl: new Ext.XTemplate(
		       				//'<div class="thumb">{dd}<br/>{monthname}</div>',
							['<div class="info">',
								'<div class="dateinfo">',
									'<div class="dateicon"></div>',
									'<div class="datetime">{time:this.formatDateTime}</div>', //Tên: 
								'</div>',	
								'<div class="actioninfo">',
									'<tpl if="this.isRutTien(type)">',
										'<div class="actionicon rut_tien"></div>',
									'<tpl else>',
										'<div class="actionicon"></div>',
									'</tpl>',	
									'<div class="description">{description}</div>',  //Ngân hàng: 
								'</div>',	
							'</div>',
							'<div class="amountinfo">',
								'<div class="amounticon"></div>',
								'<div class="amount">{amount:this.format}</div>',
							'</div>',					
							].join(''),
							{
								isRutTien: function(type) {
									return type == AppUtil.TYPE_ATM_RUT_TIEN;
								},
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
	initialize: function() {
		this.callParent(arguments);
	},
	
	loadData: function(atmModel) {
		this.setAtmModel(atmModel);
		
		if (!this._list) this._list = this.down('list');
		
		this._list.getScrollable().getScroller().scrollToTop();
		var store = this._list.getStore();
		
		AppUtil.offline.updateStoreQuery(store, 'AtmHistories', {atm_id: this.getAtmModel().data.atm_id});
		store.load();
	}
	
	
 });   