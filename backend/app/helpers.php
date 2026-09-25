<?php

if (! function_exists('str_compact_join')) {
    function str_compact_join(mixed ...$args): string
    {
        $items = is_array($args[0] ?? null) ? $args[0] : $args;
        return implode(' ', array_filter($items));
    }
}
