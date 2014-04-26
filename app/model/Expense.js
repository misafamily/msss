Ext.define('MyApp.model.Expense', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'expense_id',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'type', //thu or chi
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'amount',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'buyingwhat',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'buyingtype',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'note',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'time',//date.getTime()
            	type:'number'
	       	},
	       	 {
            	name:'week',//date.getTime()
            	type:'number'
	       	},
	       	 {
            	name:'dd',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'mm',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'yy',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'extra1',
            	type:'string'
           },
           {
            	name:'extra2',
            	type:'string'
           },
           {
            	name:'extra3',
            	type:'string'
           },
            {
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }
        ],
        proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'expense',
    			dbConn: MyApp.util.AppUtil.dbConnection,
    			dbQuery:'SELECT * from expense ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
