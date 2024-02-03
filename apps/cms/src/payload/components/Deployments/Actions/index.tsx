import { Button } from 'payload/components';
import React, { useCallback, useState } from 'react';

import payload from 'payload';
import { LoadingOverlayToggle } from 'payload/dist/admin/components/elements/Loading';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import { useDeployments } from '../use-deployments';
import './index.scss';

const actionsClass = 'actions';
const buttonClass = 'btn';

const DeploymentsActions: React.FC = () => {
  const {
    routes: { api },
    serverURL,
  } = useConfig();
  const baseURL = `${serverURL}${api}`;
  const { mutate } = useDeployments();
  const [isLoading, setIsLoading] = useState(false);

  const createDeployment = useCallback(
    async (environment?: 'preview') => {
      try {
        setIsLoading(true);
        const body = new FormData();
        if (environment) {
          body.append('environment', environment);
        }
        await fetch(`${baseURL}/deployments`, { method: 'POST', body });
        await mutate();
      } catch (err) {
        payload.logger.error('Failed to create Cloudfront deployment', err);
      }
      setIsLoading(false);
    },
    [baseURL]
  );

  return (
    <div className={`${actionsClass}`}>
      <LoadingOverlayToggle
        name="deployments"
        loadingText="Creating deployment"
        show={isLoading}
      />
      <Button
        buttonStyle="secondary"
        className={`${actionsClass}__${buttonClass}`}
        onClick={() => createDeployment('preview')}
        disabled={isLoading}
      >
        Preview
      </Button>
      <Button
        className={`${actionsClass}__${buttonClass}`}
        onClick={() => createDeployment()}
        disabled={isLoading}
      >
        Publish
      </Button>
    </div>
  );
};

export default DeploymentsActions;
