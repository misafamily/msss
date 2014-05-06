Ext.define('MyApp.view.tab.atm.AtmDetail', {
    extend: 'MyApp.view.component.AppContainer',
    xtype: 'tab_atm_atmdetail',
    requires: [
    	 
    ],
    config: {
    	atmModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết thẻ',
		scrollable: {
			direction: 'vertical'
		},
		cls:'atm-form-container',
		//layout: 'fit',
		items:[
			{
				xtype:'container',
				layout: {
					type:'vbox'
				},
				flex: 1,
				items:[
						{
			                xtype: 'container',
			                //title: 'Thông tin tài khoản:',
			                //instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
			                defaults: {
			                    //required: true,
			                    //autoComplete: false,
			                    //autoCorrect: false
			                    readOnly: true,
			                    clearIcon: false
			                },
			                items: [
			                    {
			                        xtype: 'textfield',
			                        name: 'name',
			                        //label: 'Tên tài khoản ',
			                        cls:'atmadd-accountname',
			                        //placeHolder:'Tên chủ thẻ (vd: NGUYEN VAN A)',
			                        autoCapitalize: false
			                    },
			                     {
			                        xtype: 'textfield',
			                        name: 'bank',
			                        //label: 'Ngân hàng ',
			                        cls:'atmadd-bank',
			                        //placeHolder:'Ngân hàng (vd: VCB, HSBC, ACB ...)',
			                        autoCapitalize: false
			                    },
			                     {
			                        xtype: 'textfield',
			                        name: 'amount',
			                        //placeHolder:'Số tiền (đ) (vd: 1000000)',
			                        cls:'atmadd-amount'
			                        //label: 'Số tiền hiện có  '
			                    }
			                ]    
			           },
			          /*
			           {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[					
								{
									xtype: 'button',
									text: 'Nạp tiền',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailpushinbutton'
								},
								{
									xtype: 'button',
									text: 'Rút tiền',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailpushoutbutton'
								}
							]	
						},
						 {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[					
								{
									xtype: 'button',
									text: 'Nhận chuyển<br/>khoản, lương',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailsalarybutton'
								},
								{
									xtype: 'button',
									text: 'Chuyển khoản,<br/>Mua sắm = thẻ',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetailtransferbutton'
								}
							]	
						},
						  {
							xtype:'container',
							layout:'hbox',
							style: {
								'margin-top': '10px'
							},
							items:[				
								
								{
									xtype: 'button',
									text: 'Sửa thông tin',
									cls:'button-submit',
									flex: 1,
									title: 'atmdetaileditbutton'
								},
								{
									xtype: 'button',
									text: 'Đóng t.khoản',
									cls:'button-delete',
									flex: 1,
									title: 'atmdetaildeletebutton'
								}
							]	
						},*/
						{
							xtype: 'container',
							style: {
								'margin-left': '10px',
								'margin-top': '10px'
							},
							layout: {
								type: 'hbox',
								pack: 'center',
								align:'center'
							},
							items: [
								{
									xtype: 'label',
									html: 'GIAO DỊCH GẦN NHẤT',
									flex: 1
								},
								
								{
									xtype: 'button',
									text: 'Xem hết',
									cls:'button-submit small',
									
									title: 'atmdetailhistorybutton'
								}
							]
						},
						{
							xclass: 'MyApp.view.component.AppList',
							store: 'AtmHistories_Recent',
							cls: 'atm-atmhistory atm-list3',
							scrollable: false,
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
										'</div>'/*,		
										'<div class="moneycardinfo">',
											'<div class="moneycardicon"></div>',
											'<div class="moneycard">{moneycard:this.format}</div>',
										'</div>'	*/	
										].join(''),
										{
											formatDateTime:function(time) {
												return AppUtil.formatDateTime(new Date(time));
											},
											format: function(amount) {
												return AppUtil.formatMoneyWithUnit(amount);
											}	
										}
					       	),
					       	onItemDisclosure: true
					       //	itemHeight: 82
						}
					]
			}
		]
    },
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.assignFields();
		MyApp.app.on('atm_changed', me.onAtmChanged, me);
	},
	
	onAtmChanged: function(atmId) {
		var me = this;
		if (!me.getAtmModel()) return;
		if (me.getAtmModel().data.atm_id == atmId) {
			me.updateAtmModel();
		}
	},
	
	/*hide: function() {
		var recentHisStore = me._list.getStore();
		if (recentHisStore) {
			recentHisStore.removeAll();
		}
	},*/
	
	updateAtmModel: function() {
		var me = this;
		if (!me.getAtmModel()) return;
		
		me._nameTF.setValue(me.getAtmModel().data.username);
		me._bankTF.setValue(me.getAtmModel().data.bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(me.getAtmModel().data.amount));
		
		me.updateRecentStore();
		
	},
	
	updateRecentStore: function() {
		var me = this;
		var recentHisStore = me._list.getStore();
		//if (!recentHisStore) recentHisStore = Ext.getStore('AtmHistories_Recent');
		if (recentHisStore) {
			recentHisStore.removeAll();
			AppUtil.offline.updateStoreQuery(recentHisStore, 'AtmHistories_Recent', {atm_id: me.getAtmModel().data.atm_id});
			recentHisStore.load(function(records) {
				//console.log('recentHisStore lenght: ', records.length)
				me._list.setHeight(142*records.length);
			});
		}
	},
	//call from Controller
	editAtm: function(name, bank, amount) {		
		var me = this;
		
		me._nameTF.setValue(name);
		me._bankTF.setValue(bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(amount));
		
		var atmModel = me.getAtmModel();
		
		var now = new Date();
		
		if (atmModel.data.username != name || atmModel.data.bank != bank || atmModel.data.amount != amount) {
			
			var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Cập nhật thông tin thẻ ATM',
					type: AppUtil.TYPE_ATM_SUA_THONG_TIN,
					amount: amount,
					moneycard:amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
			});				
			//if (atmModel.data.amount != amount) {
				atmHis.save();	
			//}			
			
			
			atmModel.data.username = name;
			atmModel.data.bank = bank;
			atmModel.data.amount = amount;
			atmModel.data.time = now.getTime();
			
			
			
			atmModel.save(function(){
				//var f = me.getCallbackFunc();
				//f();
				me.updateRecentStore();
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_SUCCESS_EDIT);			
			});
		} else {
			//MyApp.app.fireEvent('show_alert', AppUtil.TITLE_EDIT, AppUtil.MESSAGE_FAILED_EDIT);
		}
		
	},
	
	deleteAtm: function() {
		var me = this;
		//var amount = me._amountTF.getValue();
		var atmModel = me.getAtmModel();
		var now = new Date();
		atmModel.data.status = AppUtil.STATUS_CLOSED;
		atmModel.save(function(){
	
				var atmHis = Ext.create('MyApp.model.AtmHistory', {
					atm_id: atmModel.data.atm_id,
					description: 'Đóng tài khoản ATM',
					type: AppUtil.TYPE_ATM_DONG,
					amount: 0,
					moneycard:atmModel.data.amount,
					time: now.getTime(),
					dd: now.getDate(),
					mm: now.getMonth(),
					yy: now.getFullYear()
				});
				atmHis.save();
				
			
				var f = me.getCallbackFunc();
				f();
				MyApp.app.fireEvent('show_alert', AppUtil.TITLE_ATM_DELETE, AppUtil.MESSAGE_SUCCESS_DELETE);
			}
		);
	},
	resetView: function(){
		var me = this;
		me._nameTF.setValue('');
		me._bankTF.setValue('');
		me._amountTF.reset();
	},
	
	assignFields: function() {
		var me = this;
		if (!me._nameTF) {
			me._nameTF = me.down('textfield[name = "name"]');
		}
		if (!me._bankTF) {
			me._bankTF = me.down('textfield[name = "bank"]');
		}
		if (!me._amountTF) {
			me._amountTF = me.down('textfield[name = "amount"]');
		}
		if (!me._list) {
			me._list = me.down('list');
		}
	}
 });   