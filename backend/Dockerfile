FROM golang:1.23 AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN	make build

FROM alpine:latest AS alpine

WORKDIR /root/

COPY --from=builder /app/server .

CMD ["./server"]
