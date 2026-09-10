{{--
/**
 * @var \App\Models\Resguardo $resguardo
 * @var string $title
 * @var string $subtitle
 */
--}}
@props([
    'resguardo',
    'title',
])

@push('style')
    <style>
        @page {
            margin-top: 90px;
            margin-bottom: 80px;
            margin-left: 60px;
            margin-right: 60px;
        }

        header {
            top: -70px;
        }

        footer {
            bottom: -50px;
        }
    </style>
@endpush

<x-pdf-layout::master :$title>
    <x-slot:header class="table w-full">
        <div class="table-cell align-middle text-left">
            <x-pdf::logo width="150" />
        </div>
        <div class="text-center align-middle uppercase font-bold">
            <div class="text-3xl">Resguardo</div>
            <div class="text-2xl">de Bienes Informáticos</div>
        </div>
    </x-slot:header>

    <div class="text-right">
        Fecha de Actualización: <span class="border-b uppercase">{{ $resguardo->fecha_actualizacion->translatedFormat('d \d\e F \d\e Y') }}</span>
    </div>

    <div class="table w-full border mt-2 mb-5" style="padding: 8px 8px;">
        <div class="table-cell" style="width: 15%;">
            <div>Resguardante:</div>
            <div>Área:</div>
        </div>
        <div class="table-cell">
            <div class="border-b uppercase">Juan Pérez</div>
            <div class="border-b uppercase">Dirección de Tecnologías de la Información</div>
        </div>
    </div>

    <div class="mb-3">
        Recibí de conformidad, el listado de bienes informáticos descrito en el presente resguardo, adquiriendo el compromiso de:
    </div>

    <div class="mb-3">
        <ol>
            <li>Mantener en buen estado físico los bienes informáticos y sus accesorios de acuerdo a las condiciones en que se reciben.</li>
            <li class="mt-3">Al concluir su resguardo, entregar los bienes informáticos al Director o al Auxiliar Administrativo de la Dirección de Tecnologías de la Información.</li>
        </ol>
    </div>

    <div class="mb-5">
        Con el presente documento, usted es responsable de la custodia del listado de bienes informáticos detallado en este resguardo, adquiriendo la responsabilidad de utilizarlo
        exclusivamente para el desempeño de las actividades asignadas, conforme a las Políticas Generales Relativas a los Servicios de Tecnologías de Información y Comunicaciones,
        lo establecido en el artículo <b>7</b> fracción <b>VI</b> de la Ley de Responsabilidades Administrativas del Estado de Tamaulipas, Criterio 1, inciso F) de la Política Institucional
        de Integridad y demás legislación aplicable.
    </div>

    <x-pdf::table class="mb-5 text-13px">
        <x-pdf::table.thead>
            <x-pdf::table.tr>
                <x-pdf::table.th class="text-center bg-neutral-500">Fecha de Asignación</x-pdf::table.th>
                <x-pdf::table.th class="text-center bg-neutral-500">No. Inventario</x-pdf::table.th>
                <x-pdf::table.th class="text-center bg-neutral-500">No. Serie</x-pdf::table.th>
                <x-pdf::table.th class="text-center bg-neutral-500">Descripción</x-pdf::table.th>
                <x-pdf::table.th class="text-center bg-neutral-500">Marca</x-pdf::table.th>
                <x-pdf::table.th class="text-center bg-neutral-500">Modelo</x-pdf::table.th>
            </x-pdf::table.tr>
        </x-pdf::table.thead>
        <x-pdf::table.tbody>
            @foreach($resguardo->articulosResguardados as $articuloResguardado)
                @php
                    $articulo = $articuloResguardado->articulo;
                    $producto = $articulo->producto;
                @endphp
                <x-pdf::table.tr class="text-center">
                    <x-pdf::table.td class="align-middle">{{ $articuloResguardado->fecha_asignacion->translatedFormat('d/m/Y') }}</x-pdf::table.td>
                    <x-pdf::table.td class="align-middle">{{ $articulo->numero_inventario }}</x-pdf::table.td>
                    <x-pdf::table.td class="align-middle">{{ $articulo->numero_serie ?? 'N/A' }}</x-pdf::table.td>
                    <x-pdf::table.td class="align-middle">{{ $producto->tipo->nombre }}</x-pdf::table.td>
                    <x-pdf::table.td class="align-middle">{{ $producto->marca->nombre }}</x-pdf::table.td>
                    <x-pdf::table.td class="align-middle">{{ $producto->modelo }}</x-pdf::table.td>
                </x-pdf::table.tr>
            @endforeach
        </x-pdf::table.tbody>
    </x-pdf::table>

    <div class="table w-full uppercase font-bold text-xs">
        <div class="table-cell" style="width:31%; padding-right: 10px;">
            <div class="text-center">
                <div class="border-b" style="height: 80px;">Elaboró</div>
                <div class="mt-2">Auxiliar Administrativo (DTI)</div>
            </div>
        </div>
        <div class="table-cell" style="width:31%; padding: 0 5px;">
            <div class="text-center">
                <div class="border-b" style="height: 80px;">Autorizó</div>
                <div class="mt-2">Director de Tecnologías de la Información</div>
            </div>
        </div>
        <div class="table-cell" style="width:31%; padding-left: 10px;">
            <div class="text-center">
                <div class="border-b" style="height: 80px;">Recibió</div>
                <div class="mt-2">Resguardante</div>
            </div>
        </div>
    </div>

    <x-slot:footer>
        <div class="text-11px mb-1">
            <b>NOTA: Una vez terminado el resguardo se procede a su cancelación, entregando, copia al interesado.</b>
        </div>
        <div class="text-right">
            <div>ASE-FOR-DTI-01-03</div>
            <div>Versión: 0</div>
        </div>
    </x-slot:footer>
</x-pdf-layout::master>
