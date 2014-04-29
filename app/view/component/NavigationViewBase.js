Ext.define('MyApp.view.component.NavigationViewBase', {
    extend: 'Ext.navigation.View',
    xtype: 'component_navigationviewbase',
    requires: [
	],
    config: {
		defaultBackButtonText:'',
        autoDestroy: false,
        layout:{
			type:'card',
			animation:{
				type:'fade'
			}
		},
		navigationBar:{
			 backButton: {
	            iconCls: 'back',
	            //ui: 'plain',
	            style: {
	            	'margin-left': '10px'
	            }
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		{
					iconCls:'toolbar-icon-menu',
					align: 'left',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 60
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 60
                    }
				},
				{
					iconCls:'toolbar-icon-trade',
					align: 'right',
					style: {
						'padding-right': '0px',
						'padding-left': '0px',
					},
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 60
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 60
                    },
                    title: 'trade',
                    hidden: true
				},
				{
					iconCls:'toolbar-icon-edit',
					align: 'right',
					style: {
						'padding-right': '0px',
						'padding-left': '0px',
					},
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 60
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 60
                    },
                    title: 'edit',
                    hidden: true
				},
				{
					iconCls:'toolbar-icon-delete',
					style: {
						'padding-right': '8px',
						'padding-left': '0px',
					},
					align: 'right',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 60
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 60
                    },
                    title: 'delete',
                    hidden: true
				}
			]
       }
   },

   
   hideRightButtons: function() {
   		var me = this;
   		if (!me._tradeBtn) me._tradeBtn = me.down('button[title="trade"]');
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._tradeBtn.hide();
   		me._editBtn.hide();
   		me._delBtn.hide();
   },
   
    showRightButtons: function() {
   		var me = this;
   		if (!me._tradeBtn) me._tradeBtn = me.down('button[title="trade"]');
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._tradeBtn.show();
   		me._editBtn.show();
   		me._delBtn.show();
   },
});
