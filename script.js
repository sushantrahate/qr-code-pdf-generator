function generateQR() {
  const url = document.getElementById('url').value;
  if (!url) {
    alert('Please enter a URL!');
    return;
  }
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: 300,
    height: 300,
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const paperSize = document.getElementById('paperSize').value;
  const doc = new jsPDF('p', 'mm', paperSize);
  const title = document.getElementById('title').value.trim() || 'QR Code';
  const filename = slugify(title) + '.pdf';
  const qrElement = document
    .getElementById('qrcode')
    .getElementsByTagName('img')[0];
  const titleColor = document.getElementById('titleColor').value;

  let pageWidth = doc.internal.pageSize.getWidth();
  let pageHeight = doc.internal.pageSize.getHeight();
  let textSize = 30,
    qrSize = 100,
    titleY = pageHeight / 4;

  if (paperSize === 'a3') {
    textSize = 50;
    qrSize = 180;
    titleY = pageHeight / 4 - 15;
  } else if (paperSize === 'a4') {
    textSize = 40;
    qrSize = 140;
    titleY = pageHeight / 4 - 15;
  } else if (paperSize === 'a5') {
    textSize = 32;
    qrSize = 100;
    titleY = pageHeight / 4 - 10;
  } else {
    textSize = 36;
    qrSize = 120;
    titleY = pageHeight / 4 - 10;
  }

  doc.setFontSize(textSize);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor);
  doc.text(title, pageWidth / 2, titleY, { align: 'center' });

  if (qrElement) {
    const qrDataUrl = qrElement.src;
    doc.addImage(
      qrDataUrl,
      'PNG',
      (pageWidth - qrSize) / 2,
      titleY + 40,
      qrSize,
      qrSize
    );
  } else {
    alert('Please generate a QR code first!');
    return;
  }

  doc.save(filename);
}
