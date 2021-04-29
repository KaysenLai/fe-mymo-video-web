import Compressor from 'compressorjs';

const compressImage = (file: File, maxHeight: number, maxWidth: number, callback: Function) => {
  new Compressor(file, {
    maxHeight: 400,
    maxWidth: 400,
    success: async function (result) {
      callback(result);
    },
    error(err) {
      console.log(err.message);
    },
  });
};

export default compressImage;
