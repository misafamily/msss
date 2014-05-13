Ext.define('MyApp.controller.TabHome', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.home.HomeIncomeExpenseAdd'
	],
    config: {
        refs: {		
			thisTab: 'tab_home',
			thisMenuButton: 'tab_home button[iconCls = "toolbar-icon-menu"]',
			thisSegmentedButtons: 'tab_home_homeincomeexpenseadd segmentedbutton',
			thisSegmentContainer: 'tab_home_homeincomeexpenseadd container[cls = "segment-container"]',
			chiSegmentButton: 'tab_home_homeincomeexpenseadd button[title="Chi"]'
        },//end refs
        control: {
			thisTab: {
				initialize: 'onTabInit',
				push: function(me, view) {
					var mee = this;
					mee.getThisMenuButton().hide();
					//mee.getThisAddButton().hide();
				},
				pop: function(me, view, level) {
					var mee = this;
					if (level < 3) {
						mee.getThisMenuButton().show();
						//mee.getThisAddButton().show();
						//me.hideDoneButton();
					}
				}
			},
			
			'tab_home button[title="homeaddbutton"]': {
				tap: function() {
					var me = this;
					var view = me.getHomeAddView();
					view.resetView(new Date());
					me.getThisSegmentedButtons().setPressedButtons(0);
					me.getThisTab().push(view);
				}
			},
			'tab_home_homeincomeexpenseadd segmentedbutton': {
				toggle: function(container, button, pressed){
					var me = this;
        			if (pressed == true) {
        				me.getThisSegmentContainer().setActiveItem(button.config.viewIndex);					
					}
					                    
                }//end toogle
			},
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
		var me = this;
		AppUtil.log('newDayComes');
		MyApp.app.fireEvent('day_changed');
		me.checkNewMonthComes();
	},
	
	getHomeAddView: function() {
		var me = this;
		if (!me._homeAddView) me._homeAddView = Ext.create('MyApp.view.tab.home.HomeIncomeExpenseAdd');
		return me._homeAddView;
	}
});