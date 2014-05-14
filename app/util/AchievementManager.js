Ext.define('MyApp.util.AchievementManager',{
	//Ext.getStore("Achievements_Completed").load();
	achieveStore: null,	
	allExerciseModel: null,
	
	constructor : function(config) {
        // This adds support for just passing a string used as the field name
       var me = this;
       me.callParent(arguments);
       
       //read Achievements to init requirements
       //me.checkRequirements();
       
    },
    checkRequirements: function() {
    	var me = this;
    	if (!me.achieveStore) me.achieveStore = Ext.getStore("Achievements");
       
       me.achieveStore.load(function(records){
       		me.check(records);	
       });
    },
    
    check: function(records) {
    	var me = this;
    	//console.log('AchivementManager');
    	//console.log(records);
    	Ext.Array.each(records, function(item, index){
    		if (item.data.title == 'exercise_master') me.allExerciseModel = item;
    		if (item.data.requirement == null || item.data.requirement == '') {
    			switch (item.data.title) {
    				case 'getting_started':
    					item.data.requirement = 'Exercise 3 times';    					
    					item.data.target_goal = 3;
    					item.data.target = 'exercise';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'getting_started.png';
    					item.data.start_at = 1;
    					break;
    				case 'toward_healthier_life':
    					item.data.requirement = 'Cook 3 dishes';    					
    					item.data.target_goal = 3;
    					item.data.target = 'food';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'toward_healthier_life.png';
    					item.data.start_at = 2;
    					break;
    				case 'planner_master':
    					item.data.requirement = 'Plan any meal 10 times';    					
    					item.data.target_goal = 10;
    					item.data.target = 'plan_meal';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'planner_master.png';
    					item.data.start_at = 3;
    					break;
    				case 'sport_hero':
    					item.data.requirement = 'Complete 10 exercises';    					
    					item.data.target_goal = 10;
    					item.data.target = 'exercise';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'sport_hero.png';
    					item.data.start_at = 4;
    					break;
    				case 'master_chief':
    					item.data.requirement = 'Cook 20 dishes';    					
    					item.data.target_goal = 20;
    					item.data.target = 'food';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'master_chief.png';
    					item.data.start_at = 5;
    					break;
    				case 'shopping_expert':
    					item.data.requirement = 'Clear the Grocery list 20 times';    					
    					item.data.target_goal = 20;
    					item.data.target = 'clear_grocery_list';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'shopping_expert.png';
    					item.data.start_at = 6;
    					break;
    				case 'in_the_zone':
    					item.data.requirement = 'Go to the info section for 20 times';    					
    					item.data.target_goal = 20;
    					item.data.target = 'goto_info';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'in_the_zone.png';
    					item.data.start_at = 7;
    					break;
    				case 'fruit_lover':
    					item.data.requirement = 'Eat any 20 fruits';    					
    					item.data.target_goal = 20;
    					item.data.target = 'eat_fruit';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'fruit_lover.png';
    					item.data.start_at = 8;
    					break;
    				case 'exercise_master':
    					item.data.requirement = 'Complete all the exercises';    					
    					item.data.target_goal = 22;
    					item.data.target = 'exercise_all';
    					item.data.image_path = 'resources/images/progress/';
    					item.data.file_name = 'exercise_master.png';
    					item.data.start_at = 9;
    					break;
    			}
    			item.save();
    		}
    	});
    },
    
    updateAchieve: function(target) {
    	//console.log('updateAchieve: ' + target);
    	var me = this;
    	var records = me.achieveStore.getData();
    	//console.log(records);
    	Ext.Array.each(records.items, function(item, index) {
    		if (item.data.is_event == null || item.data.is_event == '') {//not finished
    			if (item.data.target == target) {    				
    				var count = parseInt(item.data.target_inprogress);
    				count ++;
    				item.data.target_inprogress = count.toString();
    				if (count >= item.data.target_goal) {
    					me.completeAchievement(item);
    				}
    				item.save();
    				if (count >= item.data.target_goal) {
    					//refresh the completed list
						Ext.getStore("Achievements_Completed").load();
						Ext.getStore("Achievements").load();
    				}
    				
    			} 
    		}
    	});
    	if (me.allExerciseModel && (target == 'exercise')) { //check for all exercises completed
    		if (me.allExerciseModel.data.is_event == null || me.allExerciseModel.data.is_event == '') {
				var allExerciseStore = Ext.getStore('Histories_Count_Exercise');
	    		allExerciseStore.load(function(records){
	    			//console.log('completed exercise: ' + records.length);
	    			var count = records.length;
	    			var total = parseInt(me.allExerciseModel.data.target_goal);    			
	    			me.allExerciseModel.data.target_inprogress = count.toString();	    
	    			if (count >= total) {
	    				me.completeAchievement(me.allExerciseModel);
	    			}	
	    			me.allExerciseModel.save();    	
	    			if (count >= total) {
    					//refresh the completed list
						Ext.getStore("Achievements_Completed").load();
						Ext.getStore("Achievements").load();
    				}		
	    		});	    	
    		}
	    	
	    }
    },
    
    completeAchievement: function(item) {
    	item.data.is_event = 'completed';
    	item.data.duration = Ext.Date.now();
		var msg = Ux.locale.Manager.get('GET_NEW_ACHIEVEMENT', '');
		msg = Ext.util.Format.format(msg, item.data.name);
		PatientConcierge.app.fireEvent('show_avatar', 
						msg,
						CommonUtil.avatarType.bravo);
									
    }
});