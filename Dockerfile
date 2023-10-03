FROM nginx AS nginx2
COPY --from=nginx1 /usr/share/nginx/html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]