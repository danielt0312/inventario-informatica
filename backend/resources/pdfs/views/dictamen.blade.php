@use('App\Enums\DocumentoTipoEnum')

{{--
/**
 * @var \App\Models\Dictamen $dictamen
 * @var string|null $title
 * @var string|null $location
 * @var string|null $date
 * @var string|null $fileTitle
 */
--}}
@props([
    'dictamen',
    'title' => DocumentoTipoEnum::DICTAMEN->getLabelValue(),
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
            margin-top: 88px;
            margin-bottom: 80px;
            margin-left: 60px;
            margin-right: 60px;
        }

        header {
            top: -68px;
            height: 60px;
        }

        footer {
            bottom: -60px;
            height: 40px;
        }
    </style>
@endpush

<x-pdf-layout::master title="{{ $fileTitle }}">
    <x-slot:header class="table w-full border-b text-xs">
        <div class="table-cell align-middle">
            <x-pdf::logo />
        </div>
        <div class="table-cell align-bottom text-right white-space-nowrap">
            <span class="block" style="line-height: 1.4">{{ $location }} a {{ $date }}</span>
        </div>
    </x-slot:header>

    <div class="text-right">
        <b>DICTAMEN NO. {{ $dictamen->id.'/'. $dictamen->versionActual->numero_version }}.</b>
    </div>

    <div class="text-center font-bold text-2xl uppercase my-10">
        {{ $title }}
    </div>

    <div class="mb-5 font-bold">
        <div>C.P. FERNANDO MARTÍN CASTILLO DE ANDA</div>
        <div>DIRECTOR GENERAL DE ADMINISTRACIÓN Y FINANZAS</div>
        <div class="tracking-widest">PRESENTE</div>
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
            @foreach($dictamen->versionActual->adquisiciones as $adquisicion)
                <x-pdf::table.tr>
                    <x-pdf::table.td class="text-center">{{ $adquisicion->cantidad }}</x-pdf::table.td>
                    <x-pdf::table.td>{{ $adquisicion->descripcion }}</x-pdf::table.td>
                    <x-pdf::table.td class="text-center">John Doe</x-pdf::table.td>
                    <x-pdf::table.td class="text-center">{{ $adquisicion->articulo?->numero_inventario ?? 'N/A' }}</x-pdf::table.td>
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
        <div class="tracking-widest">ATENTAMENTE</div>
        <div class="mt-20">
            <div>MTRO. JESÚS ALBERTO MATA ACOSTA</div>
            <div>DIRECTOR DE TECNOLOGÍAS DE LA INFORMACIÓN</div>
            <div>DE LA INFORMACIÓN</div>
        </div>
    </div>

    <x-slot:footer class="table w-full border-t text-9px pt-2p5">
        <div class="table-cell align-top">
            <div>Porfirio Díaz Norte No. 1050. Colonia Hogares Modernos. C.P. 87059</div>
            <div>Cd. Victoria; Tamaulipas</div>
        </div>
        <div class="table-cell align-top white-space-nowrap text-right">
            <div>Tel. 834 153-68-00</div>
            <div>wwww.asetamaulipas.gob.mx</div>
        </div>
    </x-slot:footer>
</x-pdf-layout::master>
