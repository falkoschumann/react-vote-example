export function login(username: string) {
  return {
    type: 'LOGIN',
    username,
  } as const;
}

export type LoginAction = ReturnType<typeof login>;
