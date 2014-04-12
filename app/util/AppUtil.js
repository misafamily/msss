Ext.define('MyApp.util.AppUtil',{
	alternateClassName: 'AppUtil',
	singleton: true,
	dbConnection: null,
	_lang: 'en',
	moneyUnit: '(đ)',
	
	//STATUS
	STATUS_IN_USE: 'in_use',
	//TITLE
	TITLE_ERROR_INPUT: 'Lỗi nhập',
	//MESSAGE
	MESSAGE_NOT_FILLED_INPUT: 'Chưa điền đầy đủ thông tin',
	
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