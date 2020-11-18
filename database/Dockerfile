FROM mysql

WORKDIR /database

ENV MYSQL_ALLOW_EMPTY_PASSWORD true

ENV MYSQL_ROOT_PASSWORD ''

ENV MYSQL_DATABASE database_research

COPY ./scripts /docker-entrypoint-initdb.d/

CMD [ "--default-authentication-plugin=mysql_native_password" ]