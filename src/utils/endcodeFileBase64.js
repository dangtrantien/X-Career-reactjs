export default async function EndcodeFileBase64(file) {
  try {
    return await new Promise((resolve) => {
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let baseURL = reader.result;
        resolve(baseURL);
      };
    });
  } catch (err) {
    console.log('err', err);
  }
}
