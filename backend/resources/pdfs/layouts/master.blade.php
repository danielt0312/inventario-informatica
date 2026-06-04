{{--
/**
 * @var string $title
 * @var Illuminate\View\ComponentSlot|null $header
 * @var Illuminate\View\ComponentSlot|null $footer
 */
--}}
@props([
    'title',
    'header' => null,
    'footer' => null
])

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>

    <style>
        @page {
            margin: 120px 40px 80px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 0;
            padding: 0;
        }
        header {
            position: fixed;
            top: -100px;
            left: 0;
            right: 0;
            height: 60px;
            border-bottom: 1px solid;
            font-size: 12px;
        }
        footer {
            position: fixed;
            bottom: -60px;
            left: 0;
            right: 0;
            height: 40px;
            border-top: 1px solid;
            padding-top: 10px;
            font-size: 9px;
        }

        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .mb-20 { margin-bottom: 20px; }
    </style>

    @stack('style')
</head>
<body>
    @if(!empty($header))
        <header {{ $header->attributes }}>
            {{ $header }}
        </header>
    @endif

    <main>
        {{ $slot }}
    </main>

    @if(!empty($footer))
        <footer {{ $footer->attributes }}>
            {{ $footer }}
        </footer>
    @endif
</body>
</html>
