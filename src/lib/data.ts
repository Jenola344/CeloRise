export type Project = {
  id: string;
  name: string;
  description: string;
  category: 'Finance' | 'Climate' | 'Education' | 'Health';
  impactMetrics: string;
  imageId: string;
};

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'GreenChain Solar',
    description: 'Funding decentralized solar microgrids in remote villages to provide clean, affordable energy and reduce carbon emissions.',
    category: 'Climate',
    impactMetrics: 'Targeting 500 tons CO2 reduction annually and powering 2,000 homes.',
    imageId: 'green-energy',
  },
  {
    id: 'proj-2',
    name: 'HealthBridge Connect',
    description: 'A mobile platform connecting patients in low-income areas with qualified doctors for remote consultations and e-prescriptions.',
    category: 'Health',
    impactMetrics: 'Providing healthcare access to 10,000 underserved individuals.',
    imageId: 'telemedicine',
  },
  {
    id: 'proj-3',
    name: 'EduBlocks Africa',
    description: 'Building a blockchain-based credentialing system for students, enabling them to own and share their academic records securely.',
    category: 'Education',
    impactMetrics: 'Empowering 5,000 students with verifiable digital identities for education and employment.',
    imageId: 'digital-learning',
  },
   {
    id: 'proj-4',
    name: 'MicroLend DAO',
    description: 'A decentralized micro-lending platform offering low-interest loans to small entrepreneurs in developing nations.',
    category: 'Finance',
    impactMetrics: 'Disbursing $1M in capital to 1,000 small businesses.',
    imageId: 'micro-finance',
  },
  {
    id: 'proj-5',
    name: 'AquaPure Protocol',
    description: 'Using IoT and blockchain to monitor and ensure water quality in vulnerable communities, providing transparent data.',
    category: 'Climate',
    impactMetrics: 'Securing clean water sources for 25,000 people.',
    imageId: 'clean-water',
  },
  {
    id: 'proj-6',
    name: 'CodeVerse Academy',
    description: 'An online coding bootcamp offering free Web3 development courses to aspiring developers from disadvantaged backgrounds.',
    category: 'Education',
    impactMetrics: 'Training 1,000 new developers in blockchain technologies.',
    imageId: 'coding-bootcamp',
  },
];
