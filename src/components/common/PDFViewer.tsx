import { useState } from "react";
import './PDFViewer.scss';

function PDFViewer({ pdfPath }: { pdfPath: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const handlePdfLoad = () => {
    setTotalPages(Math.max(totalPages, 1));
  };
  
  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button 
          className="pdf-control-button"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          Previous
        </button>
        <span className="pdf-page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="pdf-control-button"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        >
          Next
        </button>
      </div>
      <div className="pdf-container">
        <embed 
          src={`${pdfPath}#page=${currentPage}`}
          type="application/pdf" 
          width="100%" 
          height="100%" 
          onLoad={handlePdfLoad}
        />
      </div>
    </div>
  );
}

export default PDFViewer;