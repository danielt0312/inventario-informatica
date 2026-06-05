@pushOnce('style')
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
    </style>
@endPushOnce

<table {{ $attributes }}>
    {{ $slot }}
</table>
