Ext.define('MyApp.controller.TabAtm', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.tab.atm.AtmAdd'
	],
    config: {
        refs: {		
			thisTab: 'tab_atm',
			thisMenuButton: 'tab_atm button[iconCls = "toolbar-icon-menu"]',
			thisAtmAdd: 'tab_atm_atmadd',
			thisAtmList: 'tab_atm_atmlist'
        },//end refs
        control: {
			thisTab: {
				initialize: 'onTabInit',
				push: function(me, view) {
					this.getThisMenuButton().hide();
				},
				pop: function(me, view, level) {
					this.getThisMenuButton().show();
				},
			},
			'tab_atm_atm button[title = "atmadd"]': {
				tap: function() {
					//console.log('tap tap');
					var atmAddView = this.getAtmAddView();
					atmAddView.resetView();
					this.getThisTab().push(atmAddView);
				}
			},
			//AtmAdd
			'tab_atm_atmadd button[title = "atmaddcancelbutton"]': {
				tap: function() {
					this.getThisTab().onBackButtonTap();	
				}				
			},
			'tab_atm_atmadd button[title = "atmaddsubmitbutton"]': {
				tap: function() {
					var me = this;
					if (me.getThisAtmAdd().addAtm(
						function() {
							me.getThisAtmList().updateStore();
						})
					) {						
						me.getThisTab().onBackButtonTap();	
					}						
				}				
			},
			//end AtmAdd
		}
    },
	
	onTabInit: function() {		
		
	},
	
	getAtmAddView: function() {
		if (!this._atmAddView) {
			this._atmAddView = Ext.create('MyApp.view.tab.atm.AtmAdd');
		}
		return this._atmAddView;
	}
});