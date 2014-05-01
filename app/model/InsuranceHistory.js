Ext.define('MyApp.model.InsuranceHistory', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'insurance_id',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'description',
            	type:'string',
            	fieldOption:''
           },
            {
            	name:'type',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'amount',
            	type:'string'
	       },
           {
            	name:'time',//date.getTime()
            	type:'number'
	       },
           {
            	name:'dd',
            	type:'string'
            },
            {
            	name:'mm',
            	type:'string'
            },
			{
            	name:'yy',
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
	    		tablename:'insurance_history',    			
    			dbQuery:'SELECT * from insurance_history'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
