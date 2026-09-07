"use client";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  program: string;
  rollNo: string;
  joined: string;
};

const USERS_KEY = "nexalearn_users";
const SESSION_KEY = "nexalearn_session";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeRollNo(program: string) {
  const year = new Date().getFullYear();
  const tag = program
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NX-${year}-${tag}-${rand}`;
}

export function signUp(input: {
  name: string;
  email: string;
  password: string;
  program: string;
}): { ok: true; user: StoredUser } | { ok: false; error: string } {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists. Try signing in instead." };
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    password: input.password,
    program: input.program,
    rollNo: makeRollNo(input.program),
    joined: new Date().toISOString(),
  };
  writeUsers([...users, user]);
  window.localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true, user };
}

export function signIn(
  email: string,
  password: string
): { ok: true; user: StoredUser } | { ok: false; error: string } {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return { ok: false, error: "Incorrect email or password." };
  }
  window.localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true, user };
}

export function getCurrentUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const id = window.localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return readUsers().find((u) => u.id === id) ?? null;
}

export function signOut() {
  window.localStorage.removeItem(SESSION_KEY);
}
