Ext.define('MyApp.model.AtmHistory', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'atm_id',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'description',
            	type:'string',
            	fieldOption:''
           },
            {
            	name:'type',//chuyen_tien, rut_tien, chuyen_khoan, tao_moi, nhan_luong, sua_thong_tin
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
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }
        ],
        proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'atm_history',
    			dbConn: MyApp.util.AppUtil.dbConnection,
    			dbQuery:'SELECT * from atm_history'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
