Ext.define('MyApp.model.SavingHistory', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'history_id',
            	type:'string',
            	fieldOption:''
           },
        	{
            	name:'saving_id',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'description',
            	type:'string',
            	fieldOption:''
           },
            {
            	name:'type',//tao_moi, sua_thong_tin, linh_lai, dong, rut_tien, nap_tien
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'amount',
            	type:'string'
	       },
	        {
            	name:'moneycard',
            	type:'string'
	       },
           {
            	name:'time',//date.getTime()
            	type:'number'
	       },
	       {
            	name:'last_paid_history_id',//date.getTime()
            	type:'string'
	       },
           {
            	name:'dd',
            	type:'number'
            },
            {
            	name:'mm',
            	type:'number'
            },
			{
            	name:'yy',
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
	    		tablename:'saving_history',    			
    			dbQuery:'SELECT * from SavingHistory'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
