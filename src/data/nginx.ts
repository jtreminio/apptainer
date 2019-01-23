import {
    VhostConfig,
} from "@app/Types";

const html: VhostConfig = {
    engine: "html",
    type: "html",
    name: "Basic HTML",
    description: "For a simple HTML application",
    readOnly: true,
    data: `server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`,
};

const fpm: VhostConfig = {
    engine: "php",
    type: "fpm",
    name: "Basic PHP-FPM",
    description: "Simple, basic PHP application",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \\.php$ {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }
}`,
};

const node: VhostConfig = {
    engine: "node",
    type: "node",
    name: "Basic Node",
    description: "Simple, basic Node application that uses app.js",
    readOnly: true,
    data: `server {
    listen *:8080 default_server;
    
    server_name _;
    root /var/www/public;

    passenger_enabled on;
    passenger_app_type node;
    passenger_user app;

    passenger_startup_file app.js;
}`,
};

const drupal6: VhostConfig = {
    engine: "php",
    type: "drupal6",
    name: "Drupal 6",
    description: "Drupal 6",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.php;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Very rarely should these ever be accessed outside of your lan
    location ~* \\.(txt|log)$ {
        allow 192.168.0.0/16;
        deny all;
    }

    location ~ \\..*/.*\\.php$ {
        return 403;
    }

    location ~ ^/sites/.*/private/ {
        return 403;
    }

    # Block access to scripts in site files directory
    location ~ ^/sites/[^/]+/files/.*\\.php$ {
        deny all;
    }

    # Allow "Well-Known URIs" as per RFC 5785
    location ~* ^/.well-known/ {
        allow all;
    }

    # Block access to "hidden" files and directories whose names begin with a
    # period. This includes directories used by version control systems such
    # as Subversion or Git to store control files.
    location ~ (^|/)\\. {
        return 403;
    }

    location / {
        try_files $uri @rewrite; # For Drupal <= 6
        # try_files $uri /index.php?$query_string; # For Drupal >= 7
    }

    location @rewrite {
        rewrite ^/(.*)$ /index.php?q=$1;
    }

    # Don't allow direct access to PHP files in the vendor directory.
    location ~ /vendor/.*\\.php$ {
        deny all;
        return 404;
    }

    # In Drupal 8, we must also match new paths where the '.php' appears in
    # the middle, such as update.php/selection. The rule we use is strict,
    # and only allows this pattern with the update.php front controller.
    # This allows legacy path aliases in the form of
    # blog/index.php/legacy-path to continue to route to Drupal nodes. If
    # you do not have any paths like that, then you might prefer to use a
    # laxer rule, such as:
    #   location ~ \\.php(/|$) {
    # The laxer rule will continue to work if Drupal uses this new URL
    # pattern with front controllers other than update.php in a future
    # release.
    location ~ '\\.php$|^/update.php' {
        fastcgi_split_path_info ^(.+?\.php)(|/.*)$;
        # Security note: If you're running a version of PHP older than the
        # latest 5.3, you should have "cgi.fix_pathinfo = 0;" in php.ini.
        # See http://serverfault.com/q/627903/94922 for details.
        include fastcgi_params;
        # Block httpoxy attacks. See https://httpoxy.org/.
        fastcgi_param HTTP_PROXY "";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param QUERY_STRING $query_string;
        fastcgi_intercept_errors on;

        fastcgi_pass $my_fastcgi_pass;
    }

    # Fighting with Styles? This little gem is amazing.
    location ~ ^/sites/.*/files/imagecache/ { # For Drupal <= 6
    # location ~ ^/sites/.*/files/styles/ { # For Drupal >= 7
        try_files $uri @rewrite;
    }

    # Handle private files through Drupal. Private file's path can come
    # with a language prefix.
    location ~ ^(/[a-z\\-]+)?/system/files/ { # For Drupal >= 7
        try_files $uri /index.php?$query_string;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        try_files $uri @rewrite;
        expires max;
        log_not_found off;
    }
}`,
};

const drupal7: VhostConfig = {
    engine: "php",
    type: "drupal7",
    name: "Drupal 7",
    description: "Drupal 7",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.php;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Very rarely should these ever be accessed outside of your lan
    location ~* \\.(txt|log)$ {
        allow 192.168.0.0/16;
        deny all;
    }

    location ~ \\..*/.*\\.php$ {
        return 403;
    }

    location ~ ^/sites/.*/private/ {
        return 403;
    }

    # Block access to scripts in site files directory
    location ~ ^/sites/[^/]+/files/.*\\.php$ {
        deny all;
    }

    # Allow "Well-Known URIs" as per RFC 5785
    location ~* ^/.well-known/ {
        allow all;
    }

    # Block access to "hidden" files and directories whose names begin with a
    # period. This includes directories used by version control systems such
    # as Subversion or Git to store control files.
    location ~ (^|/)\\. {
        return 403;
    }

    location / {
        # try_files $uri @rewrite; # For Drupal <= 6
        try_files $uri /index.php?$query_string; # For Drupal >= 7
    }

    location @rewrite {
        rewrite ^/(.*)$ /index.php?q=$1;
    }

    # Don't allow direct access to PHP files in the vendor directory.
    location ~ /vendor/.*\\.php$ {
        deny all;
        return 404;
    }

    # In Drupal 8, we must also match new paths where the '.php' appears in
    # the middle, such as update.php/selection. The rule we use is strict,
    # and only allows this pattern with the update.php front controller.
    # This allows legacy path aliases in the form of
    # blog/index.php/legacy-path to continue to route to Drupal nodes. If
    # you do not have any paths like that, then you might prefer to use a
    # laxer rule, such as:
    #   location ~ \\.php(/|$) {
    # The laxer rule will continue to work if Drupal uses this new URL
    # pattern with front controllers other than update.php in a future
    # release.
    location ~ '\\.php$|^/update.php' {
        fastcgi_split_path_info ^(.+?\\.php)(|/.*)$;
        # Security note: If you're running a version of PHP older than the
        # latest 5.3, you should have "cgi.fix_pathinfo = 0;" in php.ini.
        # See http://serverfault.com/q/627903/94922 for details.
        include fastcgi_params;
        # Block httpoxy attacks. See https://httpoxy.org/.
        fastcgi_param HTTP_PROXY "";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param QUERY_STRING $query_string;
        fastcgi_intercept_errors on;

        fastcgi_pass $my_fastcgi_pass;
    }

    # Fighting with Styles? This little gem is amazing.
    # location ~ ^/sites/.*/files/imagecache/ { # For Drupal <= 6
    location ~ ^/sites/.*/files/styles/ { # For Drupal >= 7
        try_files $uri @rewrite;
    }

    # Handle private files through Drupal. Private file's path can come
    # with a language prefix.
    location ~ ^(/[a-z\\-]+)?/system/files/ { # For Drupal >= 7
        try_files $uri /index.php?$query_string;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        try_files $uri @rewrite;
        expires max;
        log_not_found off;
    }
}`,
};

const drupal8: VhostConfig = {
    engine: "php",
    type: "drupal8",
    name: "Drupal 8",
    description: "Drupal 8",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.php;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Very rarely should these ever be accessed outside of your lan
    location ~* \\.(txt|log)$ {
        allow 192.168.0.0/16;
        deny all;
    }

    location ~ \\..*/.*\\.php$ {
        return 403;
    }

    location ~ ^/sites/.*/private/ {
        return 403;
    }

    # Block access to scripts in site files directory
    location ~ ^/sites/[^/]+/files/.*\\.php$ {
        deny all;
    }

    # Allow "Well-Known URIs" as per RFC 5785
    location ~* ^/.well-known/ {
        allow all;
    }

    # Block access to "hidden" files and directories whose names begin with a
    # period. This includes directories used by version control systems such
    # as Subversion or Git to store control files.
    location ~ (^|/)\\. {
        return 403;
    }

    location / {
        # try_files $uri @rewrite; # For Drupal <= 6
        try_files $uri /index.php?$query_string; # For Drupal >= 7
    }

    location @rewrite {
        rewrite ^/(.*)$ /index.php?q=$1;
    }

    # Don't allow direct access to PHP files in the vendor directory.
    location ~ /vendor/.*\\.php$ {
        deny all;
        return 404;
    }

    # In Drupal 8, we must also match new paths where the '.php' appears in
    # the middle, such as update.php/selection. The rule we use is strict,
    # and only allows this pattern with the update.php front controller.
    # This allows legacy path aliases in the form of
    # blog/index.php/legacy-path to continue to route to Drupal nodes. If
    # you do not have any paths like that, then you might prefer to use a
    # laxer rule, such as:
    #   location ~ \\.php(/|$) {
    # The laxer rule will continue to work if Drupal uses this new URL
    # pattern with front controllers other than update.php in a future
    # release.
    location ~ '\\.php$|^/update.php' {
        fastcgi_split_path_info ^(.+?\\.php)(|/.*)$;
        # Security note: If you're running a version of PHP older than the
        # latest 5.3, you should have "cgi.fix_pathinfo = 0;" in php.ini.
        # See http://serverfault.com/q/627903/94922 for details.
        include fastcgi_params;
        # Block httpoxy attacks. See https://httpoxy.org/.
        fastcgi_param HTTP_PROXY "";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param QUERY_STRING $query_string;
        fastcgi_intercept_errors on;

        fastcgi_pass $my_fastcgi_pass;
    }

    # Fighting with Styles? This little gem is amazing.
    # location ~ ^/sites/.*/files/imagecache/ { # For Drupal <= 6
    location ~ ^/sites/.*/files/styles/ { # For Drupal >= 7
        try_files $uri @rewrite;
    }

    # Handle private files through Drupal. Private file's path can come
    # with a language prefix.
    location ~ ^(/[a-z\\-]+)?/system/files/ { # For Drupal >= 7
        try_files $uri /index.php?$query_string;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        try_files $uri @rewrite;
        expires max;
        log_not_found off;
    }
}`,
};

const laravel: VhostConfig = {
    engine: "php",
    type: "laravel",
    name: "Laravel",
    description: "Laravel",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/public;
    index index.html index.php;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \\.php$ {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\\.php)(/.+)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    location ~ /\\.(?!well-known).* {
        deny all;
    }
}`,
};

const symfony2Dev: VhostConfig = {
    engine: "php",
    type: "symfony2-dev",
    name: "Symfony 2 DEVELOPMENT",
    description: "Symfony 2, only for DEVELOPMENT servers",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/web;
    index app.php;

    location / {
        try_files $uri /app.php$is_args$args;
    }

    location ~ ^/(app_dev|config)\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    location ~ ^/app\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        internal;
    }

    location ~ \\.php$ {
        return 404;
    }
}`,
};

const symfony2Prod: VhostConfig = {
    engine: "php",
    type: "symfony2-prod",
    name: "Symfony 2 PRODUCTION",
    description: "Symfony 2, for PRODUCTION servers",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/web;
    index app.php;

    location / {
        try_files $uri /app.php$is_args$args;
    }

    location ~ ^/app\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        internal;
    }

    location ~ \\.php$ {
        return 404;
    }
}`,
};

const symfony3Dev: VhostConfig = {
    engine: "php",
    type: "symfony3-dev",
    name: "Symfony 3 DEVELOPMENT",
    description: "Symfony 3, only for DEVELOPMENT servers",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/web;
    index app.php;

    location / {
        try_files $uri /app.php$is_args$args;
    }

    location ~ ^/(app_dev|config)\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    location ~ ^/app\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        internal;
    }

    location ~ \\.php$ {
        return 404;
    }
}`,
};

const symfony3Prod: VhostConfig = {
    engine: "php",
    type: "symfony3-prod",
    name: "Symfony 3 PRODUCTION",
    description: "Symfony 3, for PRODUCTION servers",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/web;
    index app.php;

    location / {
        try_files $uri /app.php$is_args$args;
    }

    location ~ ^/app\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        internal;
    }

    location ~ \\.php$ {
        return 404;
    }
}`,
};

const symfony4: VhostConfig = {
    engine: "php",
    type: "symfony4",
    name: "Symfony 4",
    description: "Symfony 4",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www/public;
    index index.html index.php;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ ^/index\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        internal;
    }

    location ~ \\.php$ {
        return 404;
    }
}`,
};

const wordpress: VhostConfig = {
    engine: "php",
    type: "wordpress",
    name: "Wordpress",
    description: "Wordpress",
    readOnly: true,
    data: `map $cookie_XDEBUG_SESSION $my_fastcgi_pass {
    default 127.0.0.1:9000;
    xdebug  127.0.0.1:\${phpfpm_xdebug_port};
}

server {
    listen *:8080 default_server;

    server_name _;
    root /var/www;
    index index.php;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ ^/index\\.php(/|$) {
        set $path_info $fastcgi_path_info;

        fastcgi_pass $my_fastcgi_pass;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\\.php)(/.*)$;

        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires max;
        log_not_found off;
    }

    location ~ /\\. {
        deny all;
    }

    location ~* /(?:uploads|files)/.*\\.php$ {
        deny all;
    }
}`,
};

const custom: VhostConfig = {
    engine: "none",
    type: "custom",
    name: "Custom",
    description: "Create your own customized virtual host configuration",
    readOnly: false,
    data: `# Enter your custom vhost config here`,
};

const vhosts: VhostConfig[] = [
    html,
    fpm,
    node,
    drupal6,
    drupal7,
    drupal8,
    laravel,
    symfony2Dev,
    symfony2Prod,
    symfony3Dev,
    symfony3Prod,
    symfony4,
    wordpress,
    custom,
];

export default vhosts;
