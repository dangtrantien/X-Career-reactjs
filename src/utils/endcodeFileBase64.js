import swal from 'sweetalert';

export default async function EndcodeFileBase64(file) {
  try {
    return await new Promise((resolve) => {
      // Make new FileReader
      let reader = new FileReader();
      const data = {};

      if (file.size > 10e6) {
        swal({
          text: 'That file exceeds the 10MB limit. Please choose another smaller file.',
          buttons: false,
          timer: 5000,
          icon: 'warning',
        });
      } else {
        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          data.name = file.name;
          data.data = reader.result;
          data.type = file.type;

          resolve(data);
        };
      }
    });
  } catch (err) {
    console.log('err', err);
    swal({
      text: 'Sorry, something went wrong. Please contact to admin for support.',
      buttons: false,
      timer: 5000,
      icon: 'error',
    });
  }
}
