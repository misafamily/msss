Ext.define('MyApp.controller.App', {
    extend: 'Ext.app.Controller',
	requires:[		
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
	
	onClosePopup: function(btn, e, eOpts) {
		var me = this;	
		var message = me.getPopupMessageView();
		message.hide();		
		e.preventDefault();
		return false;
	},
	
	onCloseAlert: function(btn, e, eOpts) {
		//btn.doTap(btn, e);
		var me = this;	
		var message = me.getPopupAlertView();
		 setTimeout(function() {
	        message.hide();
	    }, 0);
		
				
		e.preventDefault();
		return false;
	},
	onConfirmCancel: function(btn, e, eOpts) {
		var me = this;	
		var message = me.getPopupConfirmView();
		message.hide();
		e.preventDefault();
		return false;
	},
	
	onPopupMoneyCancel:function(btn, e, eOpts) {
		var me = this;	
		var message = me.getPopupMoneyInputView();
		message.hide();
		e.preventDefault();
		return false;
	},
	onPopupMoneyOk: function(btn, e, eOpts) {
		var me = this;	
		var view = me.getPopupMoneyInputView();
		var money = view.getInputValue();
		me.onPopupMoneyCancel();
		if (me._confirmCallbackFunc) {
			me._confirmCallbackFunc(money);
			
			me._confirmCallbackFunc = null;
		}
		e.preventDefault();
		return false;
	},
	
	onConfirmOK: function(btn, e, eOpts) {
		var me = this;	
		if (me._confirmCallbackFunc) {
			me._confirmCallbackFunc();
			
			me._confirmCallbackFunc = null;
		}
		me.onConfirmCancel(btn, e, eOpts);
		//e.preventDefault();
		return false;
	},
	
	showPopup:function(title, msg){	
		var me = this;	
		var message = me.getPopupMessageView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	showAlert:function(title, msg){	
		var me = this;	
		var message = me.getPopupAlertView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
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
	
		var message = me.getPopupMoneyInputView();
		message.setData({title: title});
		message.resetView();
		Ext.Viewport.add(message);
		//setTimeout(function() {
			message.show();	
		//},200);
		
		me._confirmCallbackFunc = callback;
	}
});