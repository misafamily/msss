Ext.define('MyApp.controller.App', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.popup.PopupBackground',
		'MyApp.view.tab.popup.PopupMessage',
		'MyApp.view.tab.popup.PopupAlert',
		'MyApp.view.tab.popup.PopupConfirm',
		'MyApp.view.tab.popup.PopupMoneyInput'
	],
    config: {
        refs: {		
			app: 'app'
        },//end refs
        control: {
			app: {
				initialize: function() {			
					var me = this;		
					me.getApplication().on('show_popup', me.onPopupShown, me);
					me.getApplication().on('show_alert', me.onAlertShown, me);
					me.getApplication().on('show_confirm', me.onConfirmShown, me);
					me.getApplication().on('show_moneyinputpopup', me.onMoneyInputShown, me);
				}
			},
			'tab_popup_popupmessage button[title = "popupokbutton"]': {
				tap: 'onClosePopup'
			},
			'tab_popup_popupconfirm button[title = "confirmcancelbutton"]': {
				tap: 'onConfirmCancel'
			},
			'tab_popup_popupconfirm button[title = "confirmokbutton"]': {
				tap: 'onConfirmOK'
			},
			'tab_popup_popupalert button[title = "popupokbutton"]': {
				tap: 'onCloseAlert'
			},
			'tab_popup_popupmoneyinput button[title = "popupmoneyinputcancelbutton"]': {
				tap: 'onPopupMoneyCancel'
			},
			'tab_popup_popupmoneyinput button[title = "popupmoneyinputokbutton"]': {
				tap: 'onPopupMoneyOk'
			}
		}
    },
	
	onToggleMenu:function(){
		Ext.Viewport.toggleMenu("left");		
	},
	
	onClosePopup: function() {
		var me = this;	
		var popup = me.getPopupBgView();
		popup.hide();	
		var message = me.getPopupMessageView();
		message.hide();		
	},
	
	onCloseAlert: function() {
		var me = this;	
		var popup = me.getPopupAlertBgView();
		popup.hide();	
		var message = me.getPopupAlertView();
		message.hide();		
	},
	onConfirmCancel: function() {
		var me = this;	
		var popup = me.getPopupBgView();
		popup.hide();		
		
		var message = me.getPopupConfirmView();
		message.hide();
	
	},
	
	onPopupMoneyCancel:function() {
		var me = this;	
		var popup = me.getPopupBgView();
		popup.hide();		
		
		var message = me.getPopupMoneyInputView();
		message.hide();
	},
	onPopupMoneyOk: function() {
		var me = this;	
		var view = me.getPopupMoneyInputView();
		var money = view.getInputValue();
		me.onPopupMoneyCancel();
		if (me._confirmCallbackFunc) {
			me._confirmCallbackFunc(money);
			
			me._confirmCallbackFunc = null;
		}
	},
	
	onConfirmOK: function() {
		var me = this;	
		if (me._confirmCallbackFunc) {
			me._confirmCallbackFunc();
			
			me._confirmCallbackFunc = null;
		}
		me.onConfirmCancel();
	},
	
	showPopup:function(title, msg){	
		var me = this;	
		var popup = me.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = me.getPopupMessageView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	showAlert:function(title, msg){	
		var me = this;	
		var popup = me.getPopupAlertBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = me.getPopupAlertView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	
	getPopupAlertBgView: function() {
		var me = this;	
		if (!me._popupAlertBg) {
			me._popupAlertBg = Ext.create('MyApp.view.tab.popup.PopupBackground', {
				cls: 'alert-container'
			});
		}
		return me._popupAlertBg;
	},
	
	getPopupBgView: function() {
		var me = this;	
		if (!me._popupBg) {
			me._popupBg = Ext.create('MyApp.view.tab.popup.PopupBackground');
		}
		return me._popupBg;
	},
	
	getPopupMessageView: function() {
		var me = this;	
		if (!me._popupMessage) {
			me._popupMessage = Ext.create('MyApp.view.tab.popup.PopupMessage');
		}
		return me._popupMessage;
	},
	getPopupAlertView: function() {
		var me = this;	
		if (!me._popupAlert) {
			me._popupAlert = Ext.create('MyApp.view.tab.popup.PopupAlert');
		}
		return me._popupAlert;
	},
	getPopupConfirmView: function() {
		var me = this;	
		if (!me._popupConfirm) {
			me._popupConfirm = Ext.create('MyApp.view.tab.popup.PopupConfirm');
		}
		return me._popupConfirm;
	},
	getPopupMoneyInputView: function() {
		var me = this;	
		if (!me._popupMoneyInput) {
			me._popupMoneyInput = Ext.create('MyApp.view.tab.popup.PopupMoneyInput');
		}
		return me._popupMoneyInput;
	},
	
	
	onPopupShown: function(title, msg) {
		//console.log('onPopupShown msg: ' + msg);
		var me = this;	
		me.showPopup(title, msg);
	},
	onAlertShown: function(title, msg) {
		//console.log('onAlertShown msg: ' + msg);
		var me = this;	
		me.showAlert(title, msg);
	},
	onConfirmShown: function(msg, callback) {
		var me = this;	
		var popup = me.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();		
		
		var message = me.getPopupConfirmView();
		message.setData({msg: msg});
		Ext.Viewport.add(message);
		//setTimeout(function() {
			message.show();	
		//},200);
		
		me._confirmCallbackFunc = callback;
	},
	onMoneyInputShown: function(title, callback) {
		var me = this;
		var popup = me.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();		

		var message = me.getPopupMoneyInputView();
		message.setData({title: title});
		message.resetView();
		Ext.Viewport.add(message);
		//setTimeout(function() {
			message.show();	
		//},200);
		
		me._confirmCallbackFunc = callback;
	},
});