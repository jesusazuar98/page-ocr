import "./App.css";
import { createWorker } from "tesseract.js";
import { useEffect, useState } from "react";
import SelectVals from "./components/selectvals/SelectVals.jsx";

function App() {
  const languages = [
    { id: 1, lang: "deu", idioma: "Alemán" },
    { id: 2, lang: "eng", idioma: "Inglés" },
    { id: 3, lang: "spa", idioma: "Español" },
  ];

  const [language, changeLanguage] = useState("spa");
  const [selectImage, setImage] = useState(null);
  const [textConverter, setTextConverter] = useState("");

  const convertText = async ({ language }) => {
    if (selectImage !== null) {
      const worker = await createWorker();

      await worker.loadLanguage(language);
      await worker.initialize(language);

      const { data } = await worker.recognize(selectImage);
      await worker.terminate();
      setTextConverter(data.text);
    }
  };

  useEffect(() => {
    console.log(language);
    convertText(language);
  }, [selectImage]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLanguage = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <>
      <div className="content">
        <h1>Covertidor OCR</h1>
        <label>Selecciona un archivo para convertirlo en texto</label>
        <br />
        <input type="file" accept="image/*" onChange={handleImage} />
        <SelectVals vals={languages} val={language} change={handleLanguage} />

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
