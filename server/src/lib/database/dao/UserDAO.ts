import { Knex } from "knex";

export interface User {
  id?: number;
  username: string;

  created_at?: Date;
}

export interface UserSession {
  id: string;
  user_id: number;
  expires: Date;
  created_at?: Date;
}

export interface AggieAuthToken {
  token: string;
  user_id: number;
  expires: Date;
  created_at?: Date;
}

export class UserDAO {
  static UserTable = "users";
  static UserSessionsTable = "users_sessions";
  static AggieAuthTokensTable = "aggie_auth_tokens";

  private knexInstance: Knex;

  constructor(knexInstance: Knex) {
    this.knexInstance = knexInstance;
  }

  public async getAll(): Promise<User[]> {
    return this.knexInstance<User>(UserDAO.UserTable).select();
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.knexInstance<User>(UserDAO.UserTable)
      .where("username", username)
      .select()
      .limit(1);

    if (!user) return;
    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const [user] = await this.knexInstance<User>(UserDAO.UserTable)
      .where("id", id)
      .select()
      .limit(1);

    if (!user) return;
    return user;
  }

  public async findSession(id: string): Promise<UserSession | undefined> {
    const [session] = await this.knexInstance<UserSession>(
      UserDAO.UserSessionsTable
    )
      .where("id", id)
      .select()
      .limit(1);

    return session;
  }

  public async findSessionAndUser(
    sessionId: string
  ): Promise<(UserSession & { user: User }) | undefined> {
    const session = await this.findSession(sessionId);
    if (!session) return;

    const user = await this.findById(session.user_id);
    if (!user) return;

    return { ...session, user };
  }

  public async findAggieToken(
    token: string
  ): Promise<AggieAuthToken | undefined> {
    const [aggieAuthToken] = await this.knexInstance<AggieAuthToken>(
      UserDAO.AggieAuthTokensTable
    )
      .where("token", token)
      .select()
      .limit(1);

    return aggieAuthToken;
  }

  public async save(user: User) {
    const [newUser] = await this.knexInstance<User>(UserDAO.UserTable)
      .insert(user)
      .onConflict(["id"])
      .merge()
      .returning("*");

    return newUser;
  }

  public async saveSession(session: UserSession) {
    const [newSession] = await this.knexInstance<UserSession>(
      UserDAO.UserSessionsTable
    )
      .insert(session)
      .onConflict(["id"])
      .merge()
      .returning("*");

    return newSession;
  }

  public async saveAggieAuthToken(token: AggieAuthToken) {
    const [newToken] = await this.knexInstance<AggieAuthToken>(
      UserDAO.AggieAuthTokensTable
    )
      .insert(token)
      .onConflict(["token"])
      .merge()
      .returning("*");

    return newToken;
  }

  public async deleteAggieAuthToken(token: string) {
    return this.knexInstance(UserDAO.AggieAuthTokensTable)
      .where("token", token)
      .delete();
  }

  public async deleteUserSession(sessionId: string) {
    return this.knexInstance(UserDAO.UserSessionsTable)
      .where("id", sessionId)
      .delete();
  }

  public async deleteUser(userId: number) {
    return this.knexInstance(UserDAO.UserTable).where("id", userId).delete();
  }
}
