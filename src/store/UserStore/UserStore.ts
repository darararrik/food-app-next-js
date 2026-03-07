import { makeAutoObservable } from "mobx";
import authApi from "@/api/auth";

type PrivateFields = "_token" | "_isLoading" | "_error";

export class UserStore {
  private _token: string | null =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  private _isLoading = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable<UserStore, PrivateFields>(this);
  }

  get token(): string | null {
    return this._token;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string | null {
    return this._error;
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  async login(username: string, password: string) {
    this._isLoading = true;
    this._error = null;
    try {
      const response = await authApi.login(username, password);
      console.log("response", response);
      if (response.jwt) {
        this.setToken(response.jwt);
        return true;
      }
      return false;
    } catch (err: any) {
      this._error = err.message || "Login failed";
      return false;
    } finally {
      this._isLoading = false;
    }
  }

  async register(username: string, email: string, password: string) {
    this._isLoading = true;
    this._error = null;
    try {
      const response = await authApi.register(username, email, password);
      if (response.jwt) {
        this.setToken(response.jwt);
        return true;
      }
      return false;
    } catch (err: any) {
      this._error = err.message || "Registration failed";
      return false;
    } finally {
      this._isLoading = false;
    }
  }

  logout() {
    this._token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
  }

  private setToken(token: string) {
    this._token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", token);
    }
  }
}
