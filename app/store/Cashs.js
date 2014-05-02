Ext.define('MyApp.store.Cashs', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false,
         pageSize: 8,
        
         proxy:{
    		type:'localstoragepaging',//sqlitestorage
    		dbConfig: {
	    		tablename:'expense',    			
    			dbQuery:'SELECT * from expense ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});