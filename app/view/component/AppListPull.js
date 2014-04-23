Ext.define('MyApp.view.component.AppListPull', {
    extend: 'MyApp.view.component.AppList',
    requires:[
    	'Ext.plugin.ListPaging',
        //'Ext.plugin.PullRefresh'
    ],
    config: {    	
     	scrollToTopOnRefresh: false,
		plugins: [
            { 
            	xclass: 'Ext.plugin.ListPaging',
            	loadMoreText: 'Xem tiếp ...',
            	noMoreRecordsText : 'Hết dữ liệu',
            	//autoPaging: true 
            }/*,
            { 
            	xclass: 'Ext.plugin.PullRefresh', 
            	pullRefreshText: 'Kéo xuống để lấy dữ liệu mới',
            	releaseRefreshText: 'Thả ra để lấy dữ liệu mới'  
            }*/
        ],		
    }
});
