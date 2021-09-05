import { bold, brightGreen, green } from "https://deno.land/std/fmt/colors.ts";
import Tokenizer from "./Tokenizer/index.ts";

// 0 1 2 3 4 5 6 7 8 9 10
// < d i v > < / d i v >
const html = "<div></div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// < d i v > < d i v > <  /  d  i  v  >
const html2 = "<div><div></div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21
// < d i v > < d i v > <  /  d  i  v  >  <  /  d  i  v  >
const html3 = "<div><div></div></div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
// < d i v > < p > < / p  >  <  /  d  i  v  >
const html4 = "<div><p></p></div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21
// < d i v > h e l l o _  w  o  r  l  d  <  /  d  i  v  >
const html5 = "<div>hello world</div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
// < d i v > h e l l o _  w  o  r  l  d  <  p  >  p  a  r  a  <  /  d  i  v  >
const html6 = "<div>hello world<p>para</div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32
// < d i v > h e l l o _  w  o  r  l  d  <  p  >  p  a  r  a  <  /  p  >  <  /  d  i  v  >
const html7 = "<div>hello world<p>para</p></div>";
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// < d i v > < a   / > <  /  d  i  v  >
const htmlSelfClosing = "<div><a /></div>";

[html, html2, html3, html4, html5, html6, html7, htmlSelfClosing].forEach(
  (html) => {
    const tokenizer = new Tokenizer();
    const tokens = tokenizer.tokenize(html);
    console.log(green("HTML to tokenize:"), bold(brightGreen(html)));
    console.log(tokens);
  },
);

// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
// < a _ h r e f = " h t  t  p  :  /  /  "  _  /  >
// const htmlLink = '<a href="http://" />';
// const tokenizer = new Tokenizer();
// const tokens = tokenizer.tokenize(htmlLink);
// console.log(green("HTML to tokenize:"), bold(brightGreen(htmlLink)));
// console.log(tokens);

// const htmlAttri = '<div class="grid"> </div>';
// const tokenizer = new Tokenizer();
// const tokens = tokenizer.tokenize(htmlAttri);
// console.log(green("HTML to tokenize:"), bold(brightGreen(htmlAttri)));
// console.log(tokens);
