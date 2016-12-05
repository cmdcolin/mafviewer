define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/FeatureGlyph/Box'
],
function (
    declare,
    array,
    lang,
    FeatureGlyph
) {
    return declare(FeatureGlyph, {
        getColor: function (feature, genotype, genotypeFull) {
            return this.getConf('style.color', [feature, genotype, genotypeFull]);
        },
        renderFeature: function (context, fRect) {
            var keys = this.config.samples;
            var vals = fRect.f.get('alignments');
            var left  = fRect.viewInfo.block.bpToX(fRect.f.get('start'));
            var thisB = this;

            keys.forEach(function (key) {
                if (vals[key]) {
                    var pos = thisB.config.samples.indexOf(key);
                    var alignment = vals[key].data;
                    for (var i = 0; i < alignment.length; i++) {
                        var right = fRect.viewInfo.block.bpToX(fRect.f.get('start') + i);
                        if (alignment[i] == '-') {
                            context.fillStyle = 'red';
                        } else {
                            context.fillStyle = 'green';
                        }
                        context.fillRect(left, 5 + thisB.config.style.height * pos, right - left, 10);
                    }
                }
            });

            return 0;
        }
    });
});

