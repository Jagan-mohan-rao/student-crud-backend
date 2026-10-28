const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("./index");

test("Application loads successfully", () => {
    assert.ok(app);
});

test("GET /students returns an empty array", async () => {
    const server = app.listen(0);

    try {
        const port = server.address().port;
        const response = await fetch(
            `http://127.0.0.1:${port}/students`
        );

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), []);
    } finally {
        await new Promise((resolve, reject) => {
            server.close(error => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
});