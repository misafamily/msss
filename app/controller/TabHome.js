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
				initialize: 'onTabInit'
			}
		}
    },
	
	onTabInit: function() {		
		var me = this;
		me._today = new Date();		
		var tomorrow = me._today.tomorrow();
		Ext.Date.clearTime(tomorrow);
		var timeToTomorrow = Ext.Date.getElapsed(me._today, tomorrow) + 1000;
		//console.log(timeToTomorrow/(60*60*1000));
		Ext.defer(function(){
			me.newDayComes();
		},timeToTomorrow);
		
		me.checkAutoDataForMonth();
	},
	
	checkAutoDataForMonth: function() {
		var now = new Date();
		AppUtil.checkAutoDataForMonth();
	},
	
	newDayComes: function() {
		AppUtil.log('newDayComes');
		MyApp.app.fireEvent('day_changed');
		me.checkNewMonthComes();
	}
});