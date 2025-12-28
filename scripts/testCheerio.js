import cheerio from "cheerio";//import cheerio to parse Html
import axios from "axios"; //import axios to make HTTP requiests 

export async function testCheerio(){
    const {data:html} = await axios.get("https://example.com"); //fetch HTML http page 
    const $ = cheerio.load(html); // Load HTML into Cheerio
}