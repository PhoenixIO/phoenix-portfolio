import { Certificate } from "@/data/certificates";
import { useRef, useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import './CertificateModal.scss';

// Certificate Modal Component (with Zoom Functionality)
const CertificateModal = ({ 
  certificate, 
  onClose 
}: { 
  certificate: Certificate | null, 
  onClose: () => void 
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  if (!certificate) return null;
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
  };
  
  // Use a proper non-passive wheel event handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !(certificate?.fileType === 'jpg' || certificate?.fileType === 'png')) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
      e.preventDefault();
    };
    
    // Add wheel event listener with { passive: false } to allow preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Clean up the event listener on unmount
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [certificate, containerRef.current]);
  
  const renderCertificateContent = () => {
    switch (certificate.fileType) {
      case 'pdf':
        return <PDFViewer pdfPath={certificate.filePath} />;
      case 'jpg':
      case 'png':
        return (
          <div 
            ref={containerRef}
            className="certificate-image-container"
          >
            <img 
              ref={imgRef}
              src={certificate.filePath} 
              alt={certificate.name} 
              className="certificate-image"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease'
              }}
            />
            <div className="zoom-controls">
              <button 
                className="zoom-button" 
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              >
                −
              </button>
              <button 
                className="zoom-button reset-zoom" 
                onClick={handleResetZoom}
                disabled={zoomLevel === 1}
              >
                Reset
              </button>
              <button 
                className="zoom-button" 
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              >
                +
              </button>
            </div>
          </div>
        );
      default:
        return <p>Unsupported file format</p>;
    }
  };
  
  const modalContentClass = `certificate-modal-content ${certificate.fileType === 'pdf' ? 'pdf-mode' : ''}`;
  
  return (
    <div className="certificate-modal-overlay" onClick={onClose}>
      <div className={modalContentClass} onClick={(e) => e.stopPropagation()}>
        <div className="certificate-modal-header">
          <h2>{certificate.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="certificate-modal-body">
          {renderCertificateContent()}
        </div>
        <div className="certificate-modal-footer">
          <p>{certificate.issuer} - {certificate.year}</p>
          {(certificate.fileType === 'jpg' || certificate.fileType === 'png') && (
            <p className="zoom-indicator">Zoom: {Math.round(zoomLevel * 100)}%</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;