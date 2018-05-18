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
            var scale = fRect.viewInfo.scale;
            var s = feature.get('start');
            var e = feature.get('end');
            var h = this.config.style.height;
            var vals = feature.get('alignments');
            var featseq = feature.get('seq').toLowerCase();
            var reg = this.track.browser.view.visibleRegion();
            var rw = reg.end - reg.start;
            var block = fRect.viewInfo.block;
            var lblock = block.bpToX(s);
            var rblock = block.bpToX(e);
            context.clearRect(lblock, 0, rblock - lblock, this.track.totalHeight);


            var correctionFactor = 0.02;
            if (scale >= 1) {
                correctionFactor = 0.6;
            } else if (scale >= 0.2) {
                correctionFactor = 0.05;
            } else if (scale >= 0.02) {
                correctionFactor = 0.03;
            }


            for (var j = 0; j < this.config.samples.length; j++) {
                var key = lang.isObject(this.config.samples[j]) ? this.config.samples[j].id : this.config.samples[j];
                if (vals[key]) {
                    var i;
                    var l;
                    var pos = j;
                    var left = block.bpToX(Math.max(s, block.startBase));
                    var right = block.bpToX(Math.max(s, block.startBase) + 1);
                    var delta = right - left;
                    var origAlignment = vals[key].data.substr(Math.max(block.startBase - s, 0), Math.min(block.endBase - block.startBase, e-s));
                    var seq = featseq.substr(Math.max(block.startBase - s, 0), Math.min(block.endBase - block.startBase, e-s));
                    var alignment = origAlignment.toLowerCase();

                    // gaps
                    context.fillStyle = this.config.style.gapColor;
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (alignment[i] === '-') {
                            context.fillRect(l, 3 / 8 * h + h * pos, delta + correctionFactor, h / 4);
                        }
                    }

                    // matches
                    context.fillStyle = this.config.style.matchColor;
                    for (i = 0; i < alignment.length; i++) {
                        l = left + delta * i;
                        if (seq[i] === alignment[i] && alignment[i] !== '-') {
                            context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                        }
                    }
                    // mismatches
                    if (this.config.style.mismatchBases) {
                        for (i = 0; i < alignment.length; i++) {
                            l = left + delta * i;
                            if (seq[i] !== alignment[i] && alignment[i] !== '-') {
                                if (alignment[i] == 'a') {
                                    context.fillStyle = this.config.style.mismatchA;
                                    context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                                } else if (alignment[i] == 'g') {
                                    context.fillStyle = this.config.style.mismatchG;
                                    context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                                } else if (alignment[i] == 'c') {
                                    context.fillStyle = this.config.style.mismatchC;
                                    context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                                } else if (alignment[i] == 't') {
                                    context.fillStyle = this.config.style.mismatchT;
                                    context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                                }
                            }
                        }
                    } else {
                        context.fillStyle = this.config.style.mismatchColor;
                        for (i = 0; i < alignment.length; i++) {
                            l = left + delta * i;
                            if (seq[i] !== alignment[i] && alignment[i] !== '-') {
                                context.fillRect(l, 1 / 4 * h + h * pos, delta + correctionFactor, h / 2);
                            }
                        }
                    }

                    // font
                    context.font = this.config.style.mismatchFont;
                    context.fillStyle = 'white';
                    if (delta >= charSize.w) {
                        for (i = 0; i < alignment.length; i++) {
                            l = left + delta * i;
                            var offset = (delta - charSize.w) / 2 + 1;
                            context.fillText(origAlignment[i], l + offset, h / 2 + h * pos + 2, delta + 0.6, h / 2);
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
        },
        mouseoverFeature: function () {
        }
    });
});

