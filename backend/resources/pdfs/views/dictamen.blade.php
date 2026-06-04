@use('App\Enums\DocumentoTipoEnum')
@use('App\Models\Dictamen')

{{--
/**
 * @var Dictamen $dictamen
 * @var string|null $title
 * @var string|null $location
 * @var string|null $date
 * @var string|null $fileTitle
 */
--}}
@props([
    'dictamen',
    'title' => DocumentoTipoEnum::DICTAMEN->nombre(),
    'location' => 'Ciudad Victoria, Tamaulipas',
    'date' => now()
        ->isoFormat('D [de] MMMM [de] YYYY'),
    'fileTitle' => null
])

@php
    $fileTitle ??= $title;
@endphp

@push('style')
    <style>
        .container {
            display: table;
            width: 100%;
        }

        .header-logo {
            display: table-cell;
            vertical-align: middle;
            text-align: left;
        }

        .header-text {
            display: table-cell;
            vertical-align: bottom;
            text-align: right;
            white-space: nowrap;
        }

        .footer-left {
            display: table-cell;
            vertical-align: top;
        }

        .footer-right {
            display: table-cell;
            vertical-align: top;
            width: 1%;
            white-space: nowrap;
            text-align: right;
        }

        .container span {
            display: block;
            line-height: 1.4;
        }

        .title {
            text-align: center;
            text-transform: uppercase;
            font-size: 24px;
            font-weight: bold;
        }

        .subtitle {
            margin-top: 30px;
        }

        .subtitle span {
            display: block;
            font-weight: bold;
        }

        body {
            text-align: justify;
        }
    </style>
@endpush

<x-pdf-layout::master
    title="{{ $fileTitle }}"
>
    <x-slot:header class="container">
        <div class="header-logo">
            <x-pdf::logo />
        </div>
        <div class="header-text">
            <span>{{ $location }} a {{ $date }}</span>
        </div>
    </x-slot:header>

    <div class="title">
        {{ $title }}
    </div>

    <div class="subtitle mb-20">
        <span>C.P. FERNANDO MARTÍN CASTILLO DE ANDA</span>
        <span>DIRECTOR GENERAL DE ADMINISTRACIÓN Y FINANZAS</span>
        <span>P R E S E N T E</span>
    </div>

    <div class="mb-20">
        Por medio del presente y en referencia al oficio <span style="font-weight: bold;">{{ $dictamen->oficio->folio }}</span>; es necesaria la adquisición de lo siguiente:
    </div>

    <x-table>
        <x-table.thead>
            <x-table.tr>
                <x-table.th>Descripción</x-table.th>
                <x-table.th class="text-center">Cantidad</x-table.th>
                <x-table.th class="text-right">Precio Unitario</x-table.th>
                <x-table.th class="text-right">Total</x-table.th>
            </x-table.tr>
        </x-table.thead>
        <x-table.tbody>
            <x-table.tr>
                <x-table.td>Servicio de Desarrollo Web</x-table.td>
                <x-table.td class="text-center">1</x-table.td>
                <x-table.td class="text-right">$1,200.00</x-table.td>
                <x-table.td class="text-right">$1,200.00</x-table.td>
            </x-table.tr>
            <x-table.tr>
                <x-table.td>Soporte Técnico Mensual</x-table.td>
                <x-table.td class="text-center">2</x-table.td>
                <x-table.td class="text-right">$150.00</x-table.td>
                <x-table.td class="text-right">$300.00</x-table.td>
            </x-table.tr>
        </x-table.tbody>
    </x-table>

    <table>
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Servicio de Desarrollo Web</td>
                <td>1</td>
                <td>$1,200.00</td>
                <td>$1,200.00</td>
            </tr>
            <tr>
                <td>Soporte Técnico Mensual</td>
                <td>2</td>
                <td>$150.00</td>
                <td>$300.00</td>
            </tr>
        </tbody>
    </table>

    <x-slot:footer class="container">
        <div class="footer-left">
            <span>Porfirio Díaz Norte No. 1050. Colonia Hogares Modernos. C.P. 87059</span>
            <span>Cd. Victoria; Tamaulipas</span>
        </div>
        <div class="footer-right">
            <span>Tel. 834 153-68-00</span>
            <span>wwww.asetamaulipas.gob.mx</span>
        </div>
    </x-slot:footer>
</x-pdf-layout::master>
