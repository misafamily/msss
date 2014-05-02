Ext.define('MyApp.profile.DefaultProfile', {
    extend: 'Ext.app.Profile',
    views: [],

    isActive: function() {
    	//AppUtil.log('Default Profile');
    	/*var dbconnval = {
	        dbName: "moneysss",
	        dbDescription: "moneysss database"
	    };
    	AppUtil.dbConnection = Ext.create('MyApp.util.offline.Connection', dbconnval);
    	AppUtil.offline = Ext.create('MyApp.util.offline.Data',{});*/
        return true;
    }
});