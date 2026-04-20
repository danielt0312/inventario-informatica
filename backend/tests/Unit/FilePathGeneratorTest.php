<?php

use App\Support\FilePathGenerator;

test('genera una ruta basada en `uuid` con estructura `[a1]/[b2]/[a1b2c3d4-e5...].[ext]`', function () {
    $uuid = 'a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5g6h7';
    $ext = 'pdf';

    $result = FilePathGenerator::forUuid($uuid, $ext);

    expect($result)->toBe("a1/b2/{$uuid}.{$ext}");
});
