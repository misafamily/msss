Ext.define('MyApp.store.SavingHistories_Recent', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.SavingHistory',
        autoLoad:false,
        autoSync:false
    }
});