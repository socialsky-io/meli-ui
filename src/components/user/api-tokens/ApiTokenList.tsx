import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';
import { EmptyList } from '../../../commons/components/EmptyList';
import { Loader } from '../../../commons/components/Loader';
import { AlertError } from '../../../commons/components/AlertError';
import { useEnv } from '../../../providers/EnvProvider';
import { ApiToken } from './api-token';
import { axios } from '../../../providers/axios';
import styles from './ApiTokenList.module.scss';
import { TokenIcon } from '../../icons/TokenIcon';
import { useMountedState } from '../../../commons/hooks/use-mounted-state';
import { ApiTokenActivationPeriod } from './ApiTokenActivationPeriod';

function sortTokens(a: ApiToken, b: ApiToken): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function ApiTokenList() {
  const { url } = useRouteMatch();

  const env = useEnv();
  const [loading, setLoading] = useMountedState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState<ApiToken[]>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    axios.get<ApiToken[]>(`${env.MELI_API_URL}/api/v1/api-tokens`)
      .then(({ data }) => data.sort(sortTokens))
      .then(setItems)
      .catch(setError)
      .catch(err => toast(`Could not list tokens: ${err}`, {
        type: 'error',
      }))
      .finally(() => setLoading(false));
  }, [env, setLoading]);

  const emptyList = (
    <EmptyList
      icon={<TokenIcon />}
      title="No tokens"
    >
      <p>There are no tokens yet</p>
      <Link to={`${url}/add`}>
        <button type="button" className="btn btn-primary">
          Add token
        </button>
      </Link>
    </EmptyList>
  );

  return loading ? (
    <Loader />
  ) : error ? (
    <AlertError error={error} />
  ) : (
    <>
      {items.length === 0 ? (
        emptyList
      ) : (
        <ul className="list-group">
          <Link
            to={`${url}/add`}
            className={classNames('list-group-item list-group-item-action', styles.add)}
          >
            Add token
          </Link>
          {items.map(apiToken => (
            <Link
              key={apiToken._id}
              to={`${url}/${apiToken._id}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div className="flex-grow-1 d-flex align-items-center">
                <strong className="mr-3">{apiToken.name}</strong>
              </div>

              <div className="d-flex align-items-center">
                <ApiTokenActivationPeriod apiToken={apiToken} />
              </div>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
