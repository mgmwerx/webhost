#!/usr/bin/env node

import * as http from "http";
import app from "../lib/app";
import { AddressInfo } from "net";

const port = 80;
app.set("port", port);
const server = http.createServer(app);

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            process.stderr.write(`Port ${port} requires elevated privileges\n`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            process.stderr.write(`Port ${port} is already in use\n`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address() as AddressInfo;
    process.stdout.write(`Listening on port ${addr.port}`);
}
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
