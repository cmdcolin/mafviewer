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
            var thisB = this;
            var s = fRect.f.get('start');

            keys.forEach(function (key) {
                if (vals[key]) {
                    var pos = thisB.config.samples.indexOf(key);
                    var alignment = vals[key].data;
                    for (var i = 0; i < alignment.length; i++) {
                        var left = fRect.viewInfo.block.bpToX(s + i);
                        var right = fRect.viewInfo.block.bpToX(s + i + 1);
                        if (alignment[i] === '-') {
                            context.fillStyle = 'red';
                            context.fillRect(left, 7.5 + thisB.config.style.height * pos, right - left + 0.6, 5);
                        } else {
                            context.fillStyle = 'green';
                            context.fillRect(left, 5 + thisB.config.style.height * pos, right - left + 0.6, 10);
                        }
                    }
                }
            });
            return 0;
        }
    });
});

