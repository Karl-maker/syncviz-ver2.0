import { Backdrop, Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { BsFillMicFill } from "react-icons/bs";
import DialogButton from "../../template/buttons/dialog";

export default function Audio({ virtualSpace, open, setOpen }) {
  const [recording, setRecording] = useState(false);
  const [allowsRecording, setAllowsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audio, setAudio] = useState(null);
  const [load, setLoad] = useState(false);
  const constraints = { audio: true };

  // Refs
  const recordRef = useRef(null);

  const stopLoad = () => {
    setLoad(false);
  };

  const startLoad = () => {
    setLoad(true);
  };

  useEffect(async () => {
    // Check if browser / device has mic..
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setAllowsRecording(false);
      return;
    }
    setAllowsRecording(true);

    let chunks = [];
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    recordRef.current = new MediaRecorder(stream, {
      mimeType: "audio/*",
    });

    recordRef.current.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
      saveRecording(chunks);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    if (recordRef.current) {
      recordRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (recordRef.current) {
      recordRef.current.stop();
      setRecording(false);
    }
  };

  const saveRecording = (chunks) => {
    // convert saved chunks to blob
    const blob = new Blob(chunks, { type: "audio/ogg" });
    setAudio(blob);
    // generate video url from blob
    setAudioURL(window.URL.createObjectURL(blob));
    // append videoURL to list of saved videos for rendering
  };

  const AudioSelection = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {allowsRecording && (
          <IconButton
            size="large"
            sx={{
              marginBottom: 3,
            }}
            onClick={() => {
              if (recording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
          >
            {recording ? <BsFillMicFill color="red" /> : <BsFillMicFill />}
          </IconButton>
        )}
        {/* <Button
          endIcon={<FaRegFileAudio />}
          variant="outlined"
          onClick={() => {}}
        >
          Upload File
        </Button> */}
      </div>
    );
  };

  return (
    <DialogButton
      title=""
      content={
        <>
          <AudioSelection />
          <audio controls src={audioURL} />
        </>
      }
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            disabled={!audio}
            onClick={() => {
              const file = new File([audio], "audio_recording.ogg", {
                type: "audio/ogg",
              });
              const formData = new FormData();
              formData.append("file-audio", file);
              virtualSpace
                .transferAudio(formData)
                .then((model) => {})
                .catch((err) => {});
            }}
          >
            Send
          </Button>
          <Button variant="filled" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </>
      }
    />
  );
}
