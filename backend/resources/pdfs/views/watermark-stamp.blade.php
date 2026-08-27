<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        #watermark {
            position: fixed;
            top: 37%;
            width: 100%;
            text-align: center;
            opacity: .3;
            transform: rotate(-45deg);
            transform-origin: 50% 50%;
            z-index: -1000;
            font-size: 130px;
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="watermark">{{ $text }}</div>
</body>
</html>
