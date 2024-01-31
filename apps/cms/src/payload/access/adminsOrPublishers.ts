import type { AccessArgs } from 'payload/config';

import { checkRole } from '../collections/Users/checkRole';
import type { User } from '../payload-types';

type isAdminOrPublisher = (args: AccessArgs<unknown, User>) => boolean;

export const adminsOrPublishers: isAdminOrPublisher = ({ req: { user } }) => {
  return checkRole(['admin', 'publisher'], user);
};
