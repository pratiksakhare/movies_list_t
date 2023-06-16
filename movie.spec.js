const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");

describe("GET /movies", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/movies");
        expect(res.statusCode).toBe(200);
        expect(res._body.length).toBeGreaterThan(0);
    });
});

describe("POST /movie/create", () => {
    it("should not create new movie if movie already present", async () => {
        let obj = {
            name: 'Gump',
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
            actors: 'FD ahsjagsh',
            genre: 'Animation'
        }
        const res = await request(app).post("/movie/create").send(obj);
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Movie already exists.");
    });
});
describe("PUT /movie/update", () => {
    it("should update movie", async () => {

        let obj = {
            name: 'Gump3',
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
            actors: 'FD ahsjagsh',
            genre: 'Animation',
            release : '2022/03/03'
        }
        const res = await request(app).put("/movie/update/648a12f40cf7db761250e49d").send(obj);
        console.log(res._body);
        expect(res.statusCode).toBe(200);
        expect(res._body.name).toBe("Gump3");
    });
});

describe("Delete /movie/delete", () => {
    it("should Delete movie", async () => {
        const res = await request(app).delete("/movie/delete/6488dd70b9dc29f375b6b758");
        expect(res.statusCode).toBe(200);
    });
});