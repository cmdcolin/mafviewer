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
            var feature = fRect.f;
            var charSize = this.getCharacterMeasurements(context);
            var s = feature.get('start');
            var h = this.config.style.height;
            var vals = feature.get('alignments');
            var seq = feature.get('seq');
            var reg = this.track.browser.view.visibleRegion();
            var rw = reg.end - reg.start;


            for (var j = 0; j < this.config.samples.length; j++) {
                var key = this.config.samples[j];
                if (vals[key]) {
                    var i;
                    var l;
                    var pos = j;
                    var alignment = vals[key].data;

                    var left = fRect.viewInfo.block.bpToX(s);
                    var right = fRect.viewInfo.block.bpToX(s + 1);
                    var delta = right - left;

                    // gaps
                    context.fillStyle = this.config.style.gapColor;
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (alignment[i] === '-') {
                            if (s + i > (reg.start - rw / 2) && s + i < (reg.end + rw / 2)) {
                                context.fillRect(l, 3 / 8 * h + h * pos, delta+0.01, h / 4);
                            }
                        }
                    }
                    
                    // matches
                    context.fillStyle = this.config.style.matchColor;
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (seq[i].toLowerCase() === alignment[i].toLowerCase()) {
                            if (s + i > (reg.start - rw / 2) && s + i < (reg.end + rw / 2)) {
                                context.fillRect(l, 1 / 4 * h + h * pos, delta+0.01, h / 2);
                            }
                        }
                    }
                    // mismatches
                    context.fillStyle = this.config.style.mismatchColor;
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (seq[i].toLowerCase() !== alignment[i].toLowerCase() && alignment[i] !== '-') {
                            if (s + i > (reg.start - rw / 2) && s + i < (reg.end + rw / 2)) {
                                context.fillRect(l, 1 / 4 * h + h * pos, delta+0.01, h / 2);
                            }
                        }
                    }
                    // font
                    context.font = this.config.style.mismatchFont;
                    context.fillStyle = 'white';
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (delta >= charSize.w) {
                            if (s + i > (reg.start - rw / 2) && s + i < (reg.end + rw / 2)) {
                                var offset = (delta - charSize.w) / 2 + 1;
                                context.fillText(alignment[i], l + offset, h / 2 + h * pos + 2, delta + 0.6, h / 2);
                            }
                        }
                    }
                }
            }
            return 0;
        },
        _defaultConfig: function () {
            return this._mergeConfigs(dojo.clone(this.inherited(arguments)), {
                style: {
                    mismatchFont: 'bold 10px Courier New,monospace'
                }
            });
        },

        getCharacterMeasurements: function (/* context*/) {
            this.charSize = this.charSize || function () {
                var fpx;

                try {
                    fpx = (this.config.style.mismatchFont.match(/(\d+)px/i) || [])[1];
                } catch (e) {/* empty */}

                fpx = fpx || Infinity;
                return { w: fpx, h: fpx };
            }.call(this);

            return this.charSize;
        }
    });
});

