import logo from "./logo.svg";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const printPDF = () => {
    const domElement = document.getElementById("download-pdf");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF("p", "mm");
      var position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save("welfare-application-database.pdf");
    });
  };

  return (
    <div className="App">
      <button id="print" onClick={printPDF}>
        PRINT
      </button>
      <div id="download-pdf">
        <h1>Genarete React to Pdf</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          quasi quibusdam tempore distinctio asperiores labore repudiandae rem
          eum culpa officiis?
        </p>
      </div>
    </div>
  );
}

export default App;
