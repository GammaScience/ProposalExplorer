FROM docker.io/library/nginx


## Move the logfiles so we just get our special one.
RUN rm /etc/nginx/conf.d/default.conf && \
   rm -rf  /var/log/nginx/access.log && \
   ln -s /dev/null /var/log/nginx/access.log && \
   ln -s /dev/stdout /var/log/nginx/alt_access.log

RUN mkdir /var/run/nginx/

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY build/code /usr/share/nginx/html
EXPOSE 80
