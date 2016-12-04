define([
    'dojo/_base/declare',
    'JBrowse/Store/SeqFeature/BEDTabix'
],
function (
    declare,
    BEDTabix
) {
    return declare(BEDTabix, {
        lineToFeature: function (line) {
            console.log('here');
            var fields = line.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] == '.') {
                    fields[i] = null;
                }
            }

            var featureData = {
                start: line.start,
                end: line.end,
                seq_id: line.ref,
                name: fields[3],
                score: fields[4] ? +fields[4] : null,
                strand: {'+': 1, '-': -1}[fields[5]] || 0
            };

            var f = new SimpleFeature({
                id: fields.slice(0, 5).join('/'),
                data: featureData,
                fields: fields
            });

            return f;
        }
    });
});
