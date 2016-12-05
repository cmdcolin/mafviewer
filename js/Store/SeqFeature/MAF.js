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
            var data = fields[5].split(',');
            var alignments = {};
            data.forEach(function (elt) {
                console.log(elt);
                if (elt) {
                    var line = elt.split(':');
                    var org = line[0].split('.')[0];
                    var chr = line[0].split('.')[1];
                    alignments[org] = {
                        chr: chr,
                        start: +line[1],
                        srcSize: +line[2],
                        strand: line[3],
                        unknown: +line[4],
                        data: line[5]
                    };
                }
            });

            var featureData = {
                start: line.start,
                end: line.end,
                seq_id: line.ref,
                name: fields[3],
                score: fields[4],
                alignments: alignments
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
