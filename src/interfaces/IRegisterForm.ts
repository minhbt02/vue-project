import { UserType } from "@/repo/services/user.service";

export interface IRegisterForm {
  getUser(): UserType;
  showError(error: string, type: string): () => void;
}