Ext.define('MyApp.view.component.AppList', {
    extend: 'Ext.List',
    config: {    	
        variableHeights: true,
        infinite: true,
        disableSelection: true,
        allowDeselect: false,  
		flex: 1,
		//height: '100%',
		emptyText:'',//Chưa có dữ liệu
		/*localize:true,
		locales : {
	         //weekTitle: 'WEEK_TEXT',
			 emptyText: 'NO_DATA_TEXT'
	   	},*/
    },
	setLocale:function(locale){
		this.callParent(arguments);
	},
		
	initialize: function() {
		this.callParent(arguments);
		//Ux.locale.Manager.applyLocaleForCmp(this);
	}
});
