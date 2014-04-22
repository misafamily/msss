Ext.define('MyApp.model.Atm', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'username',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'bank',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'amount',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'status',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'atm_id',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'time',//date.getTime()
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
	    		tablename:'atm',
    			dbConn: MyApp.util.AppUtil.dbConnection,
    			dbQuery:'SELECT * from atm a WHERE a.status = "in_use"' //+ '" ORDER BY time DESC
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
