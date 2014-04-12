Ext.define('MyApp.view.tab.popup.PopupConfirm', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupconfirm',
    requires: [

	],
    config: {	
		hidden: true,
        showAnimation: {
            type: "fadeIn",
           //direction: "down",
            duration: 200
        },
        hideAnimation: {
            type: "fadeOut",
            //direction: "up",
            duration: 200
        },
		data: null,	
		cls: 'popup-message-container',
		layout: {
			type:'vbox',
			pack: 'center',
			align:'center'
		}
   },
   initialize: function() {
   		this.callParent(arguments);
		this.createView();
   },
   
   updateData: function() {
   		var text = this.getTextView();
		var msgText = text.down('container[cls = "popup-message-text-box"]');
		msgText.setHtml('<div class="content">' + this.getData()['msg'] + '</div>');		
   },
   
   createView: function() {
   		var text = this.getTextView();
		this.add(text);
   },
   
   getTextView: function() {
   		if (!this._text) {
			this._text = Ext.create('Ext.Container', {
				cls:'popup-message-box',
				items: [
					{
						xtype: 'container',
						cls: 'popup-message-text-box',
						html: 'YOUR MESSAGES HERE',
						flex: 1
					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox'
						},
						items:[
							{
								xtype: 'button',
								cls: 'popup-confirm-close-btn',
								text: 'OK',
								title: 'confirmokbutton'
							},
							{
								xtype: 'button',
								cls: 'popup-confirm-close-btn',
								text: 'CANCEL',								
								title: 'confirmcancelbutton'
							},
						]
					}
				]
			});
		}
		return this._text;
   }
});
