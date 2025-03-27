import { UserRole } from "../enums/user-role.enum";

export interface User {
    id: string;
    email: string;
    role: UserRole;
    companyId?: string;

}