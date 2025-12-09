export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

// Shared in-memory mock users for auth endpoints
export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    password: "Demo@12345",
    username: "demouser",
    createdAt: new Date().toISOString(),
  },
];

export function findUserByEmail(email?: string) {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  return mockUsers.find((u) => u.email.trim().toLowerCase() === normalized);
}

export function addMockUser(user: Omit<MockUser, "id" | "createdAt">) {
  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...user,
  };
  mockUsers.push(newUser);
  return newUser;
}
