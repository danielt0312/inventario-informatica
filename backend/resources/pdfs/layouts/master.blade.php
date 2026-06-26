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
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
        header {
            position: fixed;
            top: -60px;
            left: 0;
            right: 0;
            height: 60px;
            border-bottom: 0.5px solid;
            font-size: 12px;
        }
        footer {
            position: fixed;
            bottom: -60px;
            left: 0;
            right: 0;
            height: 40px;
            border-top: 0.5px solid;
            padding-top: 10px;
            font-size: 9px;
        }

        .uppercase { text-transform: uppercase; }
        .font-bold { font-weight: bold; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-around { letter-spacing: 3px; }
        .text-xs { font-size: 12px; }
        .text-2xl { font-size: 24px; }
        .text-3xl { font-size: 30px; }
        .my-10 { margin: 40px 0 }
        .mt-1 { margin-top: 4px; }
        .mt-2 { margin-top: 8px; }
        .mt-3 { margin-top: 12px; }
        .mt-4 { margin-top: 16px; }
        .mt-20 { margin-top: 80px; }
        .mb-5 { margin-bottom: 20px; }
        .mb-8 { margin-bottom: 32px; }
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
