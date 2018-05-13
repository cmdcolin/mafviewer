# Version 0.8.0

- Add BigMaf support. This is a UCSC format based on BigBed. Requires 1.14.0 on JBrowse. See https://genome.ucsc.edu/FAQ/FAQformat.html#format9.3 for information on generating the bigMAF file format
- Improve performance significantly
- Disabled mouseover and click due to glitchyness

# Version 0.7.0

- Allow coloring mismatches by base (thanks @petersbr)

# Version 0.6.0

- Make the glyph look better when zoomed out very far
- Fix track height in areas where no alignment data is present
- Fix mouseover clearRect boundaries

# Version 0.5.0

- Made subpixel rendering more accurate
- Made it so you can specify full species name in addition to short name, and add colors/tooltips

# Version 0.4.0

- Further improve rendering by reducing off-screen rendering

# Version 0.3.0

- Add store class optimizations to avoid excessive GC
- Add rendering optimizations to avoid excessive canvas repainting

# Version 0.2.0

- Fix bug where it needs to check lower case
- Include ability to draw base pairs

# Version 0.1.0

- Include converter from MAF to pseudo-bed format
- Include storeClass that removes gapped alignments in reference (which can't be displayed using ref coord system)
