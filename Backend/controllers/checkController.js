const bcrypt = require('bcrypt');

const storedHashedPassword =
"$2b$10$./K.rZOIQTX5Yt/5Pc0PE.GFB0Pcc0tcL01jOPzyIz37A4n2QGwjq";
const enteredPassword = "Secure@wr456";

async function verifyPassword() {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  if (isMatch) {
    console.log("✅ Password is correct!");
  } else {
    console.log("❌ Incorrect password.");
  }
}

verifyPassword();
