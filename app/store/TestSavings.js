Ext.define('MyApp.store.TestSavings', {
    extend: 'Ext.data.Store',
    config: {
        //model: 'MyApp.model.System',
        fields:['created_date', 'bank', 'amount', 'id', 'note'],
        autoLoad:true,
        autoSync:false,
        data: [
        	{
        		'id': 1,
        		'created_date': '12 Thg4 2014',
        		'bank':'HSBC',
        		'amount': 1000000,
        		'note': '3 thang tha noi'
        	},
        	{
        		'id': 2,
        		'created_date': '15 Thg10 2014',
        		'bank':'VCB',
        		'amount': 20000000,
        		'note': '12 thang lai cuoi ky'
        	}
        ]
    }
});