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
            var block = fRect.viewInfo.block;
            var scale = fRect.viewInfo.scale;
            var charSize = this.getCharacterMeasurements( context );
            var thisB = this;
            var s = feature.get('start');
            var h = this.config.style.height;
            var vals = feature.get('alignments');
            var seq = feature.get('seq');
            r = false;
            if(scale >= 20) {
                r = true;
            }
            

            this.config.samples.forEach(function (key) {
                if (vals[key]) {
                    var pos = thisB.config.samples.indexOf(key);
                    var alignment = vals[key].data;
                    context.fillStyle = thisB.config.style.gapColor;
                    for (var i = 0; i < alignment.length; i++) {
                        var left = fRect.viewInfo.block.bpToX(s + i);
                        var right = fRect.viewInfo.block.bpToX(s + i + 1);
                        if (alignment[i] === '-') {
                            context.fillRect(left, 3 / 8 * h + h * pos, right - left + 0.6, h / 4);
                        }
                    }
                    for (var i = 0; i < alignment.length; i++) {
                        var left = fRect.viewInfo.block.bpToX(s + i);
                        var right = fRect.viewInfo.block.bpToX(s + i + 1);
                        if (alignment[i] !== '-') {
                            if (seq[i].toLowerCase() !== alignment[i].toLowerCase()) {
                                context.fillStyle = thisB.config.style.mismatchColor;
                                context.fillRect(left, 1 / 4 * h + h * pos, right - left + 0.6, h / 2);

                                if( right-left >= charSize.w) {
                                    context.font = thisB.config.style.mismatchFont;

                                    context.fillStyle = 'white';
                                    var offset = ((right-left)-charSize.w)/2+
                                    context.fillText( alignment[i], left+offset, h/2+h*pos+2, right-left + 0.6, h/2)
                                }
                            } else {
                                context.fillStyle = thisB.config.style.matchColor;
                                context.fillRect(left, 1 / 4 * h + h * pos, right - left + 0.6, h / 2);

                                
                            }
                            if( right-left >= charSize.w) {
                                context.font = thisB.config.style.mismatchFont;

                                context.fillStyle = 'white';
                                var offset = ((right-left)-charSize.w)/2+1
                                context.fillText( alignment[i], left+offset, h/2+h*pos+2, right-left + 0.6, h/2)
                            }
                        }
                    }
                }
            });
            return 0;
        },
        _defaultConfig: function() {
            return this._mergeConfigs(dojo.clone(this.inherited(arguments)), {
                style: {
                    mismatchFont: 'bold 10px Courier New,monospace'
                }
            });
        },

        getCharacterMeasurements: function( context ) {
            return this.charSize = this.charSize || function() {
                var fpx;

                try {
                    fpx = (this.config.style.mismatchFont.match(/(\d+)px/i)||[])[1];
                } catch(e) {}

                fpx = fpx || Infinity;
                return { w: fpx, h: fpx };
            }.call(this);
        }
    });
});

