# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .

# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/static ./
RUN npm install
RUN npm run build

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /main ./
COPY --from=node_builder /build ./views
COPY --from=builder /app/views ./views
RUN chmod +x ./main
EXPOSE 8080
CMD ./main
