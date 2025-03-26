const bcrypt = require('bcrypt');

async function testBcrypt() {
  try {
    const plainPassword = 'Password@123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password Match:', isMatch);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBcrypt();
