import { UserEntity } from "@/domain/entities/user.entity";
import { CustomError } from "@/domain/errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, role } = object;
    if (!id || !id) {
      throw CustomError.badRequest("Missing required user fields");
    }
    if (!name) {
      throw CustomError.badRequest("User name is required");
    }
    if (!email) {
      throw CustomError.badRequest("User email is required");
    }
    if (!password) {
      throw CustomError.badRequest("User password is required");
    }
    if (!role) {
      throw CustomError.badRequest("User role is required");
    }
    return new UserEntity(
      _id || id,
      name,
      email,
      object.password,
      role,
      object.img
    );
  }
}
