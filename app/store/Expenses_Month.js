Ext.define('MyApp.store.Expenses_Month', {
    extend: 'Ext.data.Store',
    config: {
       fields: ['thu', 'chi', 'time'],
        autoLoad:false,
        autoSync:false,
        
         proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'expense',
    			dbConn: MyApp.util.AppUtil.dbConnection,
    			dbQuery:'SELECT * from expense ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});