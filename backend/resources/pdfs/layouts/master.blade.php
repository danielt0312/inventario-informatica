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
            text-align: justify;
        }
        header {
            position: fixed;
            top: -60px;
            left: 0;
            right: 0;
            height: 60px;
        }
        footer {
            position: fixed;
            bottom: -60px;
            left: 0;
            right: 0;
            height: 40px;
            padding-top: 10px;
        }

        .align-top { vertical-align: top; }
        .align-middle { vertical-align: middle; }
        .align-bottom { vertical-align: bottom; }

        .white-space-nowrap { white-space: nowrap; }

        .w-full { width: 100%; }

        .table { display: table; }
        .block { display: block; }
        .table-cell { display: table-cell; }

        .tracking-widest { letter-spacing: 3px; }

        .uppercase { text-transform: uppercase; }

        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }

        .font-bold { font-weight: bold; }

        .text-9px { font-size: 9px; }
        .text-xs { font-size: 12px; }
        .text-13px { font-size: 13px; }
        .text-sm { font-size: 14px; }
        .text-2xl { font-size: 24px; }
        .text-3xl { font-size: 30px; }

        .my-10 { margin: 40px 0 }
        .mt-1 { margin-top: 4px; }
        .mt-2 { margin-top: 8px; }
        .mt-3 { margin-top: 12px; }
        .mt-4 { margin-top: 16px; }
        .mt-8 { margin-top: 32px; }
        .mt-9 { margin-top: 36px; }
        .mt-10 { margin-top: 40px; }
        .mt-12 { margin-top: 48px; }
        .mt-14 { margin-top: 56px; }
        .mt-20 { margin-top: 80px; }
        .mb-5 { margin-bottom: 20px; }
        .mb-8 { margin-bottom: 32px; }

        .border-t { border-top: 0.5px solid }
        .border-b { border-bottom: 0.5px solid }
        .border { border: 0.5px solid }

        .bg-neutral-500 { background-color: #737373; }
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
