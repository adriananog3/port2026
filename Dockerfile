# Build: binário estático, sem CGO
FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY . .
RUN go test ./... && CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /server .

# Runtime: imagem distroless (sem shell, usuário não-root)
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /server /server
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/server"]
