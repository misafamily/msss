Ext.define('MyApp.util.AppUtil',{
	alternateClassName: 'AppUtil',
	singleton: true,
	dbConnection: null,
	_lang: 'en',
	moneyUnit: '(đ)',
	CASH: 0,
	CASH_MODEL: null,
	//TYPE
	//chuyen_tien, rut_tien, nap_tien, tao_moi, nhan_luong, sua_thong_tin
	//TYPE_ATM_CHUYEN_TIEN: 'chuyen_tien',
	TYPE_ATM_RUT_TIEN: 'rut_tien',
	TYPE_ATM_CHUYEN_KHOAN: 'chuyen_khoan',
	TYPE_ATM_TAO_MOI: 'tao_moi',
	TYPE_ATM_NHAN_LUONG: 'nhan_luong',
	TYPE_ATM_SUA_THONG_TIN: 'sua_thong_tin',
	TYPE_ATM_DONG: 'tam_dong',
	TYPE_ATM_KHOI_PHUC: 'khoi_phuc',
	TYPE_ATM_NAP_TIEN: 'nap_tien',
	TYPE_ATM_LINH_LAI: 'linh_lai',
	
	//STATUS
	STATUS_IN_USE: 'in_use',
	STATUS_CLOSED: 'closed',
	STATUS_DELETED: 'deleted',
	//CONFIRM
	CONFIRM_ATM_DELETE: 'Tài khoản ATM sẽ được đóng ?<br/>(Có thể khôi phục lại sau)',
	CONFIRM_SAVING_DELETE: 'Sổ sẽ được đóng ?<br/>(Có thể khôi phục lại sau)',
	//TITLE
	TITLE_ERROR_INPUT: 'Lỗi nhập',
	TITLE_EDIT: 'Thay đổi thông tin',
	TITLE_PUSHIN: 'Nạp tiền',
	TITLE_EXPENSE: 'Chi tiêu trong ngày',
	TITLE_PUSHOUT: 'Rút tiền',
	TITLE_CHECKIN: 'Nhận lương, tiền chuyển khoản',
	TITLE_CHECKOUT: 'Chuyển khoản,<br/> mua sắm bằng thẻ',
	TITLE_ATM_DELETE: 'Đóng tài khoản ATM',
	TITLE_SAVING_DELETE: 'Đóng sổ tiết kiệm',
	TITLE_UOCTINH_LAI: 'Ước tình tiền lãi',
	TITLE_LINHLAI: 'Lĩnh tiền lãi',
	TITLE_THEMTIEN: 'Thêm tiền mặt',
	//MESSAGE
	MESSAGE_NOT_FILLED_INPUT: 'Chưa điền đầy đủ thông tin',
	MESSAGE_WRONG_NUMBER_INPUT: 'Số tiền không hợp lệ',
	MESSAGE_WRONG_DATE: 'Ngày lĩnh lãi phải sau ngày gởi hoặc ngày lĩnh lãi trước đó',
	MESSAGE_SUCCESS_EDIT: 'Đã cập nhật',	
	MESSAGE_SUCCESS_PUSHIN: 'Đã nạp. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện còn <br/><span>{1}</span>',
	MESSAGE_SUCCESS_PUSHOUT: 'Đã rút. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_CHECKIN: 'Đã nhận tiền. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_CHECKOUT: 'Đã chuyển khoản. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_DELETE: 'Đã đóng xong',
	MESSAGE_SUCCESS_LINHLAI: 'Đã lĩnh. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_THEMTIEN: 'Đã thêm. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_UOCTINH_LAI: '*** Tiền lãi ước tính từ ngày {0}, {1}',//<br/>là <span>{2}</span>',
	
	MESSAGE_FAILED_EDIT: 'Chưa điền thông tin mới',
	MESSAGE_FAILED_PUSHIN: 'Tiền mặt không đủ để nạp,<br/>hiện có <span>{0}</span>',
	MESSAGE_FAILED_EXPENSE: 'Tiền mặt không đủ để chi tiêu,<br/>hiện có <span>{0}</span>',
	MESSAGE_FAILED_PUSHOUT: 'Tiền trong tài khoản không đủ. Có thể rút tối đa <span>{0}</span>',
	MESSAGE_FAILED_CHECKOUT: 'Tiền trong tài khoản không đủ. Có thể chuyển tối đa <span>{0}</span>',
	
	saveExpenseModel: function(expensetype, amount, externalid, buyingwhat, buyingtype, frombank, tradedate ) {
		var now = tradedate || new Date();
		var expenseId = 'expensive_' + now.getTime();
		var expenseData = {
			expense_id: expenseId,
			amount: amount,
			type: expensetype,
			buyingwhat: buyingwhat,
			buyingtype: buyingtype,
			frombank: frombank,
			//note: note,
			time: now.getTime(),
			week: Ext.Date.getWeekOfYear(now),
			dd: now.getDate(),
			mm: now.getMonth(),
			yy: now.getFullYear()
		};
		
		var model = Ext.create('MyApp.model.Expense', expenseData);
		model.save(function() {
			MyApp.app.fireEvent('expense_changed', now);
		});
	},
	
	saveCashModel: function() {
		var me = this;
		if (!me.CASH_MODEL) {
			me.CASH_MODEL = Ext.create('MyApp.model.System', {
				name: 'cash',
				value: '0'
			});
		}
		
		me.CASH_MODEL.data.value = me.CASH.toString();
		me.CASH_MODEL.save();
	},
	
	getCashFormat: function() {
		var me = this;
		return me.formatMoneyWithUnit(me.CASH);
	},
	
	canGetCash: function(amount) {
		return this.CASH >= amount;
	},
	
	cashPlus: function(amount) {
		var me = this;
		me.CASH += amount;
		me.saveCashModel();
		MyApp.app.fireEvent('cash_changed', me.CASH, amount);
	},
	
	cashMinus: function(amount) {
		var me = this;
		me.CASH -= amount;
		me.saveCashModel();
		MyApp.app.fireEvent('cash_changed', this.CASH, -amount);
	},
	
	formatDateTime: function(date) {
		return date.dateFormat();
	},
	
	formatMoney: function(amount) {
		amount = amount || 0;
		return parseInt(amount).format(0, 3, '.');
	},
	
	formatMoneyWithUnit: function(amount) {
		var me = this;
		return me.formatMoney(amount) + ' ' + me.moneyUnit;
	},
	
	formatRateWithUnit: function(amount) {
		return amount + ' %/năm';
	},
	
	setLang:function(lang){
		this._lang = lang;
	},
	getLang:function(){
		return this._lang;
	},
	
	isOnline: function() {
        /*
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
		*/
		if(navigator.connection != undefined){
			var networkState = navigator.connection.type;
			if(networkState == "none"){
	        	return false;	
	        }
      	}
        return true;
   },
   runningDevice:function(){
   		//alert('Ext.os.deviceType: ' + Ext.os.deviceType);
	   if (Ext.os.deviceType == "Desktop") {
            return false;
        }
        return true;
   },
 
	preferredLanguage:function(){
		try{
			navigator.globalization.getPreferredLanguage(
			    function (language) {this.setLang(language.value);},
			    function () {alert('Error getting language\n');}
			);
		}catch(e){
			var language = navigator.language? navigator.language.split('-')[0] : navigator.userLanguage.split('-')[0];
			this.setLang(language);
		}
	},
	
	log: function(msg) {
		console.log(msg);
		//Ext.log.Logger.log(msg);
	}
});