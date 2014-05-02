Ext.define('MyApp.util.offline.PagingLocalStorageProxy', {
    extend: 'MyApp.util.offline.Proxy',
    alias: 'proxy.localstoragepaging',
    alternateClassName: 'Ext.data.proxy.PagingLocalStorage',
	
    read: function(operation, callback, scope) {
        var me = this;

        var onSucess, onError;
        onSucess = function(tx, results) {
            me.applyDataToModel(tx, results, operation, callback, scope);
        };

        onError = function(tx, err) {
            me.throwDbError(tx, err);
        };
        var start = operation.getStart();
        var limit = operation.getLimit();
        var begin = ( isNaN(start) || typeof start === 'undefined') ? 0 : start;
        var end = ( isNaN(limit) || typeof limit === 'undefined') ? length : begin + limit;
        var sql = operation.config.query || me.config.dbConfig.dbQuery || 'SELECT * FROM '+ me.config.dbConfig.tablename;
        sql += ' LIMIT ' + begin + ',' + limit;
		me.queryDB(me.getDb(), sql, onSucess, onError);
		
    },
    
    applyData: function(data, operation, callback, scope) {
        var me = this;
       	var limit = operation.getLimit();
       	
       	var pageRecords = data;	
        operation.setSuccessful();
        operation.setCompleted();
        if (pageRecords.length < limit) {
       		operation.setResultSet(Ext.create('Ext.data.ResultSet', {
	            records:       pageRecords,
	            total:         (operation.getPage() - 1) * limit + pageRecords.length,	            
	            count:         pageRecords.length,
	            success:       true, // TODO: Should this be dynamically pulled from somewhere?
	            loaded:        true
	        }));
       	} else {
       		operation.setResultSet(Ext.create('Ext.data.ResultSet', {
	            records:       pageRecords,
	            //total:         data.length,	          
	            count:         pageRecords.length,
	            success:       true, // TODO: Should this be dynamically pulled from somewhere?
	            loaded:        true
	        }));
       	}
        //finish with callback
        operation.setRecords(pageRecords);
        if (typeof callback == "function") {
            callback.call(scope || me, operation);
        }
    }
});
