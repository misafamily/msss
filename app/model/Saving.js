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
            	name:'period',//ky han
            	type:'string',
            	fieldOption:''
            },    
            {
            	name:'note',//
            	type:'string',
            	fieldOption:''
            },         
            {
            	name:'interest_paid',//linh lai
            	type:'int',
            	fieldOption:''
            },   
            {
            	name:'interest_paid_index',//linh lai lan thu ?
            	type:'string',
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
            	name:'last_paid_time',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'last_info',//date.getTime()
            	type:'string'
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
    			dbQuery:'SELECT * from saving a WHERE a.status = "in_use"' // ORDER BY time DESC
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
