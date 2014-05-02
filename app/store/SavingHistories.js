Ext.define('MyApp.store.SavingHistories', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.SavingHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 8,
        
         proxy:{
    		type:'localstoragepaging',//sqlitestorage
    		dbConfig: {
	    		tablename:'saving_history',    			
    			dbQuery:'SELECT * from saving_history'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});