Ext.Loader.setPath({
    'MyApp': 'app'
});
Ext.require([
		'MyApp.util.AppUtil',
		'MyApp.util.offline.Connection',
		'MyApp.util.offline.Proxy',
		'MyApp.util.offline.Data'
]);
Ext.onReady(function(){
	Ext.define('binhdocco.picker.Picker', {
	    override : 'Ext.picker.Picker',
	
	    config : {
	        doneButton   : {
	           text: 'Xong'
	        },
	        cancelButton : {
	           text: 'Hủy'
	        }
	    }
	});
	Ext.define('binhdocco.picker.Date', {
	    override : 'Ext.picker.Date',
	
	    config : {
	        doneButton   : {
	           text: 'Xong'
	        },
	        cancelButton : {
	           text: 'Hủy'
	        }
	    }
	});
	Ext.Date.monthNames = [
			"Tháng 1","Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng7", "Tháng 8", "Tháng 9", "Tháng 10","Tháng 11","Tháng 12"
		];
	Ext.Date.dayNames = [
		    "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
		];

	var dbconnval = {
        dbName: "moneysss",
        dbDescription: "MoneySSS database"
    };
   MyApp.util.AppUtil.dbConnection = Ext.create('MyApp.util.offline.Connection',dbconnval);
   MyApp.util.AppUtil.offline = Ext.create('MyApp.util.offline.Data',{});
});
Ext.application({
    name:'MyApp',
	 requires: [	 	
    ],   
    models:[
    	'System',
    	'Atm',
    	'AtmHistory',
    	'Saving',
    	'SavingHistory',
    ],
    stores:[
    	'Systems',
    	'Atms',
    	'AtmHistories',
    	'Savings',
    	'SavingHistories',
    	'AtmHistories_Recent',    	
    	'Savings',
    	'SavingHistories',
    	'SavingHistories_Recent',

    	'TestATMs',
    	'TestSavings'

	],
	startupImage: {
        '320x460': 'resources/startup/Default.png', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/Default@2x~iphone.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/Default-568h@2x~iphone.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/Default@2x~iphone.png' //  Non-retina iPad (first and second generation) in portrait orientation
    },
    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },
	views: ['App','AppMenu'],
    controllers: ['App', 'TabHome', 'TabExpense','TabAtm'],
    launch: function() {
    	if(!AppUtil.runningDevice()){
    		this.onDeviceReady();
    	}else{
    		document.addEventListener("deviceready", this.onDeviceReady, false);
    	}
    	
    },
    onDeviceReady:function(){
    	//PatientDiary.util.CommonUtil.preferredLanguage();
    	
    	var storeSystem = Ext.getStore('Systems');
		storeSystem.load(function(){				
			if(storeSystem.getCount()){					
				Ext.Array.each(storeSystem.getData().items, function(item, index) {	
					if (item)	{
						var sname = item.data.name;										
						if (sname == 'cash') {	
							AppUtil.CASH = parseInt(item.data.value);	
							AppUtil.CASH_MODEL = item;
						} 
					}				
						
				});				
	        }				
								
		
		    Ext.Viewport.add({
	        	xtype: 'app'
	    	});
	    	var menu = Ext.create('MyApp.view.AppMenu');
	    	Ext.Viewport.setMenu(menu, {
	            side: 'left',
	            reveal: true
	        });

    	});
    }

});
