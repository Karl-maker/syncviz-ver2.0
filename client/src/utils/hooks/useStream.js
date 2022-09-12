import { useEffect } from "react";

export default function useStream(callback, stream) {
  useEffect(() => {
    if (stream) {
      const recorder = new MediaRecorder(stream);

      callback(recorder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);
}
