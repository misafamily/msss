Ext.define('MyApp.store.Systems', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.System',
        autoLoad:false,
        autoSync:false
    }
});