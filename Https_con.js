// server.js
const WebSocket = require('ws');
const { spawn } = require('child_process');
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running at ws://localhost:8080");

wss.on('connection', (ws) => {
    console.log("Client connected");

    // Spawn Python process
    const py = spawn('python', ['worker.py']);
    py.stdout.on('data', (data) => {
        ws.send(`From Python: ${data.toString().trim()}`);
    });

    // Spawn Go process
    // const go = spawn('go', ['run', 'worker.go']);
    const go = spawn('./script.exe');
    go.stdout.on('data', (data) => {
        ws.send(`From Go: ${data.toString().trim()}`);
    });

    ws.on('message', (msg) => {
        console.log(`Client says: ${msg}`);
        py.stdin.write(msg + '\n');
        go.stdin.write(msg + '\n');
    });

    ws.on('close', () => {
        console.log("Client disconnected");
        py.kill();
        go.kill();
    });
});
