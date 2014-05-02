Ext.define('MyApp.store.AtmHistories', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.AtmHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 8,
        
         proxy:{
    		type:'localstoragepaging',//sqlitestorage
    		dbConfig: {
	    		tablename:'atm_history',    			
    			dbQuery:'SELECT * from atm_history'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});