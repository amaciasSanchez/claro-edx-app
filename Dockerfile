FROM nginx:1.17.1-alpine
COPY /dist/clarodx /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
