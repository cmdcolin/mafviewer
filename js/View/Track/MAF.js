define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'JBrowse/View/Track/CanvasFeatures',
    'JBrowse/Util'
],
function (
    declare,
    array,
    lang,
    on,
    CanvasFeatures,
    Util
) {
    return declare(CanvasFeatures, {
        _defaultConfig: function () {
            return Util.deepUpdate(lang.clone(this.inherited(arguments)), {
                glyph: 'MAFViewer/View/FeatureGlyph/MAF',
                showLabels: true,
                labelWidth: 75,
                style: {
                    height: 20,
                    mismatchColor: 'blue',
                    matchColor: 'green',
                    gapColor: 'red',
                    mismatchFont: 'bold 10px Courier New,monospace'
                }
            });
        },

        _getLayout: function () {
            var thisB = this;
            var layout = this.inherited(arguments);
            return declare.safeMixin(layout, {
                addRect: function (/* id, left, right, height, data */) {
                    this.pTotalHeight = thisB.config.samples.length * thisB.config.style.height;
                    return this.pTotalHeight;
                }
            });
        },

        makeTrackLabel: function () {
            var thisB = this;
            var c = this.config;

            thisB.sublabels = array.map(c.samples, function (key, i) {
                var width = c.labelWidth ? c.labelWidth + 'px' : null;
                var htmlnode = dojo.create('div', {
                    className: 'maftrack-sublabel' + (i === c.samples.length - 1 ? ' last' : ''),
                    id: thisB.config.label + '_' + key,
                    style: {
                        position: 'absolute',
                        height: (c.style.height - 1) + 'px',
                        width: c.showLabels ? width : '10px',
                        top: (i * c.style.height) + 'px',
                        font: c.labelFont
                    },
                    innerHTML: c.showLabels ? key : ''
                }, thisB.div);

                return htmlnode;
            });

            this.inherited(arguments);
        },

        updateStaticElements: function (coords) {
            this.inherited(arguments);
            if ('x' in coords) {
                array.forEach(this.sublabels, function (sublabel) {
                    sublabel.style.left = coords.x + 'px';
                });
            }
        }
    });
});
