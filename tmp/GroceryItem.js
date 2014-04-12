Ext.define('PatientConcierge.view.tab.food.GroceryItem', {
	extend: 'Ext.Container',
    xtype: 'tab_food_groceryitem',
    requires: [		
		
	],
    config: {
		cls: 'groceryitem-container',
		data: null,
		itemStoreList: null,
		layout: {
			type: 'vbox'
		}
	},
	
	initialize: function() {
		this.callParent(arguments);
	},
		
	updateData: function() {		
		this.removeAll(false);
        this.createView();		
	},
	getSelectedItemCount: function() {
		var listview = this.getList();
		var store = listview.getStore();
		var items = store.data.items;
   		var list = [];
		var count = 0;
		//console.log('getSelectedItemCount listview: ' + (this.getData()['name']?this.getData()['name']:this.getData()['title']).toUpperCase());		
   		for (var i = 0; i < items.length; i++) {
			var item = 	items[i];		
	   		var rowDom = Ext.get("groceryitem_"+item.data.id+"_"+item.data.item_id).dom;
			//console.log('item.data.id: ' + item.data.id + ' rowDom.className: ' + rowDom.className);			
	   		if(rowDom.className != "thumb"){
				count ++;				
			}
		}			
		return count;
				//console.log(item);			
	},
	removeSelectedItems: function() {
		var listview = this.getList();
		var store = listview.getStore();
		var items = store.data.items;
   		var list = [];		
   		Ext.Array.each(items,function(item,index){			
	   		var rowDom = Ext.get("groceryitem_"+item.data.id+"_"+item.data.item_id).dom;			
	   		if(rowDom.className != "thumb"){				
				//console.log(item);				
	   			list.push(item);
	   			rowDom.className = "thumb";
				//item.data.total = 0;
				//item.save();
			 
				
				itemObj = Ext.create("PatientConcierge.model.Item",{
					item_id:item.data.item_id,
					category_id:item.data.category_id,									
					total: 0
				}, item.data.id);
				itemObj.save();	
				
			}
	   	});

	   	if(store.getCount() == list.length){
	   		store.removeAll();
	   	}else{
		    Ext.Array.each(list,function(num,index){	
				store.remove(num);
		    });
	    }
		
		listview.setHeight(42*store.data.items.length);
		if (store.data.items.length == 0) {
			listview.setHeight(42);
		}
		
		return list.length;
	},
	
	removeAllData: function() {
		var list = this.getList();
		var store = list.getStore();
		var items = store.data.items;
		Ext.Array.each(items,function(item,index){
	   		//item.data.total = 0;
			//item.save();
			itemObj = Ext.create("PatientConcierge.model.Item",{
					item_id:item.data.item_id,
					category_id:item.data.category_id,									
					total: 0
				}, item.data.id);
				itemObj.save();	  		
	   	});
		store.removeAll();
		list.setHeight(42);
		//var header = this.getHeader();
		//var itemstext = header.down('container[cls= "food-grocery-item-items"]');
		//itemstext.setHtml('0' + ' items');
	},	
	
	onUpdateStore: function() {
		var list = this.getList();
		var itemStore = list.getStore();
		itemStore.load(function() {
				list.setHeight(42*itemStore.data.items.length);
				if (itemStore.data.items.length == 0) {
					list.setHeight(42);
				}
			});;
	},
	
	createView: function() {		
		var data = this.getData();
		if (data) {
			var header = this.getHeader();
			header.setStyle({
					'background-image': this.getImage(),//'url(resources/images/grocery/fruit.png)',				
				});
				
			var title = header.down('container[cls= "food-grocery-item-title"]');
			title.setHtml((this.getData()['name']?this.getData()['name']:this.getData()['title']).toUpperCase());
			
			var itemstext = header.down('container[cls= "food-grocery-item-items"]');
			itemstext.setHtml(this.getData()['total_item'] + ' items');
						
			var list = this.getList();
			var itemStore = new PatientConcierge.store.Category_Items();//data.items;
			itemStore.getProxy().config.dbConfig.dbQuery = PatientConcierge.util.CommonUtil.offline.getDbQueryString("Category_Items",PatientConcierge.util.CommonUtil.getLang(),{category_id:data.category_id});
			itemStore.load(function() {
				list.setHeight(42*itemStore.data.items.length);
				if (itemStore.data.items.length == 0) {
					list.setHeight(42);
				}
			});
	    	this.setItemStoreList(list);
			
	    	if (list.getStore()) list.getStore().removeAll();
	    	
	    	//list.getScrollable().getScroller().scrollToTop();
			list.setScrollable(false);
			list.setStore(itemStore);			
			
			//var buttons = this.getButtons();
			
			this.add(header);
			this.add(list);
			//this.add(buttons);
		}
	},
	getHeader: function() {
		//console.log('getHeader');
		if (!this._header) {
			this._header = Ext.create('Ext.Container', {
				cls: 'food-grocery-item-photo',
				style: {
					'margin-top': '1px',
					'background-image': this.getImage(),//'url(resources/images/grocery/fruit.png)',				
				},			
				items: [
					{
						xtype: 'container',
						cls: 'food-grocery-item-photo-shade'
					},//end shape img
					{
						xtype: 'container',		
						//html: this.getData()['name'],//'Vegetables & fruits',
						cls: 'food-grocery-item-title'
					},//end shape img
					{
						xtype: 'container',		
						//html: this.getData()['name'],//'Vegetables & fruits',
						cls: 'food-grocery-item-items'
					}, 
					{
						xtype: 'button',		
						//html: this.getData()['name'],//'Vegetables & fruits',
						cls: 'food-grocery-item-add-button',
						title: 'groceryitem_add_button'
					}
				]
			});
		}
		return this._header;
	},
	getList: function() {
		//console.log('getIngredientList');
		if (!this._list) {			
			this._list = Ext.create('PatientConcierge.view.component.EffortList',{				
				cls: 'food-recipedetail-list groceryitem-item-list',
		        //store: 'Category_Items',
				//height: 100,
		        itemTpl: [
					'<div class= "title">{total} {unit} {name}</div>',
		            '<div class="thumb" id = "groceryitem_{id}_{item_id}"></div>'		           
		        ].join(''),
		  		style: {					
					'margin-top': '0px',
					'margin-bottom': '0px'
				}
			});	
		}
		//console.log(Ext.getStore('Category_Items'));
		return this._list;
	},	
	
	getImage: function() {
		//return 'url(resources/photos/Food/' + this.getData()['title'] + ')';
		return 'url('+this.getData()['image_path']+'/'+this.getData()['file_name']+')';
	}
});
/*
Ext.define('PatientConcierge.view.tab.food.Grocery', {
	extend: 'PatientConcierge.view.component.EffortList',
    xtype: 'tab_food_grocery',
    requires: [		
		
	],
    config: {
		cls: 'food-grocerylist-list grocery-item-list',
        itemTpl: [
            '<div class="thumb" style="background-image:url({image_path}/{file_name});"></div>',
           '<div class= "title">{title}</div>',
		   '<div class= "items">{total_item} items</div>'
        ].join(''),
        emptyText:'No data'
	}
});
*/