Ext.define('MyApp.store.Insurances', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Insurance',
        autoLoad:false,
        autoSync:false
    }
});