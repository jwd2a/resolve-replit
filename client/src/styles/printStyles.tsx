import React, { useEffect } from 'react';

/**
 * Component to add print-specific styles to the document
 * These styles will only apply when printing
 */
export function PrintStyles() {
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('media', 'print');
    
    // Define print styles
    style.textContent = `
      @page {
        size: letter landscape;
        margin: 0.5in;
      }
      
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        background-color: white !important;
      }

      .no-print {
        display: none !important;
      }
      
      .print-container {
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
        background-color: white !important;
      }
      
      .print-title {
        font-size: 24pt !important;
        color: #2e1a87 !important;
        margin-bottom: 12pt !important;
      }
      
      /* Kid-friendly day cards */
      .grid-cols-2, .grid-cols-7 {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr) !important;
        grid-gap: 10px !important;
        margin-top: 20px !important;
      }
      
      /* Holiday cards */
      .grid-cols-1 {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        grid-gap: 10px !important;
      }
      
      /* Break after each schedule section */
      .tabs-content {
        page-break-after: always !important;
      }
      
      /* Ensure shadows and borders print properly */
      .shadow-md, .shadow-lg {
        box-shadow: none !important;
        border-width: 1px !important;
        border-color: #ddd !important;
      }
      
      /* Color adjustments for printing */
      .text-pink-600 {
        color: #d53f8c !important;
      }
      
      .text-blue-600 {
        color: #3182ce !important;
      }
      
      /* Background color adjustments */
      .bg-pink-50 {
        background-color: #fff5f7 !important;
      }
      
      .bg-blue-50 {
        background-color: #ebf8ff !important;
      }
      
      [class*="bg-"] {
        background-color: white !important;
      }
      
      /* Ensure tables print well */
      table {
        width: 100% !important;
        border-collapse: collapse !important;
      }
      
      th, td {
        border: 1px solid #ddd !important;
        padding: 8px !important;
        text-align: left !important;
      }
      
      th {
        background-color: #f9f9f9 !important;
        font-weight: bold !important;
      }
    `;
    
    // Append to head
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null; // This component doesn't render anything visible
}

/**
 * PrintButton component for easy printing
 */
export function PrintButton({ children }: { children: React.ReactNode }) {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 border border-[#6c54da]/30 text-[#2e1a87] rounded-md hover:bg-[#f5f0ff]/80 transition-colors flex items-center gap-2 no-print"
    >
      {children}
    </button>
  );
}