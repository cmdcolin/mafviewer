define([
    'dojo/_base/declare',
    'JBrowse/Store/SeqFeature/BigBed',
    'JBrowse/Model/SimpleFeature'
],
function (
    declare,
    BigBed,
    SimpleFeature
) {
    return declare(BigBed, {
        getFeatures: function (query, featureCallback, errorCallback) {
            return this.inherited(arguments, [query, function (feature) {
                var maf = feature.get('maf_block');
                var blocks = maf.split(';');
                var aln;
                var start;
                var score;
                var end;
                var chr;
                var alns = [];
                var alignments = {};

                var strand;
                var blocks2 = [];
                for (var i = 0; i < blocks.length; i++) {
                    if (blocks[i][0] == 's') {
                        if (!aln) {
                            var x = blocks[i].split(/ +/);
                            var y = x[1].split('.');
                            species = y[0];
                            chr = y[1];
                            start = x[2];
                            end = x[3];
                            strand = x[4];
                            score = x[5];
                            aln = x[6];
                        } else {
                            blocks2.push(blocks[i]);
                            alns.push(blocks[i].split(/ +/)[6]);
                        }
                    }
                }
                var alns2 = alns.map(function (/* elt*/) {
                    return '';
                });

                for (var i = 0, o = 0; i < aln.length; i++, o++) {
                    if (aln[i] !== '-') {
                        for (var j = 0; j < alns.length; j++) {
                            alns2[j] += alns[j][i];
                        }
                    }
                }

                for (var k = 0; k < blocks2.length; k++) {
                    var elt = blocks2[k];
                    var ad = elt.split(/ +/);
                    var y = ad[1].split('.');
                    var org = y[0];
                    var chr = y[1];

                    alignments[org] = {
                        chr: chr,
                        start: +ad[1],
                        srcSize: +ad[2],
                        strand: ad[3],
                        unknown: +ad[4],
                        data: alns2[k],
                        orig: ad[5]
                    };
                }

                featureCallback(new SimpleFeature({
                    id: feature._uniqueID,
                    data: {
                        start: feature.get('start'),
                        end: feature.get('end'),
                        seq_id: feature.get('seq_id'),
                        score: score,
                        seq: aln,
                        alignments: alignments
                    }
                }));
            }, errorCallback]);
        }
    });
});
