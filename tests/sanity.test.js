const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

jest.setTimeout(20000);

describe('sanity', () => {
  let serverProc;
  beforeAll((done) => {
    // Start the server in the project root
    serverProc = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], { cwd: path.join(__dirname, '..') });

    const onData = (data) => {
      const s = data.toString();
      if (s.includes('Server running')) {
        serverProc.stdout.off('data', onData);
        done();
      }
    };

    serverProc.stdout.on('data', onData);
    serverProc.on('error', (err) => done(err));
  });

  afterAll(() => {
    if (serverProc) {
      serverProc.kill();
    }
  });

  test('GET / returns 200 and greeting', (done) => {
    http.get('http://localhost:3000/', (res) => {
      expect(res.statusCode).toBe(200);
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        expect(body).toMatch(/Hello from my-node-app/);
        done();
      });
    }).on('error', done);
  });
});
