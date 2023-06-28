// const functions = require("firebase-functions");
// const vision = require("@google-cloud/vision");
// const axios = require("axios");
//
// const client = new vision.ImageAnnotatorClient();
//
// exports.detectLogo = functions.https.onCall(async (data, context) => {
//   // Download the image from the URL
//   const response = await axios.get(data.image, {responseType: "arraybuffer"});
//   const buffer = Buffer.from(response.data, "binary");
//
//   const [result] = await client.logoDetection(buffer);
//   const logos = result.logoAnnotations;
//   // eslint-disable-next-line max-len
//   return logos.length > 0 ? {companyName: logos[0].description} : {companyName: "Logo not recognized"};
// });
