const API_BASE = '';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserDto {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export interface JwtResponse {
  token: string;
  type: string;
}

export async function loginApi(req: LoginRequest): Promise<JwtResponse> {
  const res = await fetch(`${API_BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error('Failed to login');
  }
  return res.json();
}

export async function signupApi(data: UserDto): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to register');
  }
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  color: string;
  imageUrl: string;
  videoUrl: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

