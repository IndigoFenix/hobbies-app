const hobbyRepository = require('../repositories/hobbies');

exports.create = async (data) => {
	const hobby = await hobbyRepository.create({
		'user_id': data.user_id,
		'hobby': data.hobby,
	});
	if (!hobby) {
		return { error: 'Invalid hobby data', code: 400 };
	}
	return hobby;
};

exports.all = async () => {
	return await hobbyRepository.findMany({});
};

exports.allOfUser = async (userId) => {
	return await hobbyRepository.findMany({'user_id': userId});
};

exports.delete = async (id) => {
    const result = await hobbyRepository.deleteOne(id);
    return { success: result };
};