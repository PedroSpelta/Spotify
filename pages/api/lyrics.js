import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";
import { getTitleLink } from "../../lib/lyrics";
const cheerio = require("cheerio");

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const {searchTerm} = req.body;
  const searchTermLink = getTitleLink(searchTerm);

  return await axios({
    method: "get",
    withCredentials: false,
    url: searchTermLink,
  })
    .then((axiosRes) => {
      const html = axiosRes.data;
      const $ = cheerio.load(html);
      const allHwc = $(".hwc");
      const lyric = $(allHwc[0]).text();
      return res.json({ lyric });
    })
    .catch((er) => {
      console.log(er);
    });
}
