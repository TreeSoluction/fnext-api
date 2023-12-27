import * as bcrypt from "bcrypt";

class criptografy {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  public async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);

      return hash;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  public async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      throw new Error(`Error comparing passwords: ${error.message}`);
    }
  }
}

export default criptografy;
