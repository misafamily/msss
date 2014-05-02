Ext.define('MyApp.view.tab.popup.PopupMoneyInput', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupmoneyinput',
    requires: [

	],
    config: {	
		hidden: true,
        showAnimation: {
            type: "fadeIn",
           //direction: "down",
            duration: 100
        },
        hideAnimation: {
            type: "fadeOut",
            //direction: "up",
            duration: 100
        },
		data: null,	
		cls: 'popup-alert-container',
		layout: {
			type:'vbox',
			pack: 'center',
			align: 'center'
		},
		model: true
   },
   initialize: function() {
   		this.callParent(arguments);
		this.createView();
   },
   
   updateData: function() {
   		var me = this;
   		var text = me.getTextView();
   		if (!me._nField) me._nField = text.down('numberfield[name = "amount"]');
   		me._nField.setValue('');
		//var msgText = text.down('container[cls = "popup-message-text-box alert"]');
		//msgText.setHtml('<div class="content">' + this.getData()['msg'] + '</div>');
				
		if (!me._tField) me._tField = text.down('container[cls = "popup-alert-title-box"]');
		me._tField.setHtml('<div class="content">' + me.getData()['title'] + '</div>');
		
   },
   
   resetView: function() {
   		var me = this;
   		me._nField.reset();
   },
   
   getInputValue: function() {   		
   		return this._nField.getValue();
   },
   
   createView: function() {
   		var me = this;
   		var text = me.getTextView();
		me.add(text);
   },
   
   getTextView: function() {
   		var me = this;
   		if (!me._text) {
			me._text = Ext.create('Ext.Container', {
				cls:'popup-alert-box',
				layout: {
					type:'vbox',
					pack: 'center'
				},
				items: [
					{
						xtype: 'container',
						cls: 'popup-alert-title-box',
						html: 'YOUR TITLE HERE'					
					},
					{
						xtype: 'container',
						cls: 'popup-message-text-box alert',
						layout: {
							type: 'hbox',
							align: 'center',
							pack: 'center'
						},
						flex: 1,
						//html: 'YOUR MESSAGES HERE'
						items:[
							{
		                        xtype: 'numberfield',
		                        name: 'amount',
		                        placeHolder:'Số tiền (đ) (vd: 1000000)',
		                        cls:'atmadd-amount'
		                        //label: 'Số tiền hiện có  '
		                    }
						]						
					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox'						
						},
						style: {
							'margin-bottom': '10px'
						},
						items:[
							{
								xtype: 'button',
								cls: 'button-submit',
								text: 'Xác nhận',
								flex: 1,
								title: 'popupmoneyinputokbutton'
							},
							{
								xtype: 'button',
								cls: 'button-cancel',
								text: 'Hủy',	
								flex: 1,							
								title: 'popupmoneyinputcancelbutton'
							}
						]
					}
				]
			});
		}
		return me._text;
   }
});
