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
            var style = lang.hitch(this, 'getStyle');
            var color = lang.hitch(this, 'getColor');
            var height = this._getFeatureHeight(fRect.viewInfo, fRect.f);
            var keys = this.config.samples;
            var vals = fRect.f.get('alignments');
            var thisB = this;

            keys.forEach(function (key, ret) {
                var col;
                if (vals[key]) {
                    col='red';
                } else {
                    col='green';
                }
                var offset = ret * (style(fRect.f, 'height') + (style(fRect.f, 'offset') || 0));
                this.renderBox(context, fRect.viewInfo, fRect.f, offset, height, fRect.f, function () { return col; });
            }, this);

            return 0;
        }
    });
});

