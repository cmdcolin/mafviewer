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
        constructor: function(args) {
            this.config.commentCallback = function(r) {
                console.log(r);
            }
        },
        lineToFeature: function (line) {
            var fields = line.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] === '.') {
                    fields[i] = null;
                }
            }
            var data = fields[5].split(';');
            var alignments = {};
            data.forEach(function(elt) {
                var line = elt.split(':');
                console.log(line[0]);
                var org = line[0].split('.')[0];
                var chr = line[0].split('.')[1];
                alignments[line[0]] = {
                    chr: chr,
                    start: line[1],
                    end: line[2],
                    data: line[3]
                };
            });
            console.log(alignments);

            var featureData = {
                start: line.start,
                end: line.end,
                seq_id: line.ref,
                name: fields[3],
                score: fields[4],
                alignments: alignments,
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
