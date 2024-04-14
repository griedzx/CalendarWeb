<?php
    $dir = 'assets/images/김지원/';
    $images = glob($dir . "*.jpg");

    // PHP循环 生成轮播图的HTML代码
    foreach ($images as $index => $image) {
    $active = $index == 0 ? 'active' : '';
    echo '<div class="carousel-item ' . $active . '">';
    echo '<img src="' . $image . '" class="d-block w-100" alt="...">';
    echo '</div>';
}
?>