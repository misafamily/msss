Ext.define('MyApp.store.TestATMs', {
    extend: 'Ext.data.Store',
    config: {
        //model: 'MyApp.model.System',
        fields:['username', 'bank', 'amount', 'id'],
        autoLoad:true,
        autoSync:false,
        data: [
        	{
        		'id': 1,
        		'username': 'Nguyen Thanh Binh',
        		'bank':'HSBC',
        		'amount': 1000000
        	},
        	{
        		'id': 2,
        		'username': 'Nguyen Thanh Binh',
        		'bank':'VCB',
        		'amount': 20000000
        	}
        ]
    }
});