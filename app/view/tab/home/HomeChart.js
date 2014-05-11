Ext.define('MyApp.view.tab.home.HomeChart', {
    extend: 'Ext.Container',
    xtype: 'tab_home_homechart',
    requires: [
    ],
	config: {
		recordData: null,
		data: {
			'labels': ["1","5","10","15","20","31"],
			'incomes': [4,210,6,30,20,5],
			'expenses':[100000,300000,4000000,50000,0,320000],
			'target': [2000,2000,2000,2000,2000,2000]
			//'bad_cholesterol': [2,3,1,5]
		}
        //html:'<canvas id="home_chart_canvas_id" width="310" height="170"></canvas>',
		//height: 220
     },
     initialize:function(){
	 	this.callParent(arguments);	
     	var me = this;
     	Ext.defer(function() {
     		me._screenWidth = me.element.dom.offsetWidth;
	     	me._screenHeight = me.element.dom.offsetHeight;
	     	
	     	var html = '<canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas>';
	     	html = Ext.util.Format.format(html, me._screenWidth, me._screenHeight);
	     	me.setHtml(html);
	     	//AppUtil.log(me);
	     	me._options = {
				//Boolean - Whether the line is curved between points
				scaleOverlay : true,	
				//Boolean - If we want to override with a hard coded scale
				scaleOverride : true,			
				//** Required if scaleOverride is true **
				//Number - The number of steps in a hard coded scale
				scaleSteps : 10,
				//Number - The value jump in the hard coded scale
				scaleStepWidth : 2000000,
				//Number - The scale starting value
				scaleStartValue : 0,
				//scaleShowLabels : true,
				scaleShowGridLines : false,
				scaleLabel : "<%=value/1000000%> tr đ",
				pointDot: false,
				bezierCurve : false,
				animation : false,
				pointDotRadius : 2,
				scaleFontColor: "#424242",
				pointDotStrokeWidth : .1,
				scaleGridLineColor : "rgba(111,104,95,.3)",
				scaleLineColor : "rgba(111,104,95,.6)",
				scaleFontFamily : 'ROBOTO-LIGHT'
			};
	
			Ext.defer(function() {
				if (!me._context) me._context = document.getElementById("home_chart_canvas_id").getContext("2d");
				me.showChart();
			},200);
     	}, 200);
     	
		
		//PatientDiary.app.on('update_progresschart', this.showChart, this);
    },
	showChart: function(recorddata) {
		AppUtil.log('showChart');
		var me = this;		
		if (recorddata) me.setRecordData(recorddata);
		setTimeout(function(){
			me.generateDataForCurrentMonth();
		},100);
	},

	generateDataForCurrentMonth: function() {
		var me = this;
		me.getData()['labels'] = [];	
		me.getData()['incomes'] = [];	
		me.getData()['expenses'] = [];
		me.getData()['target'] = [];		
		var today = new Date();
		me.getDataForMonth(today);
		
	},
	getDataForMonth: function(date) {
		var me = this;		
		var daysInMonth = Ext.Date.getDaysInMonth(date);
		var todayDate = date.getDate();
		var labels = me.getData()['labels'];
		var incomes = me.getData()['incomes'];
		var expenses = me.getData()['expenses'];
		
		for (var i = 0; i < daysInMonth; i++) {
			labels.push((i+1).toString());
		}
		for (var i = 0; i < todayDate; i++) {
			incomes.push(0);
			expenses.push(0);
			//me.getData()['target'].push(10000);	
		}
		//get expense of this month
		if (!me._monthStore) me._monthStore = new MyApp.store.Expenses_Month();
		me._monthStore.load(function(records) {
			//AppUtil.log(records);
			
			Ext.Array.each(records, function(item, index) {
				if (item.data.dd <= todayDate) {
					if (item.data.type == 'thu' || item.data.type == 'linh_lai') {
						incomes[item.data.dd-1] += parseInt(item.data.amount);
					} else if (item.data.type == 'chi') {
						expenses[item.data.dd-1] += parseInt(item.data.amount);
					}
				}			
			});
			var thuTotal = incomes[0];
			var chiTotal = expenses[0];
			for (var i = 1; i < incomes.length; i++) {
				thuTotal += incomes[i];
				incomes[i] = thuTotal;
				chiTotal += expenses[i];
				expenses[i] = chiTotal;
			}
			MyApp.app.fireEvent('thuchi_changed', thuTotal, chiTotal);
			var max = thuTotal > chiTotal ? thuTotal : chiTotal;
			//AppUtil.log(max);
			if (max < 5000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 1000000;
			} else if (max < 10000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 2000000;
			} else if (max < 15000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 3000000;
			} else if (max < 20000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 4000000;
			} else if (max < 25000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 5000000;
			} else if (max < 30000000) {
				me._options.scaleSteps = 6;
				me._options.scaleStepWidth = 5000000;
			} else if (max < 35000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 7000000;
			} else if (max < 40000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 8000000;
			} else if (max < 45000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 9000000;
			} else if (max < 50000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 10000000;
			} else if (max < 55000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 11000000;
			} else if (max < 60000000) {
				me._options.scaleSteps = 6;
				me._options.scaleStepWidth = 10000000;
			} else if (max < 65000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 13000000;
			} else if (max < 70000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 15000000;
			} else if (max < 80000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 16000000;
			} else if (max < 100000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 20000000;
			} else if (max < 15000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth =30000000;
			} else if (max < 200000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth =40000000;
			}  else me._options.scaleOverride = false;
			me.checkGetDataDone();
		});
		
	},
	
	checkGetDataDone: function() {		
		var me = this;
		//this.getData()['labels'].reverse();
		//this.getData()['value'].reverse();
		//this.getData()['bad_cholesterol'].reverse();
		
		var lineChartData = {
			labels : me.getData()['labels'],
			datasets : [
				{
					fillColor : "rgba(97,162,97,1)",
					strokeColor : "rgba(0,55,43,1)",
					pointColor : "rgba(0,55,43,.6)",
					pointStrokeColor : "#fff",
					data : me.getData()['incomes']
				},
				{
					fillColor : "rgba(205,68,71,1)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : this.getData()['expenses']
				}/*,
				{
					fillColor : "none",
					strokeColor : "rgba(255,130,0,1)",
					pointColor : "rgba(255,130,0,1)",
					pointStrokeColor : "#fff",
					data : this.getData()['target']
				}*/
			]
			
		};
		//var max = Ext.Array.max(this.getData()['value']);
		//max = parseInt(Math.ceil(max/5))*5;
		//this._options.scaleStartValue = Ext.Array.min(this.getData()['value']);			
		//this._options.scaleSteps = max%5;
		//this._options.scaleStepWidth = max / 5;
		
		me._context.save();
		me._context.setTransform(1, 0, 0, 1, 0, 0);
		me._context.clearRect(0, 0, me._screenWidth, me._screenHeight);
		me._context.restore();
		if (!me._line) {
			me._line = new Chart(me._context);
		}
		me._line.Line(lineChartData, me._options);

		
	}
});