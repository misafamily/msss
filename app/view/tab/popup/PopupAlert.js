Ext.define('MyApp.view.tab.popup.PopupAlert', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupalert',
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
   		var me = this;
   		me.callParent(arguments);
		me.createView();		
   },
   
   updateData: function() {
   		var me = this;
   		var text = me.getTextView();
		var msgText = text.down('container[cls = "popup-message-text-box alert"]');
		msgText.setHtml('<div class="content">' + me.getData()['msg'] + '</div>');
				
		var titleText = text.down('container[cls = "popup-alert-title-box"]');
		titleText.setHtml('<div class="content">' + me.getData()['title'] + '</div>');
		
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
						html: 'YOUR MESSAGES HERE',
						flex: 1						
					},
					{
						xtype: 'button',
						cls: 'button-submit',
						title: 'popupokbutton',
						text: 'Đóng'
					}
				]
			});
		}
		return me._text;
   }
});
