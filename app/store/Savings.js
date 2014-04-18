Ext.define('MyApp.store.Savings', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Saving',
        autoLoad:false,
        autoSync:false
    }
});