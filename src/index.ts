import express from "express";
import {createClient} from "redis"

const app = express();
app.use(express.json());

const client = createClient();

app.post("/submit", async(req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({code, language, problemId}));
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.log("Redis error", error);
        res.status(500).send("Failed to store the submission");
    }
});
app.get("/", (req,res) => {
    res.json({
        message: "devashish"
    })
})
const startServer = async()=> {
    try {
        await client.connect();
        console.log("Connected to redis");
        app.listen(3000, () => {
            console.log("Server is running on PORT 3000")
        })
    } catch (error) {
        console.error("Failed to connect to redis", error);
    }
}

startServer();
