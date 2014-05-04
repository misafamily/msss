Ext.define('MyApp.store.Expenses', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false,
        //sorters: ['dd', 'mm', 'yy'],
    	grouper: {
            groupFn: function(record) {
               //return record.get('dd') + ' - ' + record.get('mm') + ' - ' + record.get('yy');
               if (record.get('type') == 'thu') return 'Thu nhập';
               else if (record.get('type') == 'chi') return 'Chi tiêu';
               return 'Giao dịch';
            }
        }
    }
});