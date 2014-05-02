Ext.define('MyApp.store.Expenses_Week', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false,
        //sorters: ['dd', 'mm', 'yy'],
    	grouper: {
            groupFn: function(record) {
               //return record.get('dd') + ' - ' + record.get('mm') + ' - ' + record.get('yy');
               return new Date(record.get('time')).dateShortFormatWithoutTime();
            }
        }
    }
});