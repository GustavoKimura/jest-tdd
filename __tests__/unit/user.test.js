const bcrypt = require('bcryptjs');

const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => await truncate());

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Gustavo Kimura Gregório',
            email: 'gustavokimuraf@gmail.com',
            password: '1234567890'
        });

        const comparedHash = await bcrypt.compare('1234567890', user.password_hash);

        expect(comparedHash).toBe(true);
    });
});