define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'JBrowse/View/Track/CanvasFeatures',
    'JBrowse/Util',
    'dijit/Tooltip'
],
function (
    declare,
    array,
    lang,
    on,
    CanvasFeatures,
    Util,
    Tooltip
) {
    return declare(CanvasFeatures, {
        _defaultConfig: function () {
            return Util.deepUpdate(lang.clone(this.inherited(arguments)), {
                glyph: 'MAFViewer/View/FeatureGlyph/MAF'
            });
        },

        _getLayout: function () {
            var thisB = this;
            var layout = this.inherited(arguments);
            return declare.safeMixin(layout, {
                addRect: function (id, left, right, height, data) {
                    var ret = data.get('samples');
                    this.pTotalHeight = ret.length / 4 * (thisB.config.style.height + (thisB.config.style.offset || 0));
                    return this.pTotalHeight;
                }
            });
        },

        makeTrackLabel: function () {
            var thisB = this;
            var c = this.config;

            if (c.showLabels || c.showTooltips) {
                this.store.getSamples().then(function (header) {
                    var keys = dojo.clone(header.samples);
                    thisB.sublabels = array.map(keys, function (sample) {
                        var key = sample.trim();
                        var width = c.labelWidth ? c.labelWidth + 'px' : null;
                        var htmlnode = dojo.create('div', {
                            className: 'maftrack-sublabel',
                            id: thisB.config.label + '_' + key,
                            style: {
                                position: 'absolute',
                                height: c.style.height - 1 + 'px',
                                width: c.showLabels ? width : '10px',
                                font: c.labelFont
                            },
                            innerHTML: c.showLabels ? key : ''
                        }, thisB.div);

                        on(htmlnode, c.clickTooltips ? 'click' : 'mouseover', function () {
                            Tooltip.show(key, htmlnode);
                        });
                        on.once(htmlnode, 'mouseleave', function () {
                            Tooltip.hide(htmlnode);
                        });

                        return htmlnode;
                    });
                });
            }

            this.inherited(arguments);
        },

        updateStaticElements: function (coords) {
            this.inherited(arguments);
            if (this.sublabels && 'x' in coords) {
                var height = this.config.style.height + (this.config.style.offset || 0);
                var len = this.sublabels.length;
                array.forEach(this.sublabels, function (sublabel, i) {
                    sublabel.style.left = coords.x + 'px';
                    sublabel.style.top = i * height + 'px';
                    if (i === len - 1) {
                        dojo.addClass(sublabel, 'last');
                    }
                });
            }
        }
    });
});
