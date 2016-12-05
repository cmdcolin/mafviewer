# mafviewer

A JBrowse plugin for viewing multiple alignments


## Setup

Convert the MAF into a pseudo-BED format by calling bin/maf2bed.pl

    bin/maf2bed.pl hg38 < file.maf > output.bed

The second argument is the prefix which is normally the shortname as the genome version.

If all is well, your BED file should have 6 columns, with `chr, start, end, id, score, alignment_data`, where `alignment_data` is separated between each species by `;` and each field in the alignment is separated by `:`

## Options

Example config

    {
      "label": "MAF",
      "urlTemplate": "chrI.txt.gz",
      "storeClass": "MAFViewer/Store/SeqFeature/MAF",
      "type": "MAFViewer/View/Track/MAF",
      "samples": [
        "cb4",
        "caeRem4",
        "caePb3",
        "caeSp111",
        "caeJap4"
      ]
    }

## Installation


Download to the plugins/MAFViewer and add to your config file with

    "plugins": ["MAFViewer"]

See JBrowse FAQ on installing plugins


## Demo

The test/data/ directory contains sample data for C. Elegans and 6 worms. Visit http://localhost/jbrowse/?data=plugins/MAFViewer/test/data to view

## Notes

Requires JBrowse master branch at time of writing for BEDTabix functionality
