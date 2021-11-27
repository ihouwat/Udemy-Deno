FROM  denoland/deno:alpine

WORKDIR /app

COPY . .

# Prefer not to run as root.
USER deno

CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]

EXPOSE 8000