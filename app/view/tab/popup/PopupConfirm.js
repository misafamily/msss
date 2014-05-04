Ext.define('MyApp.view.tab.popup.PopupConfirm', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupconfirm',
    requires: [

	],
    config: {	
		hidden: true,
		data: null,	
		cls: 'popup-message-container',
		layout: {
			type:'vbox',
			pack: 'center',
			align:'center'
		}
   },
   initialize: function() {
   		var me = this;
   		me.callParent(arguments);
		me.createView();
   },
   
   updateData: function() {
   		var me = this;
   		var text = me.getTextView();
		var msgText = text.down('container[cls = "popup-message-text-box"]');
		msgText.setHtml('<div class="content">' + me.getData()['msg'] + '</div>');		
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
				cls:'popup-message-box confirm',
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
							type: 'hbox',
							pack:'center'
						},
						items:[
							{
								xtype: 'button',
								cls: 'button-submit',
								text: 'Xác nhận',
								flex: 1,
								title: 'confirmokbutton'
							},
							{
								xtype: 'button',
								cls: 'button-cancel',
								text: 'Trở lại',	
								flex: 1,							
								title: 'confirmcancelbutton'
							}
						]
					}
				]
			});
		}
		return me._text;
   }
});
