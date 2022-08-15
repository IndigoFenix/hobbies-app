const userRepository = require('../repositories/users');

exports.create = async (data) => {
	const user = await userRepository.create({
		'first_name': data.first_name,
		'last_name': data.last_name,
		'address': data.address,
		'phone_number': data.phone_number,
	});
	if (!user) {
		return { error: 'Invalid user data', code: 400 };
	}
	return user;
};

exports.all = async () => {
	return await userRepository.findMany({});
};

exports.delete = async (id) => {
    const result = await userRepository.deleteOne(id);
    return { success: result };
};