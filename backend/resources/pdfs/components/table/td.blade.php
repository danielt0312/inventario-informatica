@pushOnce('style')
    <style>
        td {
            padding: 2px 8px;
            vertical-align: top;
            border: 0.5px solid;
        }
    </style>
@endPushOnce

<td {{ $attributes }}>
    {{ $slot }}
</td>
