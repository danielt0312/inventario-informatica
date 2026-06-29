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
    'title' => DocumentoTipoEnum::DICTAMEN->label(),
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
        @page {
            margin: 80px 60px;
        }

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

        .subtitle span {
            display: block;
            font-weight: bold;
        }

        body {
            text-align: justify;
        }
    </style>
@endpush

<x-pdf-layout::master title="{{ $fileTitle }}">
    <x-slot:header class="container">
        <div class="header-logo">
            <x-pdf::logo />
        </div>
        <div class="header-text">
            <span>{{ $location }} a {{ $date }}</span>
        </div>
    </x-slot:header>

    <div class="mt-2 text-right">
        <b>DICTAMEN NO. {{ $dictamen->id }}.</b>
    </div>

    <div class="text-center font-bold text-2xl uppercase my-10">
        {{ $title }}
    </div>

    <div class="subtitle mb-5">
        <span>C.P. FERNANDO MARTÍN CASTILLO DE ANDA</span>
        <span>DIRECTOR GENERAL DE ADMINISTRACIÓN Y FINANZAS</span>
        <span class="text-around">PRESENTE</span>
    </div>

    <div class="mb-5">
        Por medio del presente y en referencia al oficio <b>{{ $dictamen->oficio->folio }}</b>; es necesaria la adquisición de lo siguiente:
    </div>

    <x-pdf::table class="mb-5">
        <x-pdf::table.thead>
            <x-pdf::table.tr>
                <x-pdf::table.th class="text-center">Cantidad</x-pdf::table.th>
                <x-pdf::table.th>Descripción</x-pdf::table.th>
                <x-pdf::table.th class="text-center">Resguardante</x-pdf::table.th>
                <x-pdf::table.th class="text-center">No. de Inventario</x-pdf::table.th>
            </x-pdf::table.tr>
        </x-pdf::table.thead>
        <x-pdf::table.tbody>
            @foreach($dictamen->dictamenProductos as $producto)
                <x-pdf::table.tr>
                    <x-pdf::table.td class="text-center">{{ $producto->cantidad }}</x-pdf::table.td>
                    <x-pdf::table.td>{{ $producto->descripcion }}</x-pdf::table.td>
                    <x-pdf::table.td class="text-center">John Doe</x-pdf::table.td>
                    <x-pdf::table.td class="text-center">{{ $producto->numero_inventario ?? 'N/A' }}</x-pdf::table.td>
                </x-pdf::table.tr>
            @endforeach
        </x-pdf::table.tbody>
    </x-pdf::table>

    <div class="mb-5">
        Para los usuarios del área de Dirección de Tecnologías de la Información, los cuales lo requieren para realizar sus actividades; esto para dar eficiencia en los trabajos y operaciones realizadas.
    </div>

    <div class="mb-5">
        <b>NOTA:</b> "El proveedor deberá ofertar exclusivamente el equipo en el modelo y configuración especificados en este documento. No se aceptarán modelos alternos, equivalentes ni similares. En caso de presentarse alguna situación de desabasto o problema de disponibilidad del equipo solicitado, el proveedor estará obligado a informarlo y consultarlo previamente con la Dirección de Tecnologías de la Información (DTI), a fin de obtener autorización expresa ante de proponer cualquier alternativa."
    </div>

    <div class="mb-5">
        Sin más por el momento le mando un cordial saludo.
    </div>

    <div class="font-bold text-center">
        <div class="text-around">ATENTAMENTE</div>
        <div class="mt-20">
            <div>MTRO. JESÚS ALBERTO MATA ACOSTA</div>
            <div>DIRECTOR DE TECNOLOGÍAS DE LA INFORMACIÓN</div>
            <div>DE LA INFORMACIÓN</div>
        </div>
    </div>

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
