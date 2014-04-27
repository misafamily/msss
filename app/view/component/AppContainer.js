Ext.define('MyApp.view.component.AppContainer', {
    extend: 'Ext.Container',
    requires:[
    	//'Ext.Container'
    ],
    config: {    	
       emptyListOnHide: false
    },

	show: function() {
		var me = this;
		if (me._list) {
			me._list.show();
		}
	},
	hide: function() {
		var me = this;
		if (me._list) {
			me._list.hide();
			
			if (me.getEmptyListOnHide()) {
				var store = me._list.getStore();
				if (store) 
					store.removeAll();
			}
		}
	}
});
