<?php
$string = '25.50';

// Cast to float
$float = (float)$string;
echo gettype($float) . "(" . $float . "), ";

// Cast to int
$int = (int)$float;
echo gettype($int) . "(" . $int . ")";
?>