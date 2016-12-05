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
        getColor: function (type) {
            return this.getConf('style.color', [type]);
        },
        renderFeature: function (context, fRect) {
            var thisB = this;
            var s = fRect.f.get('start');
            var h = this.config.style.height;
            var vals = fRect.f.get('alignments');

            this.config.samples.forEach(function (key) {
                if (vals[key]) {
                    var pos = thisB.config.samples.indexOf(key);
                    var alignment = vals[key].data;
                    for (var i = 0; i < alignment.length; i++) {
                        var left = fRect.viewInfo.block.bpToX(s + i);
                        var right = fRect.viewInfo.block.bpToX(s + i + 1);
                        if (alignment[i] === '-') {
                            context.fillStyle = thisB.config.style.mismatchColor;
                            context.fillRect(left, 3 / 8 * h + h * pos, right - left + 0.6, h / 4);
                        } else {
                            context.fillStyle = thisB.config.style.matchColor;
                            context.fillRect(left, 1 / 4 * h + h * pos, right - left + 0.6, h / 2);
                        }
                    }
                }
            });
            return 0;
        }
    });
});

