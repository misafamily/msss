Ext.define('MyApp.model.Achievement', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'requirement',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'target', //thu, chi, tiet_kiem, muc_tieu
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'target_goal', //so luong can dat
            	type:'int',
            	fieldOption:''
           },
           {
            	name:'target_inprogress', //so luong dang tien hanh
            	type:'string',
            	defaultValue:'0'
           },
        	{
            	name:'name',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'title',
            	type:'string',
            	fieldOption:''
            },{
            	name:'time',
            	type:'int'
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
	    		tablename:'achievement',
    			dbQuery: 'SELECT * FROM achievement'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
