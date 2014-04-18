Ext.define('MyApp.model.Saving', {
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
            	name:'created_date',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'interest_rate',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'period',//
            	type:'string',
            	fieldOption:''
            },    
            {
            	name:'note',//
            	type:'string',
            	fieldOption:''
            },         
            {
            	name:'remindermonth',//
            	type:'int',
            	fieldOption:''
            },   
            {
            	name:'status',
            	type:'string',
            	fieldOption:''
            },
             {
            	name:'saving_id',
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
	    		tablename:'saving',
    			dbConn: MyApp.util.AppUtil.dbConnection,
    			dbQuery:'SELECT * from saving a WHERE a.status = "in_use" ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
