# mafviewer

A JBrowse plugin for viewing multiple alignments


## Prepare data

Convert the MAF into a pseudo-BED format by calling bin/maf2bed.pl

    bin/maf2bed.pl hg38 < file.maf > output.txt
    bgzip output.txt
    tabix -p bed output.txt.gz

The second argument to maf2bed.pl is the genome version e.g. hg38 used for the main species in the MAF (if your MAF comes from a pipeline like Ensembl or UCSC, the identifiers in the MAF file will say something like hg38.chr1, therefore, the argument to maf2bed.pl should just be hg38 to remove hg38 part of the identifier. if your MAF file does not include the species name as part of the identifier, you should add the species into them the those scaffold/chromosome e.g. create hg38.chr1 if it was just chr1 before)

If all is well, your BED file should have 6 columns, with `chr, start, end, id, score, alignment_data`, where `alignment_data` is separated between each species by `;` and each field in the alignment is separated by `:`.

Note: you can also stream from a gzipped MAF to the bgzipped bed

    gunzip -c chr21.maf.gz | bin/maf2bed.pl hg38 | bgzip > output.txt.gz


The bin/convert.sh script has a small automatic processing from maf to bgzipped, tabixed, bed.

## Options


- samples - an array of species in the MAF file (e.g. hg38, mm10, etc.)
- labelWidth - an integer width for labels (default: 100)
- style.matchColor - color to use for matches (default: green)
- style.mismatchColor - color to use for mismatches (default: blue)
- style.gapColor - color to use for gaps in alignment (default: red)


Note: samples can be the array of strings like ["hg38","mm10"] or an array of extended JSON structures in order to customize the subtrack labels e.g. `{"id": "hg38", "label": "Human", "description": "Extended description of species", "color": "rgb(255,255,0)" }` 

## Example config

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

## Screenshot

[![](img/1.png)](https://raw.githubusercontent.com/cmdcolin/mafviewer/master/img/1.png)

For comparison this is the same region in UCSC browser ([picture](https://raw.githubusercontent.com/cmdcolin/mafviewer/master/img/2.png)) ([link](https://genome.ucsc.edu/cgi-bin/hgTracks?hgS_doOtherUser=submit&hgS_otherUserName=cdiesh&hgS_otherUserSessionName=hg38))

## Installation


Download to the plugins/MAFViewer and add to your config file with

    "plugins": ["MAFViewer"]

See JBrowse FAQ on installing plugins


## Demo

The test/ directory contains sample data for C. Elegans (from UCSC), Human (from UCSC), Medaka (from Ensembl).

Visit http://localhost/jbrowse/?data=plugins/MAFViewer/test/data or http://localhost/jbrowse/?data=plugins/MAFViewer/test/medaka or http://localhost/jbrowse/?data=plugins/MAFViewer/test/hg38 to view

## Notes

Requires JBrowse 1.12.3 or later for BEDTabix functionality

Feel free to provide feedback!
