FROM gitea.internal.gammascience.co.uk/gammascience/static-website

COPY dist/proposal-explorer /usr/share/nginx/html
EXPOSE 80
