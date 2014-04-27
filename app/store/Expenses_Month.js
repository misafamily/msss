Ext.define('MyApp.store.Expenses_Month', {
    extend: 'Ext.data.Store',
    config: {
       	//fields: ['thu', 'chi', 'time'],
       	model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false,
        
         grouper: {
            groupFn: function(record) {
               //return record.get('dd') + ' - ' + record.get('mm') + ' - ' + record.get('yy');
              // if (record.get('type') == 'thu')
               		//return 'Thu nhập';
               //	else 
               return record.get('buyingwhat');
            }
        },
    }
});