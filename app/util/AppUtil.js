Ext.define('MyApp.util.AppUtil',{
	alternateClassName: 'AppUtil',
	singleton: true,
	dbConnection: null,
	_lang: 'en',
	moneyUnit: '(đ)',
	CASH: 0,
	CASH_MODEL: null,
	//TYPE
	//chuyen_tien, rut_tien, chuyen_khoan, tao_moi, nhan_luong, sua_thong_tin
	TYPE_ATM_CHUYEN_TIEN: 'chuyen_tien',
	TYPE_ATM_RUT_TIEN: 'rut_tien',
	TYPE_ATM_CHUYEN_KHOAN: 'chuyen_khoan',
	TYPE_ATM_TAO_MOI: 'tao_moi',
	TYPE_ATM_NHAN_LUONG: 'nhan_luong',
	TYPE_ATM_SUA_THONG_TIN: 'sua_thong_tin',
	TYPE_ATM_XOA: 'xoa',
	TYPE_ATM_KHOI_PHUC: 'khoi_phuc',
	//STATUS
	STATUS_IN_USE: 'in_use',
	STATUS_DELETED: 'deleted',
	//CONFIRM
	CONFIRM_ATM_DELETE: 'Tài khoản sẽ bị xóa ?',
	//TITLE
	TITLE_ERROR_INPUT: 'Lỗi nhập',
	TITLE_EDIT: 'Thay đổi thông tin',
	TITLE_PUSHIN: 'Nhiều tiền quá, gửi vào thẻ<br/>mất công xài hết',
	TITLE_PUSHOUT: 'Hết tiền rồi, rút 1 chút xài thôi',
	TITLE_CHECKIN: 'Nhận tiền chuyển khoản (lương)',
	TITLE_CHECKOUT: 'Chuyển khoản cho người khác',
	TITLE_ATM_DELETE: 'Xóa tài khoản ATM',
	//MESSAGE
	MESSAGE_NOT_FILLED_INPUT: 'Chưa điền đầy đủ thông tin',
	MESSAGE_WRONG_NUMBER_INPUT: 'Số tiền không hợp lệ',
	MESSAGE_SUCCESS_EDIT: 'Đã cập nhật',	
	MESSAGE_SUCCESS_PUSHIN: 'Đã chuyển. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện còn <br/><span>{1}</span>',
	MESSAGE_SUCCESS_PUSHOUT: 'Đã rút. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_CHECKIN: 'Đã nhận chuyển khoản. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_CHECKOUT: 'Đã chuyển khoản. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_DELETE: 'Đã xóa tài khoản',
	MESSAGE_FAILED_EDIT: 'Chưa điền thông tin mới',
	MESSAGE_FAILED_PUSHIN: 'Tiền mặt không đủ để chuyển',
	MESSAGE_FAILED_PUSHOUT: 'Số tiền rút lớn hơn tiền hiện có trong tài khoản',
	MESSAGE_FAILED_CHECKOUT: 'Số tiền trong tài khoản không đủ',
	
	saveCashModel: function() {
		if (!this.CASH_MODEL) {
			this.CASH_MODEL = Ext.create('MyApp.model.System', {
				name: 'cash',
				value: '0'
			});
		}
		
		this.CASH_MODEL.data.value = this.CASH.toString();
		this.CASH_MODEL.save();
	},
	
	getCashFormat: function() {
		return this.formatMoneyWithUnit(this.CASH);
	},
	
	canGetCash: function(amount) {
		return this.CASH >= amount;
	},
	
	cashPlus: function(amount) {
		this.CASH += amount;
		this.saveCashModel();
		MyApp.app.fireEvent('cash_changed', this.CASH, amount);
	},
	
	cashMinus: function(amount) {
		this.CASH -= amount;
		this.saveCashModel();
		MyApp.app.fireEvent('cash_changed', this.CASH, -amount);
	},
	
	formatDateTime: function(date) {
		return date.dateFormat();
	},
	
	formatMoney: function(amount) {
		return parseInt(amount).format(0, 3, '.');
	},
	
	formatMoneyWithUnit: function(amount) {
		return this.formatMoney(amount) + ' ' + this.moneyUnit;
	},
	
	setLang:function(lang){
		this._lang = lang;
	},
	getLang:function(){
		return this._lang;
	},
	shuffle:function(len){
		var o = [];
		for(var i = 0; i < len;i++){
			o.push(i);
		}
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
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
	   	try{
	   		if(device.platform == null){
	   			return false;
	   		}
	   		return true;
	   	}catch(e){
	   		return false;
	   	}
   },
   getDateTime:function(datestr){
   		var dates = datestr.split(" ")[0].split("-");
   		var times = datestr.split(" ")[1].split(":");
   		return new Date(dates[0], dates[1], dates[2], times[0], times[1], times[2]);
   },
   //FOR MEAL PLANNING


   getDayNames: function() {   		
		return this.dayNames;
   },
   getWeekNumber: function() {
   		if (!this._initDatePrototype) {
			this._initDatePrototype = true;			
		}  		
		
		return (new Date()).getWeek();
   },
   getDayInWeek: function(date, dayIndex) {
	  var d = new Date(date);
	  var day = d.getDay(),
	      diff = d.getDate() - day + dayIndex; // adjust when day is sunday
	  return new Date(d.setDate(diff)); //Mon Feb 10 2014 11:24:23 GMT+0700 (SE Asia Standard Time)
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
	}
});