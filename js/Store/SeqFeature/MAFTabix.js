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
            for (var l = 0; l < fields.length; l++) {
                if (fields[l] === '.') {
                    fields[l] = null;
                }
            }
            var data = fields[5].split(',');
            var alignments = {};
            var main = data[0];
            var aln = dojo.clone(main.split(':')[5]);
            var alns = data.map(function (elt) {
                return elt.split(':')[5];
            });


            for (var i = 0; i < aln.length; i++) {
                if (aln[i] == '-') {
                    for (var j = 0; j < alns.length; j++) {
                        alns[j][i] = ';';
                    }
                }
            }
            for(var p = 0; p < alns.length; p++) {
                alns[p] = alns[p].replace(';','');
            }

            data.forEach(function (elt, k) {
                var ad = elt.split(':');
                var org = ad[0].split('.')[0];
                var chr = ad[0].split('.')[1];

                alignments[org] = {
                    chr: chr,
                    start: +ad[1],
                    srcSize: +ad[2],
                    strand: ad[3],
                    unknown: +ad[4],
                    data: alns[k],
                    orig: ad[5]
                };
            });

            var featureData = {
                start: line.start,
                end: line.end,
                seq_id: line.ref,
                name: fields[3],
                score: +fields[4],
                alignments: alignments,
                seq: alns[0]
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
