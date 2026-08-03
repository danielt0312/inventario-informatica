FROM php:8.4-fpm-alpine

COPY --from=composer:2.9.5 /usr/bin/composer /usr/bin/composer

RUN apk add --no-cache \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev

RUN apk add mariadb-client

RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo pdo_mysql gd

ARG UID=1000
ARG GID=1000

RUN addgroup -g ${GID} appgroup && \
    adduser -D -u ${UID} -G appgroup appuser

WORKDIR /var/www/html

COPY --chown=appuser:appgroup . .

USER appuser

RUN composer install

EXPOSE 8000

CMD php -d upload_max_filesize=${PHP_UPLOAD_MAX_FILESIZE} \
        -d post_max_size=${PHP_POST_MAX_SIZE} \
        -d memory_limit=${PHP_MEMORY_LIMIT} \
        -d max_file_uploads=${PHP_MAX_FILE_UPLOADS} \
        artisan serve --host=0.0.0.0 --port=8000
