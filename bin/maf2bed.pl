#!/usr/bin/env perl
use warnings;
use strict;

$, = ' ';
$\ = "\n";
$, = "\t";

my $id = 0;
my $buffer = '';
my $start = 0;
my $end = 0;
my $score = 0;
my $chrom = '';

while (<STDIN>) {
    chomp;
    my @Fld = split(' ', $_, -1);
    if (/^#/) {
        # ignore comments
    }
    elsif(/^i/) {
        # ignore 'i' lines
    }
    elsif (/^s $ARGV[0]/) {
        $chrom = $Fld[(2)-1];
        $chrom =~ s/$ARGV[0]\.//;
        $start = $Fld[(3)-1];
        $end = $Fld[(3)-1] + $Fld[(4)-1];
    }
    elsif (/^a/) {
        $score = +(s/^a score=//);
        print $chrom, $start, $end, "$ARGV[0]_$id", $score, $buffer;
        $id += 1;
        $buffer = '';
    }
    
    elsif (/^s/) {
        s/^s //;
        $buffer = "$buffer;$_";
    }
}
