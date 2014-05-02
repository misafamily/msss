Ext.define('MyApp.store.AtmHistories_Recent', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.AtmHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 3
    }
});