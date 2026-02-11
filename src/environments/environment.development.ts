export interface JobApiConfig {
  name: string;
  baseUrl: string;
  requiresKey: boolean;
  authType: 'query' | 'headers' | 'none';
  endpoints: Record<string, string>;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

export const environment = {
  apiUrl: 'http://localhost:3000',
  jobApis: {
    themuse: <JobApiConfig>{
      name: 'The Muse',
      baseUrl: 'https://www.themuse.com/api/public',
      requiresKey: false,
      authType: 'query',
      endpoints: {list: '/jobs', details: '/jobs/{id}',}
    },
    usajobs: <JobApiConfig>{
      name: 'USA Jobs',
      baseUrl: 'https://data.usajobs.gov/api',
      requiresKey: true,
      authType: 'headers',
      endpoints: {search: '/Search',}
    },
    adzuna: <JobApiConfig>{
      name: 'Adzuna',
      baseUrl: 'https://api.adzuna.com/v1/api',
      requiresKey: true,
      authType: 'query',
      endpoints: {search: '/jobs/{country}/search/{page}',}
    },
    arbeitnow: <JobApiConfig>{
      name: 'Arbeitnow',
      baseUrl: 'https://www.arbeitnow.com/api',
      requiresKey: false,
      authType: 'none',
      endpoints: {list: '/job-board-api',}
    }
  }
};
