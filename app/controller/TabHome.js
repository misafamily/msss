Ext.define('MyApp.controller.TabHome', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			thisTab: 'tab_home'
        },//end refs
        control: {
			thisTab: {
				//initialize: 'onTabInit'
			}
		}
    },
	
	onTabInit: function() {		
		this._today = new Date();		
		//PatientDiary.app.on('user_logged', this.onUserLogged, this);
		//PatientDiary.app.on('user_logout', this.onUserLogout, this);
		var me = this;
		me._interval = setInterval(function(){
			me.loop();
		}, 4*1000);//automatic refresh each 60s
	},
	
	onUserLogged: function() {
		var me = this;
		//me.checkNextAppointment();		
		me._interval = setInterval(function(){
			me.loop();
		}, 4*1000);//automatic refresh each 60s
	},
	
	onUserLogout: function() {
		clearInterval(this._interval);
	},
	
	loop: function() {
		var me = this;
		//me.checkNextAppointment();
		//me.checkReminder();
		me.checkDayPassed();
	},
	
	checkDayPassed: function() {
		var me = this;
		var now = new Date();
		if (now.getDate() != me._today.getDate() ||
			now.getMonth() != me._today.getMonth() ||
			now.getFullYear() != me._today.getFullYear()) {
				me._today = new Date();
				MyApp.app.fireEvent('day_changed');
				//console.log('DAY CHANGED =====');
			}
	}
});