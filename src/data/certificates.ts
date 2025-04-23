export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  year: number;
  filePath: string;
  fileType: 'pdf' | 'jpg' | 'png';
}

export const certificates: Certificate[] = [
  { 
    id: 1, 
    name: 'IV Hackaton YEPS - Innovative IT Solutions', 
    issuer: 'Vinnytsia IT Academy', 
    year: 2023, 
    filePath: '/certificates/hackaton_2023.pdf',
    fileType: 'pdf'
  },
  { 
    id: 2, 
    name: 'IT Universe Olympic Winner - 1st Place', 
    issuer: 'International Student IT Olympiad', 
    year: 2024, 
    filePath: '/certificates/icpc2024-winner.pdf',
    fileType: 'pdf'
  },
  { 
    id: 3, 
    name: 'Marketing of IT Products Course', 
    issuer: 'Genesis', 
    year: 2025, 
    filePath: '/certificates/itproducts_marketing.pdf',
    fileType: 'pdf'
  },
  { 
    id: 4, 
    name: 'Web Design Diploma - 1st Stage', 
    issuer: 'Vinnytsia Regional State Administration', 
    year: 2024, 
    filePath: '/certificates/web2024-winner.jpg',
    fileType: 'jpg'
  },
  { 
    id: 5, 
    name: 'Web Design Diploma - Best Informational Content', 
    issuer: 'Vinnytsia Regional State Administration', 
    year: 2023, 
    filePath: '/certificates/web2023-winner.jpg',
    fileType: 'jpg'
  },
  { 
    id: 6, 
    name: 'Blitz International Contest Certificate', 
    issuer: 'Vinnytsia National Technical University', 
    year: 2023, 
    filePath: '/certificates/web2023.jpg',
    fileType: 'jpg'
  },
  { 
    id: 7, 
    name: 'XXII International Contest Certificate', 
    issuer: 'Vinnytsia National Technical University', 
    year: 2024, 
    filePath: '/certificates/web2024.jpg',
    fileType: 'jpg'
  },
];

export default certificates;