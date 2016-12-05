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
            var main = data[0];
            var aln = main.split(':')[5];
            var s = 0;
            while (s < aln.length) {
                if (aln[s] !== '-') {
                    break;
                }
                s++;
            }
            var e = aln.length - 1;
            while (e > 0) {
                if (aln[e] !== '-') {
                    break;
                }
                e--;
            }
            e = aln.length - e;
            data.slice(1).forEach(function (elt) {
                var alndata = elt.split(':');
                var org = alndata[0].split('.')[0];
                var chr = alndata[0].split('.')[1];

                alignments[org] = {
                    chr: chr,
                    start: +alndata[1],
                    srcSize: +alndata[2],
                    strand: alndata[3],
                    unknown: +alndata[4],
                    data: alndata[5].substring(s, alndata[5].length - e)
                };
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
