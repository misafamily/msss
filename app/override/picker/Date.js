Ext.define('MyApp.override.picker.Date', {
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