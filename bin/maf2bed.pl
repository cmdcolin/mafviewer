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
    my @line = split(' ', $_, -1);
    if (/^s $ARGV[0]/) {
        $chrom = $line[1];
        $chrom =~ s/$ARGV[0]\.//;
        $start = $line[2];
        $end = $line[2] + $line[3];
    }
    elsif (/^a/) {
        $score = +(s/^a score=//);
        if($id > 0) {
            print $chrom, $start, $end, "$ARGV[0]_$id", $score, $buffer;
        }
        $id += 1;
        $buffer = '';
    }
    
    elsif (/^s/) {
        s/^s //;
        s/ +/:/g;
        my $temp = $_;
        $buffer = $buffer eq '' ? $temp : "$buffer,$temp";
    }
}
