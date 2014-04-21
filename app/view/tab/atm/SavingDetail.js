Ext.define('MyApp.view.tab.atm.SavingDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_atm_savingdetail',
    requires: [
    	 
    ],
    config: {
    	savingModel: null,
    	callbackFunc: null,
    	title: 'Chi tiết sổ',
        layout:{
			type:'vbox'
		},
		cls:'atm-form-container',
		scrollable: true,
		items:[
			{
                xtype: 'container',
                //title: 'Thông tin tài khoản:',
                //instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
                defaults: {
                    //required: true,
                    autoComplete: false,
                    autoCorrect: false,
                    readOnly: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        //label: 'Tên tài khoản ',
                        cls:'atmadd-accountname',
                        placeHolder:'Tên chủ sổ (vd: NGUYEN VAN A)',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'textfield',
                        name: 'bank',
                        //label: 'Ngân hàng ',
                        cls:'atmadd-bank',
                        placeHolder:'Ngân hàng (vd: VCB, HSBC, ACB ...)',
                        autoCapitalize: false
                    },
                     {
                        xtype: 'textfield',
                        name: 'amount',
                        placeHolder:'Số tiền gởi (đ) (vd: 1000000)',
                        cls:'atmadd-amount',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'textfield',
                        name: 'rate',
                        placeHolder:'Lãi suất (%/năm) (vd: 7)',
                        cls:'savingadd-interestrate',
                        //label: 'Số tiền hiện có  '
                    },
                    {
                        xtype: 'selectfield',
                        name: 'period',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-period',
     
	                    options: [													
							{text: 'Kỳ hạn 1 tháng',  value: '30'},
	                        {text: 'Kỳ hạn 3 tháng',  value: '90'},
							{text: 'Kỳ hạn 6 tháng',  value: '180'},
							{text: 'Kỳ hạn 9 tháng',  value: '270'},
							{text: 'Kỳ hạn 12 tháng',  value: '360'},
							{text: 'Kỳ hạn 24 tháng',  value: '720'},
							{text: 'Kỳ hạn 36 tháng',  value: '1080'},
							{text: 'Không kỳ hạn',  value: '0'},	//minute
							{text: 'Kỳ hạn 1 ngày',  value: '1'},	//minute
							{text: 'Kỳ hạn 2 ngày',  value: '2'},	//minute
							{text: 'Kỳ hạn 3 ngày',  value: '3'},	//minute
							{text: 'Kỳ hạn 6 ngày',  value: '6'},	//minute
							{text: 'Kỳ hạn 7 ngày',  value: '7'},	//minute
						],	
                    },
                    {
						xtype: 'selectfield',
	                    //label: 'Nhắc nhở',//Add reminder
	                 
						cls: 'savingadd-reminder',
	                    options: [						
	                    	{text: 'Lĩnh lãi 1 tháng/lần',  value: '1'},	//minute
							{text: 'Lĩnh lãi 2 tháng/lần',  value: '2'},	//minute
							{text: 'Lĩnh lãi 3 tháng/lần',  value: '3'},
	                        {text: 'Lĩnh lãi 6 tháng/lần',  value: '6'},
							{text: 'Lĩnh lãi 9 tháng/lần',  value: '9'},
							{text: 'Lĩnh lãi 12 tháng/lần',  value: '12'},
							{text: 'Lĩnh lãi theo ngày',  value: '0'},
						],	
						style: {
							//'margin-top': '100px',
							//'font-size': '14px',
							//'margin-left': '-12px'
						},
						name: 'interest_paid'
					},
                     {
                        xtype: 'textfield',
                        name: 'created_date',
                        //label: 'Ngân hàng ',
                        cls:'savingadd-createddate',
                        readOnly: true,
                        //placeHolder:'Chu kỳ (vd: 7 ngày, 3 tháng)',
                        autoCapitalize: false,
                        clearIcon:false
                    },
                    {
	                    xtype: 'textareafield',
						label: '',
	                    //placeHolder:'Ghi chú thêm',//Note on required pre-tests	                  
	                    cls:'savingadd-note',
						name: 'note',
						maxRows: 3			                    
	                },
	                
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
						text: 'Lĩnh lãi',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpaidbutton'
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
						text: 'Rút tiền',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpushoutbutton'
					},		
					{
						xtype: 'button',
						text: 'Nạp tiền',
						cls:'button-submit',
						flex: 1,
						title: 'savingdetailpushinbutton'
					},				
					
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
						title: 'savingdetaileditbutton'
					},
					{
						xtype: 'button',
						text: 'Đóng sổ',
						cls:'button-delete',
						flex: 1,
						title: 'savingdetaildeletebutton'
					}
				]	
			},
			{
				xtype: 'container',
				style: {
					'margin-left': '10px',
					'margin-top': '10px',
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
						flex: 1,
					},
					
					{
						xtype: 'button',
						text: 'Xem hết',
						cls:'button-submit small',
						
						title: 'savingdetailhistorybutton'
					}
				]
			},
			{
				xclass: 'MyApp.view.component.AppList',
				store: 'SavingHistories_Recent',
				cls: 'atm-atmhistory',
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
								'<div class="amounticon"></div>',
								'<div class="amount">{amount:this.format}</div>',
							'</div>',		
							'<div class="moneycardinfo">',
								'<div class="moneycardicon"></div>',
								'<div class="moneycard">{moneycard:this.format}</div>',
							'</div>',			
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
	initialize: function() {
		this.callParent(arguments);
		this.assignFields();
	},
	
	updateSavingModel: function() {
		var me = this;
		if (!me.getSavingModel()) return;		
		
		var m = me.getSavingModel();
		
		me._nameTF.setValue(m.data.username);
		me._bankTF.setValue(m.data.bank);
		me._amountTF.setValue(AppUtil.formatMoneyWithUnit(m.data.amount));
		me._rateTF.setValue(AppUtil.formatRateWithUnit(m.data.interest_rate));
		me._periodTF.setValue(m.data.period);
		me._noteField.setValue(m.data.note);
		me._paidField.setValue(m.data.interest_paid);
		me._dateField.setValue(m.data.created_date);
		this.updateRecentStore();
		
	},
	
	updateRecentStore: function() {
		var me = this;
		var recentHisStore = this._list.getStore();
		//if (!recentHisStore) recentHisStore = Ext.getStore('SavingHistories_Recent');
		if (recentHisStore) {
			recentHisStore.removeAll();
			AppUtil.offline.updateStoreQuery(recentHisStore, 'SavingHistories_Recent', {saving_id: this.getSavingModel().data.saving_id});
			recentHisStore.load(function(records) {
				//console.log('recentHisStore lenght: ', records.length)
				me._list.setHeight(142*records.length);
			});
		}
	},
	
	resetView: function(){
		this._nameTF.setValue('');
		this._bankTF.setValue('');
		this._amountTF.setValue('');
		this._rateTF.setValue('');
		this._periodTF.setValue('30');
		this._noteField.setValue('');
		this._paidField.setValue('1');
		this.updateSelectedDate(new Date());
	},
	
	updateSelectedDate: function(date) {		
		this._selectedDate = new Date(date.getTime());
		//if (!this._selectedDate) this._selectedDate = new Date();
		//this._selectedDate.setDate(date.getDate());
		//this._selectedDate.setMonth(date.getMonth());
		//this._selectedDate.setFullYear(date.getFullYear());
		this._dateField.setValue(date.shortDateFormat());
	},
	
	getSelectedDate: function() {
		return this._selectedDate;
	},
	
	assignFields: function() {
		if (!this._nameTF) {
			this._nameTF = this.down('textfield[name = "name"]');
		}
		if (!this._bankTF) {
			this._bankTF = this.down('textfield[name = "bank"]');
		}
		if (!this._amountTF) {
			this._amountTF = this.down('textfield[name = "amount"]');
		}
		if (!this._rateTF) {
			this._rateTF = this.down('textfield[name = "rate"]');
		}
		if (!this._periodTF) {
			this._periodTF = this.down('selectfield[name = "period"]');
		}
		if (!this._dateField) {
			this._dateField = this.down('textfield[name = "created_date"]');
		}
		if (!this._noteField) {
			this._noteField = this.down('textareafield[name = "note"]');
		}
		if (!this._paidField) {
			this._paidField = this.down('selectfield[name = "interest_paid"]');
		}
		if (!this._list) {
			this._list = this.down('list');
		}
	}
 });   