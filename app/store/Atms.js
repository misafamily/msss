Ext.define('MyApp.store.Atms', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Atm',
        autoLoad:false,
        autoSync:false
    }
});