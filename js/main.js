define([
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function (
    declare,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function (/* args */) {
            console.log('MafPlugin plugin starting');
        }
    });
});
