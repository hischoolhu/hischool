import { PayloadHandler } from 'payload/config';
import { adminsOrPublishers } from '../access/adminsOrPublishers';
import * as cloudflare from '../cloudfront/cloudfront-client';

const throwOnUnauthorized: PayloadHandler = (req, res) => {
  const { user } = req;
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    throw Error('Unauthorized');
  }
  if (!adminsOrPublishers({ req })) {
    res.status(403).json({ error: 'Forbidden' });
    throw Error('Forbidden');
  }
};

export const getDeployments: PayloadHandler = async (
  req,
  res
): Promise<cloudflare.Deployment[]> => {
  try {
    throwOnUnauthorized(req, res, null);
  } catch (err) {
    return;
  }
  const deployments = await cloudflare.getDeployments();
  res.json(deployments);
};

export const createDeployment: PayloadHandler = async (
  req,
  res
): Promise<cloudflare.Deployment> => {
  try {
    throwOnUnauthorized(req, res, null);
  } catch (err) {
    return;
  }
  const environment = req.body.environment;
  if (!!environment && environment !== 'preview') {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }
  const deployment = await cloudflare.createDeployment(environment);
  res.json(deployment);
};
