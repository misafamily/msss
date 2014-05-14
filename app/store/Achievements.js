Ext.define('MyApp.store.Achievements', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Achievement',
        autoLoad:false,
        autoSync:false
    }
});