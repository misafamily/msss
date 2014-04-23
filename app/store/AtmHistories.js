Ext.define('MyApp.store.AtmHistories', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.AtmHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 6,
    }
});