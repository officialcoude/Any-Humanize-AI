import { User } from '../types';

const USERS_KEY = 'humanize_users_db';
const SESSION_KEY = 'humanize_session_user';

// Simulated delay for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await delay(800);
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword as User;
  },

  async signup(name: string, email: string, password: string): Promise<User> {
    await delay(800);
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.some((u: any) => u.email === email)) {
      throw new Error('User with this email already exists.');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: Date.now()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword as User;
  },

  async loginWithGoogle(): Promise<User> {
    await delay(1000);
    const googleUser: User = {
      id: 'google_' + Date.now(),
      name: 'Google User',
      email: 'user@google.com'
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser));
    return googleUser;
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Mock subscription for UI compatibility
  subscribeToAuthChanges(callback: (user: User | null) => void) {
    const user = this.getCurrentUser();
    callback(user);
    return () => {}; // Unsubscribe mock
  }
};
