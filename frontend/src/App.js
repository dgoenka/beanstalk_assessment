import './App.css';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import { API_URL } from './config/api';
import { downloadTextFile } from './util/download';

function App() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: {
      'text/*': ['.txt', '.csv'],
    },
  });

  useEffect(() => {
    if (acceptedFiles[0]) {
      (async () => {
        const formdata = new FormData();
        formdata.append('file', acceptedFiles[0], acceptedFiles[0].name);

        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };

        const result = await (await fetch(
          `${API_URL}transform/csv`,
          requestOptions,
        )).json();

        downloadTextFile(
          JSON.stringify(result.data, null, 2),
          `${acceptedFiles[0].name}.json`,
        );
      })();
    }
  }, [acceptedFiles]);

  return (
    <>
      <div className="App">
        <div {...getRootProps({ className: 'dropzone w100 h100 center' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop or click to select a a CSV file here</p>
        </div>
      </div>
    </>
  );
}

export default App;
