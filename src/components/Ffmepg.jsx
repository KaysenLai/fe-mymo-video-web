import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import axios from 'axios';

const Ffmepg = () => {
  const v = 'https://chaokailai-jr-lesson.s3-ap-southeast-2.amazonaws.com/pexels-nadezhda-moryak-6743124.mp4';
  const s = 'https://chaokailai-jr-lesson.s3-ap-southeast-2.amazonaws.com/bensound-dubstep.mp3';
  const [radio, setRadio] = useState(0);

  const [file, setFile] = useState();
  const handleFileChange = (event) => {
    const fileData = event.target.files[0];
    console.log();
    const buffer = fileData.arrayBuffer();
    const arr = new Uint8Array(buffer, 0, buffer.byteLength);
    ff(v, s, arr);
  };
  const ff = async function mergeVideo(video, audio, fileData) {
    const ffmpeg = createFFmpeg({ log: true });
    // const ffmpeg = createFFmpeg();
    // let res = await axios.get(s, { responseType: 'arraybuffer' });
    // const sArray = new Uint8Array(res.data);
    await ffmpeg.load();
    // ffmpeg.FS('writeFile', 'video.mp4', fileData);
    // ffmpeg.FS('writeFile', 'audio.mp4', fileData);
    // ffmpeg -ss 00:09:50 -i input.mkv -ss 00:10:00 -to 00:20:00 -copyts -codec copy -avoid_negative_ts 1 -y output.mkv
    // await ffmpeg.run('-i', 'video.mp4', '-ss', '00:00:03.0', '-to', '00:00:08.0', '-c:v', 'copy', '', 'video2.mp4');
    // const ff1 = '-ss 00:00:03 -to 00:00:05 -accurate_seek -i video.mp4 -codec copy -avoid_negative_ts 1 video2.mp4';
    // await ffmpeg.run(...ff1.split(' '));
    // let data = await ffmpeg.FS('readFile', 'video2.mp4');
    // const uni = new Uint8Array(data.buffer);
    // const url = window.URL.createObjectURL(new Blob([uni]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'xx.mp4');
    // document.body.appendChild(link);
    // link.click();
    return;
  };
  return (
    <>
      <button
        onClick={() => {
          // ff(v, s);
        }}
      >
        dddd
      </button>
      <input type="file" onChange={handleFileChange} />
    </>
  );
};

export default Ffmepg;
