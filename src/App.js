import "./App.css";
import { createWorker } from "tesseract.js";
import { useEffect, useState } from "react";

function App() {
  const [selectImage, setImage] = useState(null);
  const [textConverter, setTextConverter] = useState("");

  const convertText = async () => {
    if (selectImage !== null) {
      const worker = await createWorker();

      await worker.loadLanguage("spa");
      await worker.initialize("spa");

      const { data } = await worker.recognize(selectImage);
      await worker.terminate();
      setTextConverter(data.text);
    }
  };

  useEffect(() => {
    convertText();
  }, [selectImage]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="content">
        <h1>Covertidor OCR</h1>
        <label>Selecciona un archivo para convertirlo en texto</label>
        <br />
        <input type="file" accept="image/*" onChange={handleImage} />

        <div className={selectImage !== null ? "info-content" : ""}>
          {selectImage && (
            <div className="image-container">
              <img src={URL.createObjectURL(selectImage)} alt="img" />
            </div>
          )}
          {textConverter && (
            <div className="text-container">
              <p>{textConverter}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
