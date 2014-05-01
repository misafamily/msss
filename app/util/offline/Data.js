Ext.define('MyApp.util.offline.Data',{
	extend:'Ext.util.Observable',
	alias:'data',
	constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        var me = this;
        me.callParent([this]);
       
        return me;
  },
  filterStore:function(store,field, value){
  		//var store = Ext.getStore(name);
  		store.filter({property: field, value:value});
  },
  updateStoreQuery:function(store, name, extra){
  		//var store = Ext.getStore(name);
  		store.getProxy().config.dbConfig.dbQuery = this.getQuery(name, extra);
		//store.load();
  },
  
  getQuery:function(name, extra){
  	var queryStr = "";
  	switch(name){
  			case 'AtmHistories':
  				var atm_id = extra.atm_id;
  				queryStr = 'SELECT * FROM atm_history WHERE atm_id="' + atm_id + '" ORDER BY id DESC';
  				break;
  			case 'AtmHistories_Recent':
  				var atm_id = extra.atm_id;
  				queryStr = 'SELECT * FROM atm_history WHERE atm_id="' + atm_id + '" ORDER BY id DESC LIMIT 3';
  				//console.log(queryStr);
  				break;
  			case 'SavingHistories':
  				var saving_id = extra.saving_id;
  				queryStr = 'SELECT * FROM saving_history WHERE saving_id="' + saving_id + '" ORDER BY id DESC';
  				break;
  			case 'SavingHistories_Recent':
  				var saving_id = extra.saving_id;
  				queryStr = 'SELECT * FROM saving_history WHERE saving_id="' + saving_id + '" ORDER BY id DESC LIMIT 3';
  				//console.log(queryStr);
  				break;
  			case 'Cashs':
  				queryStr = 'SELECT * FROM expense WHERE buyingtype="tien_mat" ORDER BY id DESC';
  				//console.log(queryStr);
  				break;
  			case 'Cashs_Recent':
  				queryStr = 'SELECT * FROM expense WHERE buyingtype="tien_mat" ORDER BY id DESC LIMIT 3';
  				//console.log(queryStr);
  				break;
  			case 'Expenses_Day':
  				var dd = extra.dd;
  				var mm = extra.mm;
  				var yy = extra.yy;
  				queryStr = 'SELECT * FROM expense WHERE dd=' + dd + ' AND mm=' + mm + ' AND yy=' + yy + ' ORDER BY id DESC';
  				//console.log(queryStr);
  				break;
  			case 'Expenses_Week':
  				var fDate = extra.from;
  				Ext.Date.clearTime(fDate);
  				
  				var tDate = extra.to;
  				tDate = Ext.Date.clearTime(tDate, true);
  				tDate.setDate(tDate.getDate() + 1);
  								
  				queryStr = 'SELECT * FROM expense WHERE time >= ' + fDate.getTime() + ' AND time < ' + tDate.getTime() + ' ORDER BY time DESC';
  				//console.log(queryStr);
  				break;
  			
  			case 'Expenses_Month':
  				var mm = extra.mm;
  				var yy = extra.yy;
  				
  				//queryStr = 'SELECT SUM(amount) as chi, time FROM expense WHERE mm = ' + mm + ' AND yy = ' + yy + ' GROUP BY dd,mm,yy,type ORDER BY dd DESC';
  				queryStr = 'SELECT * FROM expense WHERE mm = ' + mm + ' AND yy = ' + yy + ' ORDER BY time DESC';
  				//console.log(queryStr);
  				break;
			/*case 'Records_Lastest':
				var limit = 'LIMIT ';
				if (extra == 'blood') limit += '6';
				else limit += '3';
				queryStr = 'SELECT * FROM record r WHERE r.type="' + extra + '" ORDER BY r.time DESC, r.pos ASC ' + limit;
			break;

			case 'Records_Date':
				queryStr = 'SELECT * FROM record r WHERE r.date="' + extra + '"'
			break;
			
			case 'Records_Filter_Month':
  				queryStr = 'SELECT SUM(IFNULL(r.value, 0)) as xtotal FROM record r WHERE type="' + extra.type + '" AND mm=' + extra.mm + ' AND yy=' + extra.yy + ' AND pos=' + extra.pos;
  			break;	
			
			case 'Records_Detail_Record':
  				queryStr = 'SELECT * FROM record r WHERE type="' + extra.type + '" AND pos=' + extra.pos + ' ORDER BY r.time DESC ' + extra.limit;
  			break;
			
			case 'Appointments_Selected_Date':
  				queryStr = 'SELECT * FROM appointment WHERE dd=' + extra.dd + ' AND mm=' + extra.mm + ' AND yy=' + extra.yy + ' ORDER BY time DESC';
  			break;
			
			case 'Appointments':
  				queryStr = 'SELECT * FROM appointment ORDER BY time DESC';
  			break;
			
			case 'Appointments_Next':
  				queryStr = 'SELECT * FROM appointment where time > ' + ((new Date()).getTime() - 2*60*1000) + ' ORDER BY time ASC LIMIT 1';
  			break;
			*/
			//select * from appointment where time > 1395131438436 order by time asc limit 1
			
  	}
  	return queryStr;
  },
  removeStore:function(name){
  	var store = Ext.getStore(name);
  	if(store.isLoaded){
  		store.removeAll();
  		store.sync();
  	}
  },
  dropTable:function(name){
  	var catStore = Ext.getStore(name);
  	catStore.getModel().getProxy().dropTable();
  },
  alterTable:function(name){
  	
  },
   reloadData:function(){
  	//console.log('DATA reloadData');
  	var stores = MyApp.app.getStores();	
  	Ext.Array.each(stores,function(store,index){			
		if (store.updateDBQuery) store.updateDBQuery();
		if (store.config.needReload) {
			store.removeAll();
	  		store.load();	
		}
		
  	});
	//PatientConcierge.util.CommonUtil.updateLevelProgress();
  }
});