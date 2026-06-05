@pushOnce('style')
    <style>
        th {
            font-weight: bold;
            padding: 2px 8px;
            text-align: left;
            border: 0.5px solid;
        }
    </style>
@endPushOnce

<th {{ $attributes }}>
    {{ $slot }}
</th>
