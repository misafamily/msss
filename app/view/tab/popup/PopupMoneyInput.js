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
		}
   },
   initialize: function() {
   		this.callParent(arguments);
		this.createView();
   },
   
   updateData: function() {
   		var text = this.getTextView();
   		if (!this._nField) this._nField = text.down('numberfield[name = "amount"]');
   		this._nField.setValue('');
		//var msgText = text.down('container[cls = "popup-message-text-box alert"]');
		//msgText.setHtml('<div class="content">' + this.getData()['msg'] + '</div>');
				
		if (!this._tField) this._tField = text.down('container[cls = "popup-alert-title-box"]');
		this._tField.setHtml(this.getData()['title']);
		
   },
   
   getInputValue: function() {   		
   		return this._nField.getValue();
   },
   
   createView: function() {
   		var text = this.getTextView();
		this.add(text);
   },
   
   getTextView: function() {
   		if (!this._text) {
			this._text = Ext.create('Ext.Container', {
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
		                        placeHolder:'Số tiền  đ (vd: 1000000)',
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
								text: 'XÁC NHẬN',
								flex: 1,
								title: 'popupmoneyinputokbutton'
							},
							{
								xtype: 'button',
								cls: 'button-cancel',
								text: 'TRỞ VỀ',	
								flex: 1,							
								title: 'popupmoneyinputcancelbutton'
							}
						]
					}
				]
			});
		}
		return this._text;
   }
});
