Ext.define('MyApp.store.SavingHistories', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.SavingHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 6,
    }
});