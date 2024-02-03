import payload from 'payload';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const projectName = process.env.CLOUDFLARE_PROJECT_NAME;

function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const authHeader = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_PAGES_TOKEN}`,
  };
  return global.fetch(`https://api.cloudflare.com/client/v4/${input}`, {
    ...init,
    headers: { ...authHeader, ...init?.headers },
  });
}

export type Deployment = {
  id: string;
  environment: string;
  url: string;
  created_on: string;
  latest_stage: {
    name: 'queued' | 'initialize' | 'clone_repo' | 'build' | 'deploy';
    status: 'idle' | 'active' | 'success' | 'failure';
  };
};

export async function getDeployments(): Promise<Deployment[]> {
  const perPage = 5;
  try {
    const res = await fetch(
      `accounts/${accountId}/pages/projects/${projectName}/deployments?per_page=${perPage}`
    );
    const body = await res.json();
    return body.result.map(
      ({ id, environment, url, created_on, latest_stage }) =>
        ({
          id,
          environment,
          url,
          created_on,
          latest_stage,
        } satisfies Deployment)
    );
  } catch (err) {
    payload.logger.error('Error fetching Cloudflare deployments', err);
  }
  return [];
}

export async function createDeployment(
  environment?: 'preview'
): Promise<Deployment> {
  try {
    const data = new FormData();
    if (environment) {
      data.append('branch', environment);
    }
    const res = await fetch(
      `accounts/${accountId}/pages/projects/${projectName}/deployments`,
      { method: 'POST', body: data }
    );
    const body = await res.json();
    return body.result;
  } catch (err) {
    payload.logger.error('Error creating Cloudflare deployment', err);
  }
}
