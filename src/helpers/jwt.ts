const jwt = require("jsonwebtoken");

const generarJWT = (
  _id: string,
  login: string = "", // se ajusta para validar un token y poderlo
  jwtSecret = process.env.JWT_SECRET,
  expiratoken = process.env.EXPIRA_TOKEN,
  
) => {


  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      login,
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiratoken,
      },
      (error: string, token: string) => {
        if (error) {
          console.log(error);
          reject("NO se pudo generar el token");
        } else resolve(token);
      }
    );
  });
};

export default generarJWT;
