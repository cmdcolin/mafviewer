define([
    'dojo/_base/declare',
    'JBrowse/Store/SeqFeature/BEDTabix',
    'JBrowse/Model/SimpleFeature'
],
function (
    declare,
    BEDTabix,
    SimpleFeature
) {
    return declare(BEDTabix, {
        lineToFeature: function (line) {
            var fields = line.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] === '.') {
                    fields[i] = null;
                }
            }
            var samples = fields[5].split('\t').map(function (elt) { return elt.split(':')[0]; });

            var featureData = {
                start: line.start,
                end: line.end,
                seq_id: line.ref,
                name: fields[3],
                score: fields[4] ? +fields[4] : null,
                alignment: fields[5],
                samples: samples
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
