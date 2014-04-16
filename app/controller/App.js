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
					this.getApplication().on('show_popup', this.onPopupShown, this);
					this.getApplication().on('show_alert', this.onAlertShown, this);
					this.getApplication().on('show_confirm', this.onConfirmShown, this);
					this.getApplication().on('show_moneyinputpopup', this.onMoneyInputShown, this);
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
		var popup = this.getPopupBgView();
		popup.hide();	
		var message = this.getPopupMessageView();
		message.hide();		
	},
	
	onCloseAlert: function() {
		var popup = this.getPopupAlertBgView();
		popup.hide();	
		var message = this.getPopupAlertView();
		message.hide();		
	},
	onConfirmCancel: function() {
		var popup = this.getPopupBgView();
		popup.hide();		
		
		var message = this.getPopupConfirmView();
		message.hide();
	
	},
	
	onPopupMoneyCancel:function() {
		var popup = this.getPopupBgView();
		popup.hide();		
		
		var message = this.getPopupMoneyInputView();
		message.hide();
	},
	onPopupMoneyOk: function() {
		var view = this.getPopupMoneyInputView();
		var money = view.getInputValue();
		this.onPopupMoneyCancel();
		if (this._confirmCallbackFunc) {
			this._confirmCallbackFunc(money);
			
			this._confirmCallbackFunc = null;
		}
	},
	
	onConfirmOK: function() {
		if (this._confirmCallbackFunc) {
			this._confirmCallbackFunc();
			
			this._confirmCallbackFunc = null;
		}
		this.onConfirmCancel();
	},
	
	showPopup:function(title, msg){	
		var popup = this.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = this.getPopupMessageView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	showAlert:function(title, msg){	
		var popup = this.getPopupAlertBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = this.getPopupAlertView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	
	getPopupAlertBgView: function() {
		if (!this._popupAlertBg) {
			this._popupAlertBg = Ext.create('MyApp.view.tab.popup.PopupBackground', {
				cls: 'alert-container'
			});
		}
		return this._popupAlertBg;
	},
	
	getPopupBgView: function() {
		if (!this._popupBg) {
			this._popupBg = Ext.create('MyApp.view.tab.popup.PopupBackground');
		}
		return this._popupBg;
	},
	
	getPopupMessageView: function() {
		if (!this._popupMessage) {
			this._popupMessage = Ext.create('MyApp.view.tab.popup.PopupMessage');
		}
		return this._popupMessage;
	},
	getPopupAlertView: function() {
		if (!this._popupAlert) {
			this._popupAlert = Ext.create('MyApp.view.tab.popup.PopupAlert');
		}
		return this._popupAlert;
	},
	getPopupConfirmView: function() {
		if (!this._popupConfirm) {
			this._popupConfirm = Ext.create('MyApp.view.tab.popup.PopupConfirm');
		}
		return this._popupConfirm;
	},
	getPopupMoneyInputView: function() {
		if (!this._popupMoneyInput) {
			this._popupMoneyInput = Ext.create('MyApp.view.tab.popup.PopupMoneyInput');
		}
		return this._popupMoneyInput;
	},
	
	
	onPopupShown: function(title, msg) {
		//console.log('onPopupShown msg: ' + msg);
		this.showPopup(title, msg);
	},
	onAlertShown: function(title, msg) {
		//console.log('onAlertShown msg: ' + msg);
		this.showAlert(title, msg);
	},
	onConfirmShown: function(msg, callback) {
		var popup = this.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();		
		
		var message = this.getPopupConfirmView();
		message.setData({msg: msg});
		Ext.Viewport.add(message);
		//setTimeout(function() {
			message.show();	
		//},200);
		
		this._confirmCallbackFunc = callback;
	},
	onMoneyInputShown: function(title, callback) {
		var popup = this.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();		

		var message = this.getPopupMoneyInputView();
		message.setData({title: title});
		Ext.Viewport.add(message);
		//setTimeout(function() {
			message.show();	
		//},200);
		
		this._confirmCallbackFunc = callback;
	},
});