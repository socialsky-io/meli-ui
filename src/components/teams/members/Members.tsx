import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { EmptyList } from '../../../commons/components/EmptyList';
import { Loader } from '../../../commons/components/Loader';
import { AlertError } from '../../../commons/components/AlertError';
import { useEnv } from '../../../providers/EnvProvider';
import { TeamMember } from './team-member';
import { axios } from '../../../providers/axios';
import { AddMember } from './add/AddMember';
import { MemberView } from './MemberView';
import styles from './Members.module.scss';
import { TeamMemberIcon } from '../../icons/TeamMemberIcon';
import { useMountedState } from '../../../commons/hooks/use-mounted-state';

function sortMembers(a: TeamMember, b: TeamMember): number {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

export function Members() {
  const env = useEnv();
  const { teamId } = useParams();
  const [loading, setLoading] = useMountedState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState<TeamMember[]>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    axios.get(`${env.MELI_API_URL}/api/v1/teams/${teamId}/members`)
      .then(({ data }) => data)
      .then(setItems)
      .catch(setError)
      .catch(err => toast(`Could not list members: ${err}`, {
        type: 'error',
      }))
      .finally(() => setLoading(false));
  }, [env, teamId, setLoading]);

  const onAdd = member => {
    setItems([member, ...items].sort(sortMembers));
  };

  const onDelete = (deletedMemberId: string) => {
    setItems(items.filter(({ memberId }) => memberId !== deletedMemberId));
  };

  const emptyList = (
    <EmptyList
      icon={<TeamMemberIcon />}
      title="No members"
    >
      <p>There are no members yet</p>
      <AddMember teamId={teamId} onAdded={onAdd}>
        <button type="button" className="btn btn-primary">
          Add member
        </button>
      </AddMember>
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
        <div className="container">
          <ul className="list-group">
            <AddMember
              teamId={teamId}
              onAdded={onAdd}
              className={classNames('list-group-item', styles.add)}
            >
              Add member
            </AddMember>
            {items.map(member => (
              <MemberView
                key={member.memberId}
                teamId={teamId}
                member={member}
                onDelete={() => onDelete(member.memberId)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
