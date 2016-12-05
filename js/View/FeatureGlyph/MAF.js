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

            keys.forEach(function (key, i) {
                var col;
                if (vals[key]) {
                    col='red';
                } else {
                    col='green';
                }
                this.renderBox(context, fRect.viewInfo, fRect.f, i * thisB.config.style.height, thisB.config.style.height, fRect.f, function () { return col; });
            }, this);

            return 0;
        }
    });
});

