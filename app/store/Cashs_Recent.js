Ext.define('MyApp.store.Cashs_Recent', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Expense',
        autoLoad:false,
        autoSync:false
    }
});