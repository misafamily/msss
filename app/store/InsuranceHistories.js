Ext.define('MyApp.store.InsuranceHistories', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.InsuranceHistory',
        autoLoad:false,
        autoSync:false,
        pageSize: 6
    }
});