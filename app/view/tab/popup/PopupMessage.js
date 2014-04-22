Ext.define('MyApp.view.tab.popup.PopupMessage', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupmessage',
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
		cls: 'popup-message-container',
		layout: {
			type:'vbox',
			pack: 'center',
			align: 'center'
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
		msgText.setHtml(me.getData()['msg']);
		msgText.getScrollable().getScroller().scrollToTop();
		
		var titleText = text.down('container[cls = "popup-message-title-box"]');
		titleText.setHtml(me.getData()['title']);
		
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
				cls:'popup-message-box',
				layout: {
					type:'vbox',
					pack: 'center'
				},
				items: [
					{
						xtype: 'container',
						cls: 'popup-message-title-box',
						html: 'YOUR TITLE HERE'					
					},
					{
						xtype: 'container',
						cls: 'popup-message-text-box',
						html: 'YOUR MESSAGES HERE',
						flex: 1,
						scrollable: true
					},
					{
						xtype: 'button',
						cls: 'popup-message-close-btn',
						title: 'popupokbutton',
						text: 'Đóng'
					}
				]
			});
		}
		return me._text;
   }
});
