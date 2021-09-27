import Migration from '../../../../lib/base/migration';
import User from '../../../../api/user/entity/entity.server.js';
import UserGroup from '../../../../api/user.group/entity/entity.server.js';

// import Meteor from 'Meteor';

export default new (class extends Migration {
	getVersion() {
		return 2;
	}

	getName() {
		return 'Users';
	}

	createGroup(data)
	{
		let groupId = null;
		const group = UserGroup.findOne({
			filter: {code: data.code},
		});
		if (!group)
		{
			const res = UserGroup.save(null, data);
			if (res.isSuccess())
			{
				groupId = res.getId();
			}
			else
			{
				console.dir(`Unable to create the group "${data.name}"`);
			}
		}
		else
		{
			groupId = group.getId();
		}

		return groupId;
	}

	up()
	{
		const aGroupId = this.createGroup({
			code: 'A',
			name: 'Administrator',
		});
		if (aGroupId)
		{
			if (Meteor.isDevelopment)
			{
				const aUser = User.findOne({
					filter: {email: 'admin@nomail.com',},
				});

				if (!aUser)
				{
					if(!User.save(null, {
						email: 'admin@nomail.com',
						password: 'qsC48rsLjzZ8CY3Q4nK8twJq6rqEsS', // change later!!!
						profile: {
							firstName: 'Fat',
							lastName: 'Admin',
							groupId: [aGroupId],
						},
					}).isSuccess())
					{
						console.dir('Unable to create an administrator');
					}
				}
			}
		}

		// add google demo credentials
		ServiceConfiguration.configurations.upsert(
			{ service: "google" },
			{ $set: { clientId: "client-id-here", secret: "secret-here" } }
		);

		// other groups
		this.createGroup({
			code: 'U',
			name: 'User',
		});
		this.createGroup({
			code: 'E',
			name: 'Editor',
		});
		this.createGroup({
			code: 'P',
			name: 'Pending',
		});
	}
})();
