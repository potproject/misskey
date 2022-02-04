import autobind from 'autobind-decorator';
import Chart, { KVs } from '../core';
import { User } from '@/models/entities/user';
import { Note } from '@/models/entities/note';
import { Users } from '@/models/index';
import { name, schema } from './entities/per-user-reactions';

/**
 * ユーザーごとのリアクションに関するチャート
 */
// eslint-disable-next-line import/no-default-export
export default class PerUserReactionsChart extends Chart<typeof schema> {
	constructor() {
		super(name, schema, true);
	}

	@autobind
	protected async queryCurrentState(group: string): Promise<Partial<KVs<typeof schema>>> {
		return {};
	}

	@autobind
	public async update(user: { id: User['id'], host: User['host'] }, note: Note): Promise<void> {
		this.inc({
			[Users.isLocalUser(user) ? 'local' : 'remote']: { count: 1 },
		}, note.userId);
	}
}
