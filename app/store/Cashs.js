Ext.define('MyApp.store.Cashs', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false,
        pageSize: 6
    }
});